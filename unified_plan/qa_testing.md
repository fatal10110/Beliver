# Quality Assurance (QA) & Testing Strategy

## 1. Testing Phases

### Phase 1: Automated Testing (CI/CD)
*   **Unit Tests (Go/Node)**: Verify game logic formulas (e.g., "Does damage calculation match design spec?").
*   **Integration Tests**: Test API endpoints (Login, Matchmaking).
*   **Sanity Checks**: Automated bot matches (AI vs AI) to check for crashes or desyncs.

### Phase 2: Internal Playtesting (Alpha)
*   **Focus**: Fun Factor & Core Loop.
*   **Cadence**: Weekly team playtest sessions.
*   **Feedback**: Simple Google Form or Jira board for "Feel" issues.

### Phase 3: External Beta (Closed/Open)
*   **Focus**: Load Testing & Edge Cases.
*   **Tools**:
    *   **Crash Reporting**: Sentry.
    *   **Bug Reports**: In-game "Report Bug" button sends logs + screenshot automatically.

## 2. Key Test Areas
1.  **Network Conditions**: Test on 3G/High Latency to ensure turn Sync works.
2.  **Device Compatibility**:
    *   Min Spec Mobile (iPhone 8 / Low-end Android).
    *   Browser performance (Chrome/Safari/Firefox).
3.  **Economy Validation**: Ensure no infinite money exploits.
4.  **Save/Load Integrity**: Verify game state is never lost even if server restarts.

## 3. Cheat Prevention
*   **Server Authority**: Never trust client inputs.
*   **Validation**: Server checks "Is unit move distance <= max_speed?" for every move packet.
*   **Rate Limiting**: Prevent API spam.
