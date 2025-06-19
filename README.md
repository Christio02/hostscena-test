# Høstscena - Festival Website

A Next.js + Sanity CMS website for the Høstscena festival, built using the clean template structure: <https://github.com/sanity-io/sanity-template-nextjs-clean>

## Project Structure

This project follows a monorepo structure with workspaces:

```
HostScena/
├── package.json              # Root workspace configuration
├── .gitignore               # Root gitignore
├── netlify.toml             # Deployment config
│
├── frontend/                # Next.js app (localhost:3000)
│   ├── package.json
│   ├── .env.local           # NEXT_PUBLIC_* variables
│   ├── sanity.config.ts     # Embedded studio config
│   └── src/
│       ├── app/             # Next.js App Router
│       ├── components/      # React components
│       ├── sanity/          # Sanity integration
│       └── styles/          # CSS files
│
└── studio/                  # Sanity Studio (localhost:3333)
    ├── package.json
    ├── .env.production      # SANITY_STUDIO_* variables
    ├── sanity.config.ts     # Studio configuration
    └── src/
        ├── schemaTypes/     # Content schemas
        ├── structure/       # Studio structure
        └── presentation/    # Preview resolvers
```

## Dataset Strategy

This project uses **two datasets** to ensure safe development:

- **testing**: For local development and content testing
- **production**: For live website and deployed studio

### Local Development (localhost)

Frontend (localhost:3000) → connects to testing dataset
Studio (localhost:3333) → connects to testing dataset

### Production Deployment

Frontend (Netlify) → connects to production dataset
Studio (mange.sanity.io) → connects to production dataset

## Environment Variables

#### Remember to set these

### Frontend (.env.local) - Local Development

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="jbwzfx7e"
NEXT_PUBLIC_SANITY_DATASET="testing"
NEXT_PUBLIC_SANITY_API_VERSION="2025-06-12"
SANITY_API_READ_TOKEN="your-token-here"
```

### Studio (.env.local) - Local Development

```bash
SANITY_STUDIO_PROJECT_ID="jbwzfx7e"
SANITY_STUDIO_DATASET="testing"
SANITY_STUDIO_API_VERSION="2025-06-12"
SANITY_STUDIO_PREVIEW_URL="http://localhost:3000"
```

### Studio (.env.production) - Production Deployment

```bash
SANITY_STUDIO_PROJECT_ID="jbwzfx7e"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_API_VERSION="2025-06-12"
SANITY_STUDIO_PREVIEW_URL="https://hostscena.netlify.app"
```

### Netlify Environment Variables - Production Deployment

These are set in the Netlify dashboard

```bash

NEXT_PUBLIC_SANITY_PROJECT_ID=<id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-12
SANITY_API_READ_TOKEN=your-token-here
```

## Moving Changes from Testing to Production

Navigate to /studio directory to run these commands

### For Schema Changes (Recommended)

```bash
# 1. Deploy schema changes to production studio
npm run deploy:studio

# 2. Manually recreate content in production studio
# This ensures data integrity and lets you review changes
```

### For Content-Only Changes

```bash

# 1. Always backup production first
npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz

# 2. Export specific document types from testing
npx sanity dataset export testing --types article,event,person --output changes.tar.gz
# or export all content
npx sanity dataset export testing --output changes.tar.gz

# 3. Import to production (merges, doesn't replace)
npx sanity dataset import changes.tar.gz production

```

## ⚠️ Important Dataset Safety Warning

**Never use `--replace` on production dataset - always backup first!**

The `--replace` flag will completely overwrite your production data. Always use the merge approach shown above for safer content transfers.

## Development

Navigate to root
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

### Testing Content Changes

1. Edit content in local Studio (localhost:3333)
2. Click "Publish" to save changes to testing dataset
3. View changes immediately in local frontend (localhost:3000)
4. When satisfied, migrate changes to production dataset

## Deployment

### Deploy Studio

```bash
cd studio
npx sanity deploy
```

or from root:

```bash
npm run deploy:studio
```

### Deploy Frontend

Automatically happens when merging a PR into `main` branch via Netlify. If you need to manually trigger a build, run:

```bash
npm run build --workspace=frontend
```

## Content Management

- **Studio URL (Local)**: <http://localhost:3333>
- **Studio URL (Production)**: Go to mange.sanity.io and select the project, then click "Open Studio"
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
