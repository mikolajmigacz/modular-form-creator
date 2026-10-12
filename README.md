# Modular Form Creator

Resources Management SPA (React) + Express API.

## Run

```bash
cp .env.example .env
docker compose up -d
```

| Service  | URL                         |
|----------|-----------------------------|
| Frontend | http://localhost:5173       |
| API      | http://localhost:5001       |
| Swagger  | http://localhost:5001/docs  |

Local frontend only: `npm install && npm run dev` (API must be running).

## Structure

```
src/
  App.tsx, router.tsx, query-client.ts
  design-system/          # read-only
  shared/                 # api client, shell UI
  resources/
    api/                  # HTTP ↔ backend contract
    model/                # types, constants, zod schemas, business rules
    store/completedEdit/  # types + pure buffer logic + thin Zustand adapter
    hooks/                # React Query + URL filters
    components/ pages/
```

Imports: `pages → components/hooks/store → api/model → shared | design-system`.

## Routes

- `/resources`
- `/resources/:resourceId`
- `/resources/:resourceId/basic-info`
- `/resources/:resourceId/project-details`
- `/resources/:resourceId/details`

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm run test:unit`
