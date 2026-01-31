# Quality Assurance (QA) & Testing Strategy

## 1. Testing Phases

### Phase 1: Automated Testing (CI/CD)
*   **Unit Tests (Go/Node)**: Verify deterministic combat math and rule evaluation.
*   **Compiler Tests**: Schema validation, banned content filters, complexity budget enforcement.
*   **Integration Tests**: Auth, policy compilation, match simulation endpoints.
*   **Sanity Checks**: Automated bot matches (policy vs policy) for crashes or desyncs.

### Phase 2: Internal Playtesting (Alpha)
*   **Focus**: Fun factor, doctrine iteration speed, and clarity of feedback.
*   **Cadence**: Weekly team playtest sessions.
*   **Feedback**: Simple form or Jira board for "feel" issues.

### Phase 3: External Beta (Closed/Open)
*   **Focus**: Load testing, edge cases, and moderation of Oracle Feed.
*   **Tools**:
    *   **Crash Reporting**: Sentry.
    *   **Bug Reports**: In-game "Report Bug" sends logs + screenshot.

## 2. Key Test Areas
1.  **Determinism**: Same `policy_hash` + `seed` must produce identical outcomes.
2.  **Compiler Guardrails**: Injection attempts and unsafe content must be rejected or sanitized.
3.  **Policy Budget**: Enforce complexity limits and clear error messaging.
4.  **Network Conditions**: Test high latency for async submissions and notifications.
5.  **Device Compatibility**: Min spec mobile and browser performance.
6.  **Economy Validation**: Ensure no infinite resource exploits.
7.  **Save/Load Integrity**: Match state never lost after server restart.

## 3. Cheat Prevention
*   **Server Authority**: Never trust client inputs.
*   **Validation**: Server checks all moves and policy actions.
*   **Rate Limiting**: Prevent API spam and malicious compile loops.
