# Mission Control (OpenClaw Dashboard)

A custom Mission Control dashboard for OpenClaw built with **Next.js (App Router)** + **Tailwind CSS**. Includes:

- Left sidebar navigation
- Top bar with title + search
- Core pages: Task Board, Calendar, Projects, Memories, Docs, Team, Office, Settings
- Mock data layer in `src/lib/mock.ts`

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

- Update mock data in `src/lib/mock.ts`
- Adjust page layouts inside `src/app/*/page.tsx`
- Update branding in `src/components/Sidebar.tsx`

## Notes

- **No credentials are stored in this repo.**
- The Settings page reads from `~/.openclaw/openclaw.json` at runtime and redacts secrets.
- Keep the repo public safely; all secrets stay on the host.
