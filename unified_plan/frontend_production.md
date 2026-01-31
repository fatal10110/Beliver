# Frontend (Production) - Unity

## 1. Technology Stack
*   **Engine**: **Unity 6** (Latest LTS).
*   **Language**: **C#**.
*   **Platforms**: iOS, Android, PC (Steam), WebGL (Secondary).

## 2. Architecture

### Core Systems
*   **Game State Manager**: Deserializes authoritative state from backend into GameObjects.
*   **Grid System**: Hex-based map rendering, pathfinding (A*), and coordinate conversion.
*   **Doctrine Editor**: Scripture templates, linting, compile button, and "Rules Fired" timeline.
*   **Policy Inspector**: JSON/DSL preview, rule precedence, and complexity budget meter.
*   **Match Playback**: Turn scrubber, VP breakdown, and result explanation.
*   **Oracle Feed UI**: Spectator feed of AI inner monologue and sermons.

### Network Layer
*   **API Client**: Handles HTTP calls for Auth, Profiles, Inventory.
*   **Compiler Client**: Sends Scripture to Compiler Service, receives Doctrine Policy + policy hash.
*   **Match Client**: Requests simulations, downloads replays, and fetches policy metadata.
*   **Socket Client**: WebSocket for notifications (turn ready, season results, feed updates).
*   **Resiliency**: Offline planning for Scripture editing and queued compile attempts.

## 3. Visual Style
*   **Art Direction**: Stylized low-poly 2.5D map for mobile performance.
*   **UI**: Diegetic elements (scrolls, wax seals) mixed with clean modern UX overlay.

## 4. Development Stages
1.  **Vertical Slice**: One faction, Scripture editor -> compile -> local deterministic sim.
2.  **Network Integration**: Connect to compiler service + server-authoritative simulation.
3.  **Alpha**: Full loop with Doctrine debugging and Oracle feed.
4.  **Beta**: Polish, VFX, Audio, and performance.
