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

# Rule: Update Implementation Progress

**Goal**: Ensure `production_plan/implementation_progress.md` remains the Source of Truth for the project's state.

## 1. When to Check
You MUST check `production_plan/implementation_progress.md` whenever you:
1.  **Complete a Task**: Finishing a checklist item in a `tasks.md` file.
2.  **Add a Feature**: Creating a new component, module, or service.
3.  **Fix a Bug**: If the fix changes the status of a known issue or blocker.
4.  **Change Architecture**: If a plan pivots (e.g., adding "Policy Executor").

## 2. How to Update
1.  **Mark Checkboxes**: Change `[ ]` to `[x]` for completed high-level items.
2.  **Update Status Badge**: Change ⚪ (Not Started) -> 🟡 (Pending) -> 🟢 (Complete).
3.  **Add Log Entry**: Add a bullet point under `## Recent Updates` with the date and a 1-line summary of what changed.

## 3. Enforcement
*   If you perform a `task_boundary` update that marks a task as **COMPLETE**, you **MUST** verify if `implementation_progress.md` needs a corresponding update.
*   Do not leave the progress file stale. It is the dashboard for the User.
