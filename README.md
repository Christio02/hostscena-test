# Høstscena
Dette prosjektet er bygget med Next.js (App Router), TypeScript, Tailwind CSS og Sanity CMS.

## Kom i gang

Installer avhengigheter:

```bash
npm install
```

Start dev-server:

```bash
npm run dev
```

## Formatering og linting

Kjør begge med en kommando:

```bash
npm run format
```

### Eller separat:

```bash
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
