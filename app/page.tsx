"use client";

import { useState, useEffect, useCallback } from "react";
import { Snippet } from "@/types";
import { Header } from "@/components/Header";
import { SnippetCard } from "@/components/SnippetCard";
import { CreateSnippetModal } from "@/components/CreateSnippetModal";
import { SnippetDetail } from "@/components/SnippetDetail";
import { EmptyState } from "@/components/EmptyState";
import { Loader2 } from "lucide-react";

const LANGUAGES = ["all", "typescript", "javascript", "css", "sql", "python", "bash", "json", "text"];

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState<Snippet | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (langFilter !== "all") params.set("lang", langFilter);
      const res = await fetch(`/api/snippets?${params}`);
      const json = await res.json();
      setSnippets(json.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, langFilter]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const handleCreate = async (data: Partial<Snippet>) => {
    const res = await fetch("/api/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setShowCreate(false);
      fetchSnippets();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/snippets/${id}`, { method: "DELETE" });
    if (selected?.id === id) setSelected(null);
    fetchSnippets();
  };

  const handlePin = async (snippet: Snippet) => {
    await fetch(`/api/snippets/${snippet.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned: !snippet.pinned }),
    });
    fetchSnippets();
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Header
        search={search}
        onSearchChange={setSearch}
        onNewSnippet={() => setShowCreate(true)}
        count={snippets.length}
      />

      {/* Language filter pills */}
      <div className="px-6 pb-4 pt-2 flex gap-2 overflow-x-auto scrollbar-none border-b" style={{ borderColor: "var(--border)" }}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => setLangFilter(lang)}
            className="px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all"
            style={{
              background: langFilter === lang ? "var(--accent)" : "var(--surface-2)",
              color: langFilter === lang ? "#16140f" : "var(--text-muted)",
              border: `1px solid ${langFilter === lang ? "var(--accent)" : "var(--border)"}`,
              fontWeight: langFilter === lang ? 600 : 400,
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <main className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin" size={28} style={{ color: "var(--text-muted)" }} />
          </div>
        ) : snippets.length === 0 ? (
          <EmptyState onNew={() => setShowCreate(true)} hasSearch={!!debouncedSearch || langFilter !== "all"} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {snippets.map((snippet, i) => (
              <div
                key={snippet.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
              >
                <SnippetCard
                  snippet={snippet}
                  onClick={() => setSelected(snippet)}
                  onDelete={() => handleDelete(snippet.id)}
                  onPin={() => handlePin(snippet)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showCreate && (
        <CreateSnippetModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
      {selected && (
        <SnippetDetail
          snippet={selected}
          onClose={() => setSelected(null)}
          onDelete={() => handleDelete(selected.id)}
          onPin={() => handlePin(selected)}
        />
      )}
    </div>
  );
}
