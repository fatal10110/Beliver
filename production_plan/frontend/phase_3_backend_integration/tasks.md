# Frontend Phase 3: Backend Integration (Socket.io)

**Goal**: Connect `apps/client` to `apps/server` via WebSocket.

## 1. Network Layer
- [ ] **Socket Setup**: `pnpm add socket.io-client`.
- [ ] **Context/Store**: Create `SocketContext` or Zustand middleware to manage connection.
- [ ] **Events**: Listen for:
    - `connect`: Connection established.
    - `game_updated`: Receive full or partial `GameState`.
    - `exception`: Receive error messages.

## 2. Lobby UI
- [ ] **Rest API**: Use `fetch('/api/auth/login')` for initial JWT.
- [ ] **Matchmaking**: Button "Find Match" -> Emits `join_queue`.
- [ ] **Waiting Screen**: Show "Searching for worthy prophets..." spinner.

## 3. Game Loop Sync
- [ ] **Action emitter**: When user clicks "End Turn":
    - Emit `submit_turn` with `{ gameId, actions }`.
- [ ] **State Reconciliation**:
    - On `game_updated`: Update Zustand store.
    - If local optimistic state differs from server state -> Snap to server state (Visual correction).

## 4. The Sanctuary (Code Editor)
- [ ] **Monaco Editor**: Integrate `@monaco-editor/react`.
- [ ] **Submission**: "Upload Scripture" button sends the text content to the backend.
- [ ] **Feedback**: Display compilation errors or "Agent accepted new protocol" toast.
