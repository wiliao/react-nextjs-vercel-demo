"use client";

import { useState } from "react";
import { Snippet } from "@/types";
import { X, Plus, Tag } from "lucide-react";

const LANGUAGES = ["typescript", "javascript", "css", "html", "sql", "python", "bash", "json", "text"];

interface CreateSnippetModalProps {
  onClose: () => void;
  onCreate: (data: Partial<Snippet>) => void;
}

const inputStyle = {
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--text-muted)",
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
};

export function CreateSnippetModal({ onClose, onCreate }: CreateSnippetModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/^#/, "");
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = () => {
    if (!title.trim()) return setError("Title is required.");
    if (!code.trim()) return setError("Code is required.");
    setError("");
    onCreate({ title, description, language, code, tags, pinned: false });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[95dvh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden animate-slide-up"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--text)" }}
          >
            New Snippet
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fetch with retry logic"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description…"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} style={{ background: "var(--surface)" }}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Code */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Code *</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your code here…"
              rows={8}
              style={{
                ...inputStyle,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                lineHeight: "1.6",
                resize: "vertical",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Tags</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add tag, press Enter"
                  style={{ ...inputStyle, paddingLeft: "32px" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
              <button
                onClick={addTag}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                <Plus size={14} />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs cursor-pointer hover:opacity-75"
                    style={{
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                      border: "1px solid rgba(232,164,74,0.2)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                    onClick={() => removeTag(tag)}
                    title="Click to remove"
                  >
                    #{tag} <X size={10} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(192,100,90,0.1)", color: "var(--red)", border: "1px solid rgba(192,100,90,0.2)" }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}
        >
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "var(--accent)", color: "#16140f" }}
          >
            Save Snippet
          </button>
        </div>
      </div>
    </div>
  );
}
