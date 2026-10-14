# Money Trip

A trip expense app for six participants. The planned app lets one manager
record expenses and payments. Participants can view the trip through a shared
link without an account.

## Current status

Ticket 1 is complete: the project and database foundation are in place.
TanStack Start and TanStack Router are installed. Build, type checks, four
local D1 tests, and local migration checks have passed.

The app currently has a basic page. Login, trip setup, expense calculations,
payment records, the full interface, sharing, and MCP support remain in
tickets 2–8. The app is not ready for production use.

## Technology

- TanStack Start and TanStack Router with React and TypeScript.
- Cloudflare Workers, built with Vite and the Cloudflare plugin.
- Cloudflare D1 through the Worker binding `DB`.
- SQL migrations without an ORM.
- Node.js tests with a separate local D1 database for each test through Miniflare.

Package versions are fixed in `package.json` and `package-lock.json`.

## Install

Use Node.js 22.12 or later and npm. Clone with an SSH key that has access to
the repository:

```sh
git clone git@github.com:anstlichstudent/money-trip.git
cd money-trip
npm ci
```

## Check the project

```sh
npm run build
npm run typecheck
npm test
```

| Command | Purpose |
| --- | --- |
| `npm run build` | Generate the route tree and build the browser assets and Worker. |
| `npm run typecheck` | Generate Worker types and check TypeScript source files. |
| `npm test` | Check the migration, rupiah limits, foreign keys, and trip boundaries. |
| `npm run cf:types` | Generate Worker and binding types separately. |
| `npm run db:migrate:local` | Apply pending migrations to local D1 storage. |

These commands do not start the app server or deploy the app. There are no
`dev` or `deploy` scripts yet. Worker types are generated locally and excluded
from Git.

## Local database

```sh
npm run db:migrate:local
```

This command uses `.wrangler/` for local storage and does not change a remote
database. The initial migration creates empty tables. It does not add example
participants or transactions. Test records exist only in the test databases.

## Production setup

The `database_id` in `wrangler.jsonc` is an all-zero placeholder for local use.
Before deployment, create a D1 database in the target Cloudflare account,
replace the placeholder with its real ID, and apply the migrations to that
database. Production credentials are not included in this repository.

Deployment and browser checks have not been completed.

## Project files

- `src/routes/`: application routes and the HTML document.
- `src/router.tsx`: TanStack Router configuration.
- `migrations/`: database migrations.
- `tests/database.test.mjs`: local D1 constraint tests.
- `public/fonts/`: local Geist and Geist Mono fonts with their licenses.
- [Feature specification](.scratch/trip-expenses/spec.md).
- [Technical specification](.scratch/trip-expenses/technical-spec.md).
- [Implementation tickets](.scratch/trip-expenses/issues/).
- [Design reference](DESIGN.md).
