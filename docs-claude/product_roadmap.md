# Product Roadmap

## Overview

This roadmap outlines the phased development of Sons of Abrim from initial concept through launch and post-launch operations. Timeline estimates are based on a team of 15-25 people and assume adequate funding.

**Total Development Time: 18-24 months to launch**

## Phase 0: Pre-Production (Months 1-3)

### Goals
- Validate core game concept
- Assemble core team
- Establish development infrastructure
- Create vertical slice prototype

### Key Deliverables

**Game Design:**
- [x] High-level game design document (concept.md)
- [ ] Core gameplay loop specification
- [ ] Faction design details (3 factions fully specified)
- [ ] Economy balance spreadsheet (initial tuning)
- [ ] UI/UX wireframes

**Technical:**
- [ ] Choose tech stack (engine, backend, database)
- [ ] Set up development environment (version control, CI/CD)
- [ ] Create basic multiplayer prototype (2 players, basic turn resolution)
- [ ] Proof of concept: Turn-based networking

**Art & Audio:**
- [ ] Art direction document (visual style guide)
- [ ] Concept art for each faction (3-5 pieces each)
- [ ] Mood boards and reference collections
- [ ] Audio direction document (music style, SFX direction)

**Business:**
- [ ] Secure funding (seed round, publisher, or self-funded commitment)
- [ ] Finalize budget and team hiring plan
- [ ] Legal entity formation, contracts
- [ ] Market research and competitive analysis

### Team (5-10 People)
- 1 Technical Lead / Architect
- 2 Engineers (backend + client)
- 1 Game Designer
- 1 Producer
- 2 Artists (concept + 3D)
- 1 UI/UX Designer (contract or part-time)

### Budget: $150K-$300K
- Primarily personnel costs
- Prototyping tools and software
- Legal and administrative

### Success Criteria
- ✓ Playable vertical slice (2 players can play 10 turns, core loop functional)
- ✓ Funding secured for full development
- ✓ Core team hired and onboarded
- ✓ Technical feasibility validated (multiplayer works, performance acceptable)

---

## Phase 1: Foundation & MVP (Months 4-12)

### Goals
- Build core game systems (single-player functional)
- Create foundational content (1 faction playable, basic maps)
- Establish production pipeline
- Reach internal alpha (team playtests)

### Milestones

#### Milestone 1.1: Core Systems (Months 4-6)

**Game Systems:**
- [x] Turn-based game loop (submit actions → resolve turn → report results)
- [ ] Resource management (Faith, Food, Wood, Population)
- [ ] Building system (construction, upgrades, effects)
- [ ] Population system (growth, death, happiness, devotion)
- [ ] Basic combat system (unit stats, combat resolution)
- [ ] AI opponent (simple rule-based AI for single-player)

**Technical:**
- [ ] Backend services (Auth, Game Logic, basic API)
- [ ] Database schema (PostgreSQL tables for game state)
- [ ] Client-server communication (REST API or WebSockets)
- [ ] Unity client basics (map rendering, UI scaffolding)

**Content:**
- [ ] 1 faction fully implemented (Yahud, Kristan, or Issam)
- [ ] 10-15 buildings (Tiers 1-2)
- [ ] 5-8 unit types
- [ ] Basic terrain (3-4 types)
- [ ] 1 small map

**Team:** 12-15 people (expanded from pre-production)

#### Milestone 1.2: Content & Polish (Months 7-9)

**Game Systems:**
- [ ] All 3 factions implemented
- [ ] Faith spells/abilities (5 per faction)
- [ ] Diplomacy basics (trade offers, alliances)
- [ ] Advanced combat (siege, terrain effects)
- [ ] Random events (10-15 events)

**Technical:**
- [ ] Matchmaking service (basic queue system)
- [ ] Turn resolution optimization (handle 100+ concurrent games)
- [ ] Redis caching for performance
- [ ] Security hardening (anti-cheat basics)

**Content:**
- [ ] All 3 factions complete (15 buildings, 8 units, 5 spells each)
- [ ] 3 map sizes (small, medium, large)
- [ ] 5 terrain types
- [ ] Basic UI (all core screens functional)
- [ ] Placeholder art (functional but not final quality)

**Team:** 15-20 people

#### Milestone 1.3: Internal Alpha (Months 10-12)

**Game Systems:**
- [ ] Multiplayer (2-6 players per game)
- [ ] Full tutorial / onboarding flow
- [ ] Victory conditions (3+ victory types)
- [ ] Game balance (initial tuning pass)

**Technical:**
- [ ] Notification system (WebSockets for real-time updates)
- [ ] Player profiles and progression (leveling system)
- [ ] Backend stability (handle 500+ concurrent games)
- [ ] Monitoring and logging (DataDog, Sentry)

