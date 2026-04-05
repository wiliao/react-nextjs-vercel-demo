import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

interface RouteParams {
  params: { id: string };
}

// GET /api/snippets/:id
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const snippet = db.getById(params.id);
  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }
  return NextResponse.json({ data: snippet });
}

// PATCH /api/snippets/:id
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const body = await req.json();
    const updated = db.update(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// DELETE /api/snippets/:id
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const deleted = db.delete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Snippet deleted" });
}
