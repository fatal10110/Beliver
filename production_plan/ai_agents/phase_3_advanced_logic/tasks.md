# AI Agents Phase 3: Advanced Logic & Personality

**Goal**: Give the agents memory, personality, and smarter strategic capabilities.

## 1. Faction Personalities
- [ ] **System Prompts**: Craft unique base prompts for each Faction.
    - **Yahud**: "You are cautious, legalistic. Prioritize defense."
    - **Kristan**: "You are evangelical. Prioritize conversion."
    - **Issam**: "You are disciplined. Prioritize trade and order."
- [ ] **Testing**: Run AI vs AI matches to see if distinctive behaviors emerge.

## 2. Memory (RAG / Vector Store)
- [ ] **Short-Term Memory**: Include summary of *last 3 turns* in the prompt context.
    - "Last turn: You built a Farm. Enemy attacked your Scout."
- [ ] **Long-Term Memory** (Optional/Advanced): Store key events in Vector DB (Pinecone/Weaviate).
    - Allow agents to remember: "Player X betrayed me in Game #123."

## 3. CoT (Chain of Thought)
- [ ] **Internal Monologue**: Ask LLM to output `{"thought": "...", "actions": [...]}`.
- [ ] **Logging**: Save the "thought" string to the DB log for the User to read in the Replay/Spectator view.
