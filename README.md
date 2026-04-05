# 🗃️ Snippet Vault

A beautiful, full-stack **code snippet manager** built with **Next.js 14 App Router**, **Route Handlers**, **TypeScript**, and **Tailwind CSS** — ready to deploy to Vercel in one click.

---

## ✨ Features

- **Full CRUD REST API** via Next.js Route Handlers
- **Real-time search** across titles, descriptions, tags, and languages
- **Language filter** pills (TypeScript, JS, CSS, SQL, Python, etc.)
- **Pin snippets** to keep them at the top
- **Copy to clipboard** with one click
- **Responsive** — works great on mobile and desktop
- **Seed data** — comes pre-loaded with 4 example snippets

---

## 🗂️ Project Structure

```
snippet-vault/
├── app/
│   ├── api/
│   │   └── snippets/
│   │       ├── route.ts          ← GET all, POST new
│   │       └── [id]/
│   │           └── route.ts      ← GET one, PATCH, DELETE
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  ← Main UI (Client Component)
├── components/
│   ├── Header.tsx
│   ├── SnippetCard.tsx
│   ├── SnippetDetail.tsx
│   ├── CreateSnippetModal.tsx
│   └── EmptyState.tsx
├── lib/
│   └── store.ts                  ← In-memory data store
├── types/
│   └── index.ts
├── next.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

---

## 🚀 API Reference

All endpoints live under `/api/snippets`.

### `GET /api/snippets`
Returns all snippets, sorted by pinned → newest first.

**Query params:**
| Param | Type   | Description                        |
|-------|--------|------------------------------------|
| `q`   | string | Full-text search (title, tags, lang) |
| `lang`| string | Filter by language                 |

**Response:**
```json
{ "data": [...], "total": 4 }
```

---

### `POST /api/snippets`
Creates a new snippet.

**Body:**
```json
{
  "title": "My Hook",
  "description": "Optional description",
  "language": "typescript",
  "code": "const x = 1;",
  "tags": ["react", "hooks"],
  "pinned": false
}
```

**Response:** `201 Created` with the created snippet.

---

### `GET /api/snippets/:id`
Returns a single snippet by ID.

---

### `PATCH /api/snippets/:id`
Updates any fields on an existing snippet.

```json
{ "pinned": true }
```

---

### `DELETE /api/snippets/:id`
Deletes a snippet permanently.

**Response:**
```json
{ "message": "Snippet deleted" }
```

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repo
4. Click **Deploy** — zero config needed

> **Note on persistence:** The in-memory store resets between serverless cold starts.
> For production persistence, swap `lib/store.ts` with a real database:
>
> | Option          | Package                      |
> |-----------------|------------------------------|
> | Vercel Postgres | `@vercel/postgres`           |
> | Upstash Redis   | `@upstash/redis`             |
> | PlanetScale     | `@planetscale/database`      |
> | Turso (SQLite)  | `@libsql/client`             |

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 14 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS                      |
| Icons      | Lucide React                      |
| Fonts      | Playfair Display + DM Sans + JetBrains Mono |
| Deployment | Vercel                            |

---

## 📄 License

MIT — use freely for personal and commercial projects.