**Content:**
- [ ] All art assets to "alpha quality" (70% final)
- [ ] UI fully functional (not fully polished)
- [ ] 5 campaign missions (tutorial scenarios)
- [ ] 20 random events
- [ ] Basic sound effects and music (placeholder or early versions)

**Testing:**
- [ ] Internal playtests (team plays daily)
- [ ] QA begins (1-2 dedicated testers)
- [ ] Balance data collection (faction win rates, game length)

**Team:** 18-22 people

### Phase 1 Budget: $800K-$1.5M
- Personnel (12-18 months for growing team)
- Infrastructure (development servers, tools)
- Software licenses

### Success Criteria
- ✓ Closed alpha playable by internal team
- ✓ Core gameplay loop engaging (internal feedback positive)
- ✓ All 3 factions functional and distinct
- ✓ Technical stability (no critical bugs, performance acceptable)

---

## Phase 2: Beta & Content Expansion (Months 13-18)

### Goals
- Polish all systems and content
- Closed beta with external players
- Open beta for stress testing
- Finalize monetization implementation

### Milestones

#### Milestone 2.1: Closed Beta (Months 13-15)

**Game Systems:**
- [ ] All faction abilities balanced (data-driven tuning)
- [ ] Advanced diplomacy (vassals, reputation system)
- [ ] Social features (friends, guilds, chat)
- [ ] Ranked matchmaking (ELO system)

**Technical:**
- [ ] Store system (Stripe integration, inventory)
- [ ] Battle Pass system (progression, rewards)
- [ ] Scalability improvements (handle 5K+ concurrent games)
- [ ] Anti-cheat v2 (statistical anomaly detection)

**Content:**
- [ ] All art assets to "beta quality" (90% final)
- [ ] UI polish (animations, transitions, final layout)
- [ ] 10 campaign missions
- [ ] 30-40 random events
- [ ] Full music score (3 faction themes + 10 gameplay tracks)
- [ ] Core sound effects complete

**Monetization:**
- [ ] Cosmetic store functional (10-15 launch cosmetics)
- [ ] Battle Pass Season 0 (test season)
- [ ] Payment flow tested and secure

**Testing:**
- [ ] Closed beta with 300-1000 external players (NDA)
- [ ] Feedback surveys and focus groups
- [ ] Balance adjustments based on beta data
- [ ] QA team (3-4 testers)

**Team:** 20-25 people

#### Milestone 2.2: Open Beta (Months 16-18)

**Game Systems:**
- [ ] All systems feature-complete (no new features)
- [ ] Final balance pass
- [ ] Performance optimization

**Technical:**
- [ ] Infrastructure ready for launch (auto-scaling tested)
- [ ] Load testing (simulate 10K+ concurrent players)
- [ ] Security audit (external penetration testing)
- [ ] Backup and disaster recovery tested

**Content:**
- [ ] All art assets final quality (100%)
- [ ] Cinematics (opening cinematic, faction intros)
- [ ] Voice acting (campaign, unit barks)
- [ ] Localization (5 languages: EN, ES, FR, DE, PT)
- [ ] Marketing assets (trailers, screenshots, press kit)

**Marketing:**
- [ ] Community built (Discord: 10K+ members)
- [ ] Press outreach (send review keys 1 month before launch)
- [ ] Influencer partnerships (5-10 content creators)
- [ ] Launch trailer and marketing campaign

**Testing:**
- [ ] Open beta (anyone can sign up)
- [ ] Stress testing (simulate launch day load)
- [ ] Bug bash (team + community hunt for bugs)
- [ ] Final QA pass (zero critical bugs)

**Team:** 22-25 people

### Phase 2 Budget: $800K-$1.2M
- Personnel (6-month sprint)
- Marketing (influencers, ads, press)
- External services (localization, VO, security audit)
- Infrastructure (beta servers)

### Success Criteria
- ✓ Beta player feedback positive (70%+ would recommend)
- ✓ Key metrics healthy (retention, engagement, conversion)
- ✓ Zero critical bugs
- ✓ Infrastructure tested and stable

---

## Phase 3: Launch & Stabilization (Months 19-21)

### Goals
- Successful public launch
- Stabilize operations
- Rapidly respond to launch feedback
- Establish live service cadence

### Launch Preparation (Month 19)

**Pre-Launch Checklist:**
- [x] All systems tested and stable
- [ ] Launch day runbook prepared
- [ ] On-call rotation scheduled (24/7 coverage for first week)
- [ ] Marketing campaign active (ads, press, influencers)
- [ ] Community hyped (countdown events on Discord)
- [ ] Payment and store tested (mock transactions)
- [ ] Servers pre-warmed and scaled for expected load

