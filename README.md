# money-app

TanStack Start on Cloudflare Workers, with a D1 binding named `DB`.
Requires Node.js 22.12 or later and npm.

```sh
npm ci
npm run build
npm run cf:types
npm run typecheck
npm test
npm run db:migrate:local
```

Build generates the route tree. `cf:types` generates Worker and binding types.
`typecheck` generates Worker types and checks TypeScript source files.
Tests apply the production migration to an isolated local D1 database in
Miniflare. Test records are confined to that database. Local migration uses
Wrangler storage in `.wrangler/`; it does not change a remote database.

The migration creates empty tables. Trip setup, authentication, expense logic,
and the final interface belong to later tickets.

Before a future deployment, create a D1 database in the target Cloudflare
account and replace the local placeholder `database_id` in `wrangler.jsonc`
with its real ID. The all-zero ID is for local use only. Apply the migrations
to that database before deployment. No production database or credentials are
included in this repository.

Server startup, browser checks, remote migrations, and deployment require user
permission. None of the commands above start the application server or deploy.
