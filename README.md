# Høstscena - Festival Website

A Next.js + Sanity CMS website for the Høstscena festival, built using the clean template structure: <https://github.com/sanity-io/sanity-template-nextjs-clean>

## Project Structure

This project follows a monorepo structure with workspaces:

```
├── package.json          # Root package.json with workspace configuration
├── frontend/            # Next.js application
│   ├── package.json     # Frontend dependencies
│   ├── .env.local       # Frontend environment variables (NEXT_PUBLIC_*)
│   └── src/
└── studio/              # Sanity Studio
    ├── package.json     # Studio dependencies
    ├── .env.production  # Studio environment variables (SANITY_STUDIO_*)
    └── src/
```

## Environment Variables

### Frontend (.env.local)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-03
SANITY_API_READ_TOKEN=your-token-here
```

### Studio (.env.production)

```bash
SANITY_STUDIO_PROJECT_ID="<id>"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_API_VERSION="2025-06-03"
SANITY_STUDIO_PREVIEW_URL="https://hostscena.netlify.app"
```

## Development

Start both frontend and studio in development mode:

```bash
npm run dev
```

This will start:

- Frontend at <http://localhost:3000>
- Studio at <http://localhost:3333>

### Individual Commands

Start only the frontend:

```bash
npm run dev:next
```

Start only the studio:

```bash
npm run dev:studio
```

## Deployment

### Deploy Studio

```bash
cd studio
npx sanity deploy
```

### Deploy Frontend

Deploy to your preferred hosting platform (Netlify, Vercel, etc.)

```bash
npm run build --workspace=frontend
```

## Content Management

- **Studio URL (Local)**: <http://localhost:3333>
- **Studio URL (Production)**: <https://hostscena.sanity.studio/>
- **Frontend URL**: <https://hostscena.netlify.app>

## Kom i gang

Installer avhengigheter:

```bash
npm install
```

```bash

cd frontend
npm install
```

```bash
cd studio
npm install
```

Start dev-server:

```bash
npm run dev
```

## Formatering og linting

Kjør begge med en kommando:

```bash
cd frontend
npm run format
```

### Eller separat

```bash
cd frontend
npm run lint       # Kjør ESLint
npx run prettier .  # Formatter med Prettier
```

## Kodekonvensjoner

### Fil- og mappenavn

| Type        | Navnekonvensjon           | Eksempel                   |
| ----------- | ------------------------- | -------------------------- |
| Sider       | lowercase                 | `app/program/page.tsx`     |
| Komponenter | PascalCase                | `Button.tsx`, `Header.tsx` |
| Mapper      | lowercase                 | `components/ui`, `hooks/`  |
| Hooks       | camelCase (start med use) | `useScroll.ts`             |
| Utils       | camelCase                 | `fetchData.ts`             |
