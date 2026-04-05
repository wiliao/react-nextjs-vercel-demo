"use client";

import { Snippet } from "@/types";
import { X, Pin, Trash2, Copy, Check, Clock } from "lucide-react";
import { useState } from "react";

interface SnippetDetailProps {
  snippet: Snippet;
  onClose: () => void;
  onDelete: () => void;
  onPin: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SnippetDetail({ snippet, onClose, onDelete, onPin }: SnippetDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92dvh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden animate-slide-up"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex-1 min-w-0">
            <h2
              className="text-lg font-bold leading-tight truncate"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--text)" }}
            >
              {snippet.title}
            </h2>
            <div className="flex items-center gap-3 mt-0.5">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--accent)", fontSize: "10px", fontWeight: 600 }}
              >
                {snippet.language}
              </span>
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--text-muted)", fontSize: "11px" }}
              >
                <Clock size={10} />
                {formatDate(snippet.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-4 flex-shrink-0">
            <button
              onClick={onPin}
              title={snippet.pinned ? "Unpin" : "Pin"}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              style={{ color: snippet.pinned ? "var(--accent)" : "var(--text-muted)" }}
            >
              <Pin size={15} />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: copied ? "rgba(106,173,114,0.15)" : "var(--surface-2)",
                color: copied ? "var(--green)" : "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors ml-1"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Description */}
          {snippet.description && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {snippet.description}
            </p>
          )}

          {/* Tags */}
          {snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-xs font-mono"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(232,164,74,0.2)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Code */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
            >
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: "var(--text-muted)", fontSize: "10px" }}
              >
                {snippet.language}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--text-muted)", fontSize: "11px" }}
              >
                {snippet.code.split("\n").length} lines
              </span>
            </div>
            <pre
              className="p-4 overflow-x-auto text-sm leading-relaxed"
              style={{
                background: "#0e0d09",
                color: "#c8c4b4",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
              }}
            >
              <code>{snippet.code}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
          style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Updated {formatDate(snippet.updatedAt)}
          </span>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: "rgba(192,100,90,0.1)",
              color: "var(--red)",
              border: "1px solid rgba(192,100,90,0.2)",
            }}
          >
            <Trash2 size={12} />
            Delete snippet
          </button>
        </div>
      </div>
    </div>
  );
}
