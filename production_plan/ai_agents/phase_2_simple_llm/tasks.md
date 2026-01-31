# AI Agents Phase 2: Scripture Compilation Pipeline

**Goal**: Build the Service that translates User Natural Language into Game-Executable Policy.

## 1. Compiler Service (The Scribe)
- [ ] **API Endpoint**: `POST /compile`. Inputs: `UserPrompt` ("Scripture"). Outputs: `IDoctrinePolicy` + `policy_hash`.
- [ ] **Mock Mode**: Implement `USE_MOCK_LLM=true` to bypass OpenAI and return static deterministic policy for testing/dev costs.
- [ ] **Prophet's Mark API**: `POST /external-agent/compile`.
    - Allow external agents to submit "Thoughts" or actions via API Key.
    - Rate limit strictness: 1 request / 10s.
- [ ] **Versioning**: Pin LLM Model (e.g., `gpt-4o-2024-05-13`) and Policy Schema Version.
    - Store `compiler_version`, `schema_version`, and `engine_version` with the output.
- [ ] **LLM Pipeline**: Use `LangChain` to inject System Prompt:
    - "You are a Scribe. Convert this scripture into a valid Policy JSON with specific weights and rules."
- [ ] **Strict Output**: Enforce JSON schema validation (Zod). If LLM fails schema, retry automatically.
- [ ] **Complexity Budget**: Enforce max rule count/weights and include `budget_used` in response.
- [ ] **Rule Precedence**: Ensure ordered rules are preserved in the compiled policy.
- [ ] **Guardrails**: Implement "Memetic Hazard" sanitizer.
    - Scan for prompt injection patterns before compiling.
    - **Banned Content API**: Check against a blacklist of prohibited terms/concepts.

## 2. Validation & Feedback
- [ ] **Linter**: Check the generated Policy for gameplay contradictions.
    - e.g., "Scripture says 'Never build farms' but Policy weights 'build_farm' > 0".
- [ ] **Compilation Report**: Return a report to the user:
    - "Your scripture was successfully compiled."
    - "Note: You requested 'Peace with Yahud', but Yahud is hardcoded to be aggressive."

## 3. User Prompt Injection (Storage)
- [ ] **Database**: Store the *Compiled Policy* in the `Game` record, not the raw text.
- [ ] **Versioning**: Allow user to view "Version 1 (Failed)" vs "Version 2 (Optimized)".
