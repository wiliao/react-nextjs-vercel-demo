"use client";

import { Archive, Plus } from "lucide-react";

interface EmptyStateProps {
  onNew: () => void;
  hasSearch: boolean;
}

export function EmptyState({ onNew, hasSearch }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-6">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      >
        <Archive size={24} style={{ color: "var(--text-muted)" }} />
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "'Playfair Display', serif", color: "var(--text)" }}
      >
        {hasSearch ? "No matching snippets" : "Your vault is empty"}
      </h3>
      <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
        {hasSearch
          ? "Try a different search term or clear your filters."
          : "Save your first code snippet and build your personal library."}
      </p>
      {!hasSearch && (
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
          style={{ background: "var(--accent)", color: "#16140f" }}
        >
          <Plus size={15} strokeWidth={2.5} />
          Add your first snippet
        </button>
      )}
    </div>
  );
}
