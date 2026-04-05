"use client";

import { Plus, Search, Archive } from "lucide-react";

interface HeaderProps {
  search: string;
  onSearchChange: (v: string) => void;
  onNewSnippet: () => void;
  count: number;
}

export function Header({ search, onSearchChange, onNewSnippet, count }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 px-6 py-4 flex items-center gap-4 backdrop-blur-md"
      style={{
        background: "rgba(22, 20, 15, 0.85)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 mr-2 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--accent)", color: "#16140f" }}
        >
          <Archive size={16} strokeWidth={2.5} />
        </div>
        <span
          className="hidden sm:block text-base font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--text)" }}
        >
          Snippet Vault
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 relative max-w-md">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search snippets, tags, languages…"
          className="w-full pl-8 pr-4 py-2 rounded-lg text-sm font-mono"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            outline: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Count */}
      <span className="text-xs hidden md:block" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        {count} snippet{count !== 1 ? "s" : ""}
      </span>

      {/* New button */}
      <button
        onClick={onNewSnippet}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold flex-shrink-0 hover:opacity-90 active:scale-95"
        style={{ background: "var(--accent)", color: "#16140f" }}
      >
        <Plus size={15} strokeWidth={2.5} />
        <span className="hidden sm:inline">New</span>
      </button>
    </header>
  );
}
