# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

OpenCLI Hub is a **Next.js 16 App Router** application that serves as a directory for CLI tools. It uses **Supabase** (PostgreSQL) for data storage and is deployed on **Vercel**.

### Data Flow

Server components (`page.tsx` files) fetch from Supabase using the **client-side anon key** (`src/lib/supabase.ts`). API routes that perform writes use the **server-side service role key** (`src/lib/supabase-server.ts`). All write endpoints are protected by a shared API key validated in `src/lib/auth.ts` via `requireAuth()`.

The homepage fetches all tools server-side, passes them to `HomePage` → `ToolBrowser` (client component), which handles search/filter in-memory with `useMemo`. The dataset is small enough that no server-side search is needed for the UI.

### Cache Invalidation

The homepage uses ISR with 1-hour revalidation. All write API routes call `revalidatePath("/")` (and `/tool/{slug}` for updates) to bust the cache immediately after mutations.

### API Routes

| Endpoint | Methods | Auth | Purpose |
|---|---|---|---|
| `/api/tools` | GET, POST | POST only | List/create tools. GET supports `?type=`, `?category=`, `?q=`, `?limit=`, `?offset=` |
| `/api/tools/[slug]` | GET, PATCH, DELETE | PATCH/DELETE | Single tool CRUD |
| `/api/sync-stars` | POST | Yes | Manual GitHub stars sync |
| `/api/cron/sync-stars` | GET | CRON_SECRET | Daily cron (Vercel, 08:00 UTC) |

Auth pattern: `Authorization: Bearer <OPENCLIHUB_API_KEY>` header.

### i18n

Custom React Context-based system in `src/lib/i18n/`. Two locales: `en` (default) and `zh`. Translations are a flat key-value object in `translations.ts`. Components use `const { t } = useI18n()` to access strings. Locale persists in `localStorage` under key `openclihub-locale`.

When adding UI text, add keys to both `en` and `zh` in `translations.ts`.

### Database

Single table `cli_tools` in Supabase. Schema is in `database.sql`. Key constraints:
- `slug` is UNIQUE (auto-generated from name via `slugify()` in `src/lib/utils.ts`)
- `github_url` is nullable (some tools like Obsidian CLI have no GitHub repo)
- `maintainer_type` is `'official'` or `'community'`
- `updated_at` is auto-set by a PostgreSQL trigger
- RLS enabled: anonymous SELECT, write operations scoped to `anon` role with service key

### Environment Variables

| Variable | Side | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Public read access |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Full CRUD (falls back to anon key) |
| `OPENCLIHUB_API_KEY` | Server | Bearer token for write APIs |
| `CRON_SECRET` | Server | Vercel cron authentication |

### Styling

Tailwind CSS v4 with `next-themes` for dark/light mode. Color conventions: zinc for neutrals, emerald for "official" badges, sky for "community" badges, indigo for primary actions.

### Adding a CLI Tool

Use the `/add-cli-tool` Claude Code skill with a GitHub URL or homepage URL. It fetches metadata, finds the install command from the README, and submits via the API.
