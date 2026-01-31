# Frontend (Production) - Unity

## 1. Technology Stack
*   **Engine**: **Unity 6** (Latest LTS).
*   **Language**: **C#**.
*   **Platforms**: iOS, Android, PC (Steam), WebGL (Secondary).

## 2. Architecture

### Core Systems
*   **Game State Manager**: Deserializes JSON state from backend into GameObjects.
*   **Grid System**: Hex-based map rendering, pathfinding (A*), and coordinate conversion.
*   **UI Toolkit**: Responsive UI for complex strategy menus.

### Network Layer
*   **API Client**: Handles HTTP REST calls to Node.js backend (Login, Lobby).
*   **Socket Client**: WebSocket connection for real-time updates (Lobby chat, Turn ready notifications).
*   **Resiliency**: Offline mode for planning turns (queue actions locally, sync when online).

## 3. Visual Style
*   **Art Direction**: Stylized Low-Poly or "2.5D" Map (Civilization/Old World style) to run well on mobile.
*   **UI**: Diegetic elements (scrolls, wax seals) mixed with clean modern UX overlay.

## 4. Development Stages
1.  **Vertical Slice**: 1 Faction, Basic Map, Local Hotseat Combat.
2.  **Network Integration**: Connecting to Backend for Login/Matchmaking.
3.  **Alpha**: Core Gameplay Loop with basic graphics.
4.  **Beta**: Polish, VFX, Audio.
