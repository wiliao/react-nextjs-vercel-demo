import { Snippet } from "@/types";

// Global in-memory store — persists across requests within the same serverless instance.
// For production, replace with a real database (e.g. Vercel Postgres, PlanetScale, Upstash).
const store: Map<string, Snippet> = new Map();

// ─── Seed data ────────────────────────────────────────────────────────────────
const seeds: Snippet[] = [
  {
    id: "seed-1",
    title: "Debounce Hook",
    description: "A reusable React hook that debounces any fast-changing value.",
    language: "typescript",
    code: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    tags: ["react", "hooks", "performance"],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    pinned: true,
  },
  {
    id: "seed-2",
    title: "Rate Limiter Middleware",
    description: "Simple in-memory rate limiter for Next.js Route Handlers.",
    language: "typescript",
    code: `const rateMap = new Map<string, { count: number; reset: number }>();

export function rateLimit(ip: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}`,
    tags: ["api", "security", "middleware"],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    pinned: false,
  },
  {
    id: "seed-3",
    title: "CSS Fluid Typography",
    description: "Clamp-based fluid type scale — no media queries needed.",
    language: "css",
    code: `:root {
  --step--1: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --step-0:  clamp(1rem,   0.34vw + 0.91rem, 1.19rem);
  --step-1:  clamp(1.25rem,0.61vw + 1.1rem,  1.58rem);
  --step-2:  clamp(1.56rem,1.00vw + 1.31rem, 2.11rem);
  --step-3:  clamp(1.95rem,1.56vw + 1.56rem, 2.81rem);
  --step-4:  clamp(2.44rem,2.38vw + 1.85rem, 3.75rem);
}

body  { font-size: var(--step-0); }
h1    { font-size: var(--step-4); }
h2    { font-size: var(--step-3); }
h3    { font-size: var(--step-2); }`,
    tags: ["css", "typography", "responsive"],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    pinned: false,
  },
  {
    id: "seed-4",
    title: "SQL Pagination Helper",
    description: "Type-safe pagination query builder for PostgreSQL.",
    language: "sql",
    code: `-- Usage: SELECT * FROM paginate('posts', 2, 10);
CREATE OR REPLACE FUNCTION paginate(
  tbl  TEXT,
  page INT DEFAULT 1,
  size INT DEFAULT 10
) RETURNS SETOF RECORD AS $$
BEGIN
  RETURN QUERY EXECUTE format(
    'SELECT * FROM %I ORDER BY created_at DESC LIMIT %L OFFSET %L',
    tbl,
    size,
    (page - 1) * size
  );
END;
$$ LANGUAGE plpgsql;`,
    tags: ["sql", "postgres", "pagination"],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    pinned: false,
  },
];

seeds.forEach((s) => store.set(s.id, s));

// ─── CRUD helpers ─────────────────────────────────────────────────────────────
export const db = {
  getAll(): Snippet[] {
    return Array.from(store.values()).sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById(id: string): Snippet | undefined {
    return store.get(id);
  },

  create(data: Omit<Snippet, "id" | "createdAt" | "updatedAt">): Snippet {
    const snippet: Snippet = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.set(snippet.id, snippet);
    return snippet;
  },

  update(id: string, data: Partial<Snippet>): Snippet | null {
    const existing = store.get(id);
    if (!existing) return null;
    const updated: Snippet = {
      ...existing,
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };
    store.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.delete(id);
  },

  search(q: string): Snippet[] {
    const query = q.toLowerCase();
    return this.getAll().filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.tags.some((t) => t.toLowerCase().includes(query)) ||
        s.language.toLowerCase().includes(query)
    );
  },
};
