import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";
import { CreateSnippetInput } from "@/types";

// GET /api/snippets?q=search&lang=typescript
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const lang = searchParams.get("lang");

  let snippets = q ? db.search(q) : db.getAll();

  if (lang) {
    snippets = snippets.filter((s) => s.language === lang);
  }

  return NextResponse.json({
    data: snippets,
    total: snippets.length,
  });
}

// POST /api/snippets
export async function POST(req: NextRequest) {
  try {
    const body: CreateSnippetInput = await req.json();

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.code?.trim()) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const snippet = db.create({
      title: body.title.trim(),
      description: body.description?.trim() ?? "",
      language: body.language ?? "text",
      code: body.code,
      tags: Array.isArray(body.tags) ? body.tags : [],
      pinned: body.pinned ?? false,
    });

    return NextResponse.json({ data: snippet }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
