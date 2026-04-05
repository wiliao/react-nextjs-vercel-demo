"use client";

import { Snippet } from "@/types";
import { Pin, Trash2, Copy, Check } from "lucide-react";
import { useState } from "react";

const LANG_COLORS: Record<string, string> = {
  typescript: "#3178c6",
  javascript: "#f0db4f",
  css: "#264de4",
  html: "#e34c26",
  sql: "#e97200",
  python: "#3572a5",
  bash: "#89e051",
  json: "#292929",
  text: "#666",
};

interface SnippetCardProps {
  snippet: Snippet;
  onClick: () => void;
  onDelete: () => void;
  onPin: () => void;
}

export function SnippetCard({ snippet, onClick, onDelete, onPin }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const langColor = LANG_COLORS[snippet.language] ?? "#666";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPin();
  };

  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl cursor-pointer flex flex-col overflow-hidden h-full transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--surface)",
        border: `1px solid ${snippet.pinned ? "rgba(232,164,74,0.3)" : "var(--border)"}`,
        boxShadow: snippet.pinned ? "0 0 0 1px rgba(232,164,74,0.15)" : "none",
      }}
    >
      {/* Lang bar */}
      <div className="h-0.5 w-full" style={{ background: langColor, opacity: 0.8 }} />

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-sm leading-snug line-clamp-2 flex-1"
            style={{ color: "var(--text)" }}
          >
            {snippet.pinned && (
              <Pin size={10} className="inline mr-1 mb-0.5" style={{ color: "var(--accent)" }} />
            )}
            {snippet.title}
          </h3>
        </div>

        {/* Description */}
        {snippet.description && (
          <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {snippet.description}
          </p>
        )}

        {/* Code preview */}
        <div
          className="rounded-lg p-3 mt-1 overflow-hidden"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          <pre
            className="text-xs leading-relaxed line-clamp-4 overflow-hidden"
            style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {snippet.code}
          </pre>
        </div>

        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {snippet.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-xs"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="text-xs font-mono"
          style={{ color: langColor, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}
        >
          {snippet.language}
        </span>

        {/* Action buttons — visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePin}
            title={snippet.pinned ? "Unpin" : "Pin"}
            className="p-1 rounded hover:bg-white/5 transition-colors"
            style={{ color: snippet.pinned ? "var(--accent)" : "var(--text-muted)" }}
          >
            <Pin size={13} />
          </button>
          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1 rounded hover:bg-white/5 transition-colors"
            style={{ color: copied ? "var(--green)" : "var(--text-muted)" }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
          <button
            onClick={handleDelete}
            title="Delete"
            className="p-1 rounded hover:bg-white/5 transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
