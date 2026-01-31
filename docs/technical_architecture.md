# Technical Architecture & Stack

## 1. High-Level Architecture

_Sons of Abrim_ requires a robust, server-authoritative architecture to handle asynchronous multiplayer turns, prevent cheating, and manage persistent world states.

### Client-Server Model

- **Pattern:** Thin Client / Thick Server.
- **Communication:**
  - **HTTPS/REST:** For non-time-critical actions (Login, Inventory, Shop, Leaderboards).
  - **WebSockets:** For real-time notifications (Turn completion, Chat, Diplomacy offers).
  - **gRPC:** For high-performance gameplay state synchronization.

## 2. Technology Stack Recommendations

### Game Engine: Unity (Recommended)

- **Reasoning:** Excellent 2D/3D hybrid support, strong mobile optimization pipeline, vast asset store for prototyping strategy grids/UI.
- **Alternative:** Godot (for lightweight overhead) or Unreal (if aiming for AAA high-fidelity graphics, though likely overkill for mobile strategy).

### Backend Infrastructure

- **Language:** Go or C# (.NET Core).
- **Database:**
  - _Primary (State):_ PostgreSQL (Relational data for user accounts, alliances).
  - _Game State:_ Redis (Hot storage for active match sessions/caching).
  - _Logs:_ MongoDB or Elasticsearch (For battle replays and chat logs).
- **Hosting:** AWS GameLift or Google Cloud Game Servers.

## 3. Key Technical Systems

### A. Asynchronous Turn Manager

- Must handle "Simultaneous Turn Resolution" or "Sequential" depending on design.
- **Job Queue:** When a turn ends, a server-side worker processes all queued actions (Build, Move, Attack) and resolves conflicts (e.g., two armies moving to the same tile).

### B. Fog of War & Map Generation

- **Map Gen:** Procedural generation based on seed (Perlin noise for terrain).
- **Visibility:** Server calculates visibility; Client only receives data for visible tiles to prevent map-hack cheats.

### C. Cross-Platform UI

- **Challenge:** Complex strategy menus on mobile screens.
- **Solution:** Responsive UI framework (e.g., Unity UI Toolkit). Context-sensitive menus (radial menus for touch).

### D. Data Serialization

- Use **Protobuf** for efficient serialization of game state (Map tiles, Unit positions) to minimize bandwidth on mobile networks.

## 4. Security Considerations

- **Anti-Cheat:** Server-side validation of all moves.
  - _Sanity Check:_ "Can Unit X actually move to Tile Y in 1 turn?"
  - _Resource Check:_ "Does Player have enough Gold?"
- **Encryption:** TLS 1.3 for all traffic.

## 5. Analytics

- Integrate events for:
  - Tutorial completion rates.
  - Resource bottlenecks (Economy balancing).
  - Monetization conversion points.