**Launch Week (Month 19, Week 4):**
- [ ] Launch day: Servers go live, monitor closely
- [ ] 24/7 team on standby for critical issues
- [ ] Social media amplification (celebrate milestones)
- [ ] Hotfixes deployed as needed (target <4 hour turnaround)
- [ ] Daily check-ins with team (operations review)

**Success Metrics (First 7 Days):**
- 50K+ registered players (conservative target)
- 20K+ daily active users
- <1% critical error rate
- 80%+ positive reviews (Steam, app stores)

### Post-Launch (Months 20-21)

**Operations:**
- [ ] Daily hotfixes week 1-2 (critical bugs only)
- [ ] Weekly patches weeks 3-8 (balance, QoL)
- [ ] Live ops team ramped up (community managers, support)
- [ ] Data analysis (retention, monetization, balance)

**Content:**
- [ ] Month 1: First balance patch
- [ ] Month 2: First seasonal event (test live content pipeline)
- [ ] Month 3: Battle Pass Season 1 launch

**Community:**
- [ ] Discord active moderation and engagement
- [ ] Reddit community established (r/SonsOfAbrim)
- [ ] Weekly dev blogs or video updates
- [ ] First tournament announced (Month 3)

**Technical:**
- [ ] Infrastructure scaling as needed (react to player growth)
- [ ] Performance optimizations (client and server)
- [ ] Bug fixes (prioritize by severity and frequency)

### Phase 3 Budget: $400K-$800K
- Personnel (3 months + live ops ramp-up)
- Infrastructure (launch month costs spike)
- Marketing (launch campaign)
- Support (customer service tools, staffing)

### Success Criteria
- ✓ Smooth launch (no critical outages)
- ✓ Positive community reception (reviews, social sentiment)
- ✓ D7 retention: 40%+, D30 retention: 25%+
- ✓ Conversion rate: 8-12% (free to paying)
- ✓ Live ops cadence established (regular updates)

---

## Phase 4: Live Service & Growth (Months 22+)

### Goals
- Sustain and grow player base
- Regular content updates (seasonal)
- Expand platforms (mobile, console)
- Achieve profitability and long-term sustainability

### Year 1 Post-Launch (Months 22-30)

**Content Roadmap:**
- [ ] **Season 2:** "The Great Schism" (new events, balance shake-up, Battle Pass)
- [ ] **Season 3:** "Age of Martyrs" (new cosmetics, limited-time mode, Battle Pass)
- [ ] **Season 4:** "Festival of Abrim" (holiday event, community goals, Battle Pass)

**Platform Expansion:**
- [ ] Mobile client development (iOS, Android) - Months 22-27
- [ ] Cross-platform play (PC ↔ mobile) - Month 28
- [ ] Mobile soft launch (select regions) - Month 29
- [ ] Mobile global launch - Month 30

**Gameplay Expansion:**
- [ ] New map types or regions (expand world)
- [ ] Quality-of-life improvements (UI tweaks, QoL features based on feedback)
- [ ] Advanced features (guilds, advanced diplomacy, etc.)

**Marketing:**
- [ ] User acquisition campaigns (ongoing, optimized for CAC/LTV)
- [ ] Content creator program (support streamers and YouTubers)
- [ ] Esports/tournament scene (sponsor community tournaments)

**Operations:**
- [ ] Monthly balance patches
- [ ] Quarterly major updates
- [ ] Live ops team fully staffed (4-8 people)
- [ ] Financial review: Achieve profitability by Month 9-12

### Year 2+ (Months 31+)

**Expansion Options:**

**Option A: New Faction Expansion**
- 4th faction (e.g., a heretical offshoot or syncretistic faith)
- Full content suite (15 buildings, 10 units, 5 spells)
- New campaign scenarios
- Timeline: 6-9 months development
- Budget: $300K-$600K

**Option B: Console Ports**
- Xbox, PlayStation, Nintendo Switch
- Adapt UI for controllers
- Timeline: 6-9 months
- Budget: $200K-$500K

