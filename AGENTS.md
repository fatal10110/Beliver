# Rule: Comprehensive Agent Reviews

On each **code change**, **plan update**, or **new feature**, you must:

1.  **Run Every Agent**: Invoke every agent defined in the `agents/` folder to review the changes.
2.  **Comprehensive Scrutiny**: Agents must catch **ALL** issues, not just critical blockers. This includes:
    -   Code Quality & Best Practices
    -   Consistency with `concept.md`
    -   Typos & Naming Conventions
    -   Edge Cases & Tech Debt
    -   UI/UX Nuances
3.  **Strict Resolution**:
    -   Every single note raised by an agent must be **FIXED** in the code, OR
    -   The relevant **Plan Document** (e.g., `tasks.md`, `concept.md`) must be updated to reflect the new decision or constraint.
    -   **NO** feedback can be ignored or "left for later" without a tracked task.
4.  **Feedback Loop**: Continue the review cycle until **ALL** agents approve and **ALL** notes are resolved.

# Required Review Steps
1.  Gather the current diff and identify the files touched in this change set.
2.  Run every agent in `agents/` and capture their notes as a checklist.
2.1 If the change touches rendering/UI/simulation playback (code or assets), require a visual sanity check (screenshot or explicit expected/actual) and file a note if missing. Skip for documentation-only changes.
2.2 If available and the change can affect the game (code or assets), run `npm run visual:check` to capture headless screenshots for the review record. Skip for documentation-only changes.
3.  Fix every note in code or update the relevant plan document to record the decision.
4.  Re-run all agents until there are no remaining notes.
5.  Summarize the resolved notes in the final response.

# Rule: Update Implementation Journal

**Goal**: Ensure `production_plan/implementation_journal/` remains the Source of Truth for the project's state.

## 1. When to Update
You MUST add a journal entry whenever you:
1.  **Complete a Task**: Finishing a checklist item in a `tasks.md` file.
2.  **Add a Feature**: Creating a new component, module, or service.
3.  **Fix a Bug**: If the fix changes the status of a known issue or blocker.
4.  **Change Architecture**: If a plan pivots (e.g., adding "Policy Executor").
5.  **Exception**: Documentation-only changes (Markdown/plan edits) do **NOT** require a journal entry.

## 2. How to Update
1.  **Create a Journal File**: After each implementation session or implemented step, add a new Markdown file in `production_plan/implementation_journal/`.
2.  **Filename Format**: Use `YYYY-MM-DD-<short-slug>.md` and keep names unique.
3.  **Entry Content**: Include the date and a short summary of the implemented step (and key files/tasks when helpful).
4.  **Build Verification**: At the end of each implementation step that changes code or assets, run `npm run build` to ensure TypeScript compilation passes.

## 3. Enforcement
*   If you perform a `task_boundary` update that marks a task as **COMPLETE**, you **MUST** add a journal entry (unless the change set is documentation-only).
*   Do not leave the journal stale. It is the dashboard for the User.
