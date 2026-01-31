# Compiler Service (Mock)

Minimal mock compiler service used for local dev and integration wiring.

## Endpoints
- `GET /health` -> `ok`
- `POST /compile` -> returns a stub policy + metadata

## Run locally
```
COMPILER_PORT=8082 node src/index.js
```