**Option C: Major Campaign Expansion**
- 20+ new single-player missions
- Deep narrative (Abrim's full story)
- New mechanics or systems (e.g., naval warfare)
- Timeline: 4-6 months
- Budget: $150K-$300K

**Option D: Competitive Season / Esports Push**
- Official tournament circuit
- Spectator tools and replay system
- Prize pools and sponsorships
- Ongoing investment

**Ongoing Priorities:**
- Seasonal content (4 seasons per year, ~$50K-$100K each)
- Balance and meta health
- Community engagement and retention
- Cost optimization (server efficiency, marketing ROI)

### Long-Term Vision (Years 3-5)

**Franchise Growth:**
- Sons of Abrim II (sequel with expanded mechanics)
- Spin-off games (mobile card game, RTS variant)
- Transmedia expansion (novels, comics, board game)
- Licensed content (partner with educational or cultural orgs)

**Community:**
- Thriving competitive scene (official leagues)
- Content creator ecosystem (dozens of streamers/YouTubers)
- Modding tools (let community create content)
- Annual convention or summit (SonsOfAbrimCon)

**Financial:**
- $10M+ annual revenue (Year 3 target)
- Profitability sustained
- Potential exit (acquisition by major publisher, or IPO if scaling massively)

---

## Risk Management & Contingencies

### Critical Risks

**1. Technical Delays**
- **Risk:** Multiplayer infrastructure harder than expected, delays launch
- **Mitigation:** Early prototyping (Phase 0), hire experienced backend engineers, external consultants if needed
- **Contingency:** Reduce scope (launch with 2 factions, add 3rd post-launch)

**2. Funding Shortfall**
- **Risk:** Budget overruns, run out of money before launch
- **Mitigation:** Conservative budgeting (20% contingency buffer), milestone-based fundraising
- **Contingency:** Seek emergency funding (bridge loan, publisher partnership), reduce team size, cut features

**3. Lack of Market Validation**
- **Risk:** Launch, but players don't engage or retention is poor
- **Mitigation:** Beta testing with real players, community building pre-launch, data-driven iteration
- **Contingency:** Pivot gameplay based on feedback, aggressive user acquisition if monetization works, worst case: gracefully shut down and learn

**4. Cultural Backlash**
- **Risk:** Offense to religious communities damages reputation
- **Mitigation:** Cultural consultants, transparent fictional framing, community dialogue
- **Contingency:** Public apology, content revisions, engage with critics constructively

**5. Competitive Threat**
- **Risk:** Major studio announces similar game with bigger budget
- **Mitigation:** Speed to market (launch first), unique narrative IP, strong community loyalty
- **Contingency:** Differentiate further, focus on niche strengths, potential partnership instead of competition

### Flexibility & Pivots

**Scope Adjustments:**
- If behind schedule: Cut 3rd faction for launch, add post-launch
- If budget tight: Reduce cosmetics count, simplify campaign
- If player feedback demands: Adjust core mechanics even if costly (better to launch a good game late than a bad game on time)

**Opportunity Pivots:**
- If mobile shows stronger traction: Prioritize mobile over PC
- If one faction dominates popularity: Lean into it (marketing, cosmetics focus)
- If educational market emerges: Create school-friendly version, partner with educators

---

## Summary Timeline

| Phase | Duration | Key Deliverables | Budget |
|-------|----------|------------------|--------|
| **Phase 0: Pre-Production** | Months 1-3 | Prototype, team, funding | $150K-$300K |
| **Phase 1: Foundation (MVP)** | Months 4-12 | Core systems, 3 factions, internal alpha | $800K-$1.5M |
| **Phase 2: Beta & Expansion** | Months 13-18 | Closed/open beta, polish, marketing | $800K-$1.2M |
| **Phase 3: Launch** | Months 19-21 | Public launch, stabilization | $400K-$800K |
| **Phase 4: Live Service** | Months 22+ | Seasonal content, growth, profitability | $1M-$2M/year |

**Total to Launch (21 months): $2.15M - $3.8M**

**Post-Launch (Year 1): $1M - $2M**

**Grand Total (First 2.5 Years): $3.15M - $5.8M**

---

## Key Performance Indicators (KPIs)

### Development Phase KPIs
- Milestone completion on time/budget (target: 90%+)
- Team velocity (features per sprint)
- Bug count and severity (track over time, aim for downward trend)

### Launch & Post-Launch KPIs
- **User Acquisition:** 100K registered players (Year 1), 500K (Year 2)
- **Engagement:** 30K MAU (Year 1), 150K (Year 2)
- **Retention:** D30 retention 25%+ (target: 30-35%)
- **Monetization:** Conversion 10%+, LTV:CAC >2:1 (goal: 3:1+)
- **Revenue:** $1.5M-$3M (Year 1), $5M-$10M (Year 2)
- **Profitability:** Break-even Month 9-12, profitable thereafter
- **Community:** Discord 10K+ members (Year 1), active Reddit community, content creators (20+ regular streamers)

---

## Conclusion

This roadmap provides a structured path from concept to sustainable live service game. Flexibility is key—regular retrospectives and data-driven decisions will allow the team to adapt to player needs, market conditions, and unforeseen challenges. The ultimate goal is to create a beloved strategy game that respects its players, tells a compelling story, and builds a thriving community around the rich lore of Abrim and his three sons.
