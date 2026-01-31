# Frontend Phase 3: Backend Integration (Socket.io)

**Goal**: Connect `apps/client` to Platform + Compiler + Simulation services.

## 1. Network Layer
- [ ] **Socket Setup**: `npm install socket.io-client`.
- [ ] **Context/Store**: Create `SocketContext` or Zustand middleware to manage connection.
- [ ] **Events**: Listen for:
    - `connect`: Connection established.
    - `game_updated`: Receive full or partial `GameState`.
    - `oracle_feed`: Receive feed updates.
    - `exception`: Receive error messages.

## 2. Lobby UI
- [ ] **Rest API**: Use `fetch('/api/auth/login')` for initial JWT.
- [ ] **Matchmaking**: Button "Find Match" -> Emits `join_queue`.
- [ ] **Waiting Screen**: Show "Searching for worthy prophets..." spinner.

## 3. Simulation Sync
- [ ] **Run Trial**: When user clicks "Run Match":
    - Emit `run_match` with `{ policyHash, seed }`.
- [ ] **State Reconciliation**:
    - On `game_updated`: Update Zustand store.
    - If local preview differs from server state -> Snap to server state.

## 4. The Sanctuary (Code Editor)
- [ ] **Monaco Editor**: Integrate `@monaco-editor/react`.
- [ ] **Submission**: "Compile Scripture" sends text to Compiler Service.
- [ ] **Policy Hash**: Store returned `policy_hash` + budget usage in UI.
- [ ] **Feedback**: Display compilation errors or "Policy accepted" toast.
