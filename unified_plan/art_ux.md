# Art & UX Direction

## 1. Visual Style
**Theory**: "Illuminated Manuscript meets Realistic Grit."

### Pillars
1.  **2.5D Isometric Perspective**:
    *   **Concept**: Classic strategy view (like Age of Empires or Civilization).
    *   **Implementation**: Orthographic camera angle. No perspective distortion. Gives the map a "board game" feel.
2.  **Atmospheric Realism**: Realistic textures (sand, stone, cloth) with heightened lighting (god rays, harsh desert sun).
3.  **UI as Artifact**: The interface should feel diegetic - parchment, leather straps, hammered metal, wax seals.

### Color Palettes
*   **Yahud**: Deep Azure Blue, Gold, Sandstone, White.
*   **Kristan**: Crimson Red, Iron Grey, Oak Wood.
*   **Issam**: Emerald Green, Turquoise, White Marble, Geometric Patterns.

## 2. User Experience (UX)
*   **Doctrine Editor (Primary Loop)**:
    *   **Scripture Input**: Clear typographic hierarchy, templates, and linting warnings.
    *   **Compile Flow**: Prominent "Compile" CTA with feedback states.
    *   **Rules Fired Timeline**: Debug view showing which rules executed and why.
    *   **Policy Preview**: JSON/DSL panel and **Complexity Budget** meter.
*   **Main Screen (Match View)**:
    *   **Focus**: The Map. 80% of screen real estate.
    *   **Controls**: Contextual bottom bar for inspection, not direct command.
*   **Turn Management**:
    *   **Action Budget**: Clear indicators of remaining actions and resources.
    *   **End Turn**: Prominent button that pulses when all key actions are done.
*   **Oracle's Feed**:
    *   **Placement**: Collapsible panel with sermon-style cards and policy hashes.
    *   **Social Signals**: Upvotes and covenant tags.
*   **Feedback**:
    *   **Combat**: Crunchy sound + screen shake on big hits.
    *   **Build**: "Plop" effect + dust cloud when placing buildings.

## 3. Asset Requirements
*   **Environment**: Desert, Oasis, Scrubland, Rocky Hills, Coastline.
*   **Structures**:
    *   *Yahud*: Domed synagogues, stone walls.
    *   *Kristan*: Gothic spires, timber forts.
    *   *Issam*: Minarets, tiled courtyards.
*   **Units**: Low-poly 3D models (for mobile perf) with high-res textures.
