# Sons of Abrim (Web POC)

Short guide to run the current monorepo stack.

## Prerequisites
- Node.js >= 18
- Go 1.22+
- Docker (optional, for Postgres/Redis)

## Quick Start (all services)
```bash
npm install
npm run dev
```

## With local infrastructure (recommended for backend)
```bash
docker-compose up -d
npm install
npm run dev
```

## Useful filters
Run only the client:
```bash
npm run dev -- --filter=client
```

Run only the simulation:
```bash
npm --workspace simulation run dev
```

If you hit the macOS LC_UUID dyld error, run once in your shell:
```bash
export GOFLAGS="-ldflags=-linkmode=external"
```

## Visual review (headless)
```bash
npx playwright install chromium
npm run dev -- --filter=client
npm run visual:check -- --url=http://localhost:5173
```

## Notes
- The client currently aliases `shared-types` to source for Vite/TS dev.
- The simulation service is a scaffold; match execution is not implemented yet.
