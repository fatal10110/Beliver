# Technical Architecture

## System Overview

Sons of Abrim is a turn-based multiplayer strategy game requiring:
- Persistent game state across sessions
- Asynchronous turn-based multiplayer
- Real-time notifications and updates
- Scalable infrastructure for 10K-100K+ concurrent games
- Cross-platform support (PC, mobile, web)

## Architecture Principles

1. **Scalability First:** Design for 100K+ concurrent players from day one
2. **Turn-Based Advantage:** Batch processing, reduced real-time requirements
3. **Data Integrity:** Game state must be authoritative server-side
4. **Graceful Degradation:** System continues operating during partial failures
5. **Observable:** Comprehensive logging, metrics, and monitoring
6. **Cost-Efficient:** Optimize for cloud costs (turn-based allows resource pooling)

## High-Level Architecture

```
┌─────────────────┐
│   Client Layer  │  (Unity/Web/Mobile)
└────────┬────────┘
         │ HTTPS/WSS
┌────────▼────────────────────────────┐
│      API Gateway / Load Balancer    │
└────────┬────────────────────────────┘
         │
    ┌────┴─────┬──────────┬──────────┐
    │          │          │          │
┌───▼───┐  ┌──▼───┐  ┌───▼───┐  ┌──▼────┐
│ Auth  │  │ Game │  │ Social│  │ Match │
│Service│  │Logic │  │Service│  │ maker │
└───┬───┘  └──┬───┘  └───┬───┘  └──┬────┘
    │         │          │         │
    └─────────┴──────────┴─────────┘
              │
    ┌─────────▼──────────┐
    │  Message Queue     │
    │  (RabbitMQ/Kafka)  │
    └─────────┬──────────┘
              │
    ┌─────────▼──────────┐
    │   Database Layer   │
    │  - PostgreSQL      │
    │  - Redis Cache     │
    │  - S3 Storage      │
    └────────────────────┘
```

## Technology Stack

### Backend

**Primary Language:** Go (Golang) or Node.js (TypeScript)

**Why Go:**
- Excellent concurrency (critical for handling many games)
- Fast, compiled language (low server costs)
- Strong standard library for network services
- Mature game server frameworks

**Why Node.js/TypeScript:**
- Faster development velocity
- Easier to hire developers
- Rich ecosystem (npm packages)
- Good real-time support (Socket.io)

**Recommendation:** Go for core game logic and matchmaking, Node.js for APIs and tooling

### Database Systems

**Primary Database: PostgreSQL**
- Relational structure for game state (players, territories, resources)
- ACID compliance for critical transactions
- JSON/JSONB support for flexible game data
- Mature replication and backup tools

**Caching Layer: Redis**
- Active game state (in-progress turns)
- Session management
- Leaderboards and rankings
- Pub/sub for real-time notifications

**Object Storage: AWS S3 or equivalent**
- Game replays and history
- User-generated content (avatars, emblems)
- Asset delivery (CDN-backed)

**Search: Elasticsearch (optional)**
- Player search
- Guild/alliance search
- Replay search and filtering

### Frontend

**Game Client: Unity**
- Cross-platform (PC, mobile, web via WebGL)
- Rich tooling and asset pipeline
- Strong C# ecosystem
- Visual scripting for designers

**Alternative: Godot Engine**
- Open-source, no licensing fees
- Growing community
- Good 2D support (if art style is 2D)

**Web Dashboard: React + TypeScript**
- Account management
- Leaderboards and statistics
- Store and purchases
- Community forums integration

### Infrastructure

**Cloud Provider: AWS (or GCP)**
- **Compute:** ECS (Containerized services) or Lambda (serverless)
- **Database:** RDS (PostgreSQL) with read replicas
- **Cache:** ElastiCache (Redis)
- **CDN:** CloudFront
- **Storage:** S3
- **Monitoring:** CloudWatch + DataDog

**Container Orchestration: Kubernetes (if not using ECS)**
- Better for multi-cloud or hybrid deployments
- More complex but more flexible

**CI/CD:**
- GitHub Actions or GitLab CI for automated testing
- Docker for consistent environments
- Terraform for infrastructure as code

## Core Systems Design

### 1. Authentication & Authorization

**Service: Auth Service**

**Technologies:**
- OAuth 2.0 / OpenID Connect
- JWT (JSON Web Tokens) for session management
- bcrypt for password hashing
- 2FA support (TOTP)

**Flow:**
```
1. User logs in via email/password or social OAuth (Google, Steam)
2. Auth service validates credentials
3. Issues JWT with claims (user_id, roles, permissions)
4. Client includes JWT in all subsequent requests
5. API Gateway validates JWT before forwarding to services
```

**Security:**
- Rate limiting on login attempts
- IP-based anomaly detection
- Refresh token rotation
- Secure password reset flow

### 2. Game State Management

**Service: Game Logic Service**

**Data Model (PostgreSQL):**

```sql
-- Core tables
games (game_id, created_at, status, current_turn, settings)
game_players (game_id, player_id, faction, eliminated, joined_at)
game_state (game_id, turn_number, state_json, created_at)
territories (territory_id, game_id, owner_player_id, population, resources)
buildings (building_id, territory_id, type, tier, construction_turn)
units (unit_id, game_id, owner_player_id, type, location, stats)

-- Player actions
player_actions (action_id, game_id, player_id, turn_number, action_type, action_data, timestamp)

-- Historical tracking
turn_history (game_id, turn_number, events_json, processed_at)
```

**Turn Processing Pipeline:**

```
1. Turn Start: Lock game state, notify all players
2. Action Collection Phase (24-48 hours):
   - Players submit actions (build, move, cast spell, trade)
   - Actions stored in player_actions table
   - Real-time validation (e.g., "Do you have enough resources?")
3. Turn Resolution Phase:
   - All players confirm "ready" or timer expires
   - Game Logic Service fetches all actions for turn
   - Resolve actions in deterministic order:
     a. Resource generation
     b. Building construction
     c. Population growth
     d. Military movement
     e. Combat resolution
     f. Spell effects
     g. Diplomatic actions
   - Calculate new game state
   - Persist to game_state table
   - Generate turn report for each player
4. Turn End: Unlock game state, increment turn, notify players
```

**Concurrency Handling:**
- Optimistic locking for turn submission
- Deterministic action ordering (timestamp + player_id)
- Rollback mechanisms for failed turn processing

**Caching Strategy (Redis):**
- Active game state cached for current turn
- Invalidate cache on turn resolution
- Cache player action lists for quick UI updates

### 3. Matchmaking System

**Service: Matchmaker Service**

**Modes:**
- **Ranked:** ELO-based matching, 3-6 players
- **Casual:** Quick match, any skill level
- **Custom:** Player-created lobbies, invite friends
- **Campaign:** Single-player or co-op vs. AI

**Algorithm (for Ranked):**
```
1. Player enters queue with their ELO rating
2. Matchmaker checks for players within ±100 ELO range
3. If 3-6 suitable players found, create game
4. If waiting > 3 minutes, expand range to ±200 ELO
5. Ensure faction balance (no more than 2 of same faction per game)
6. Create game instance, assign players, notify
```

**Scaling:**
- Matchmaker runs as separate service
- Uses Redis for queue management
- Periodic sweep (every 10-30 seconds) to form matches

### 4. Real-Time Notifications

**Service: Notification Service**

**Technologies:**
- WebSockets (Socket.io or native WS)
- Push notifications (Firebase Cloud Messaging for mobile)
- Email notifications (SendGrid or AWS SES)

**Event Types:**
- Turn completed (game ready for your actions)
- Player actions visible (opponent built a temple near you)
- Diplomatic offers (trade proposal, alliance request)
- Combat results (your territory was attacked)
- System announcements (maintenance, new content)

**Implementation:**
```
1. Game Logic Service publishes events to Message Queue (Kafka/RabbitMQ)
2. Notification Service subscribes to relevant topics
3. For each event:
   - Check user preferences (email, push, in-game)
   - Send via appropriate channel
   - Track delivery status
4. WebSocket connections maintained for active clients
5. Offline notifications queued in database for next login
```

### 5. Chat & Social Systems

**Service: Social Service**

**Features:**
- Global chat (moderated)
- Alliance/guild chat
- Direct messages
- Player profiles and stats
- Friend lists
- Blocking and reporting

**Data Model:**
```sql
friendships (user_id, friend_id, status, created_at)
messages (message_id, sender_id, receiver_id, content, timestamp, read)
guilds (guild_id, name, description, created_at)
guild_members (guild_id, user_id, role, joined_at)
```

**Moderation:**
- Profanity filter (automated)
- Player reporting system
- Admin dashboard for reviewing reports
- Auto-mute for excessive reports

### 6. Economy & Monetization Backend

**Service: Store Service**

**Integration:**
- Stripe for credit card payments
- PayPal for alternative payments
- Steam Wallet (if on Steam)
- Apple/Google In-App Purchases (mobile)

**Data Model:**
```sql
products (product_id, name, type, price_usd, currency)
purchases (purchase_id, user_id, product_id, amount, status, timestamp)
inventory (user_id, item_id, quantity, acquired_at)
transactions (transaction_id, user_id, type, amount, timestamp)
```

**Purchase Flow:**
```
1. Client requests product list from Store Service
2. User selects item, initiates purchase
3. Store Service creates transaction record (status: pending)
4. Redirect to payment provider (Stripe, PayPal, etc.)
5. Payment provider webhooks back to Store Service on completion
6. Store Service validates webhook, updates transaction (status: completed)
7. Grant item to user's inventory
8. Notify client to refresh inventory
```

**Battle Pass System:**
- Separate table: battle_pass_progress (user_id, season_id, tier, xp)
- XP earned from gameplay (turns completed, objectives met)
- Tier unlocks triggered by XP thresholds
- Rewards granted automatically on tier up

### 7. Analytics & Telemetry

**Service: Analytics Service**

**Data Collection:**
- Player actions (clicks, time spent, features used)
- Game metrics (turns played, resources generated, battles fought)
- Economy metrics (purchases, ARPU, conversion rates)
- Performance metrics (load times, crash reports)

**Technologies:**
- Segment or Amplitude for user analytics
- Mixpanel for funnel analysis
- Custom dashboards (Grafana + PostgreSQL)

**Key Metrics to Track:**
```
User Acquisition:
- New registrations per day
- CAC by channel
- Registration to first game rate

Engagement:
- DAU/MAU ratio
- Average turns per user per week
- Session length
- Feature adoption rates

Retention:
- D1, D7, D30 retention curves
- Churn rate and reasons
- Cohort analysis

Monetization:
- Conversion rate (free to paid)
- ARPU, ARPPU
- LTV by cohort
- Purchase frequency

Game Balance:
- Faction win rates
- Most-used spells/strategies
- Average game length
- Quit rates by turn number
```

## Scalability & Performance

### Load Estimation

**Assumptions:**
- 100K registered players
- 30K monthly active users
- 10K daily active users
- Average 3-5 active games per player
- 30-50K active games at any time

**Request Volume:**
- Turn submissions: ~100-200 per minute (spread over 24-48 hours)
- Turn resolutions: ~1-2 games per second (batched)
- Real-time queries (leaderboards, player search): ~500-1000 per minute
- WebSocket connections: ~3K-5K concurrent

### Horizontal Scaling Strategy

**Stateless Services:**
- API Gateway, Auth Service, Social Service: Scale horizontally behind load balancer
- Auto-scaling based on CPU/memory metrics

**Stateful Services:**
- Game Logic Service: Shard games across multiple instances (game_id % num_instances)
- Redis: Cluster mode with replication
- PostgreSQL: Read replicas for queries, single write master

**Message Queue:**
- Kafka or RabbitMQ: Partition topics by game_id for parallel processing

### Database Optimization

**Indexing:**
- Index on game_id, player_id, turn_number for fast lookups
- Composite index on (game_id, turn_number) for turn history queries

**Partitioning:**
- Partition game_state and turn_history by turn_number or date (archive old games)
- Separate hot (active games) and cold (completed games) data

**Caching:**
- Cache active game state in Redis (TTL: until turn resolution)
- Cache player profiles and leaderboards (TTL: 5-10 minutes)

**Query Optimization:**
- Use prepared statements
- Avoid N+1 queries (use JOINs or batch fetching)
- Paginate large result sets

### CDN & Asset Delivery

- Host static assets (images, audio, client builds) on CDN (CloudFront, Cloudflare)
- Versioned asset URLs for cache busting
- Compress assets (gzip, brotli)

### Monitoring & Alerting

**Monitoring Stack:**
- **Metrics:** Prometheus + Grafana or DataDog
- **Logs:** ELK Stack (Elasticsearch, Logstash, Kibana) or CloudWatch Logs
- **Tracing:** Jaeger or AWS X-Ray for distributed tracing
- **Error Tracking:** Sentry for crash reports

**Alerts:**
- High error rate (> 1% of requests)
- Slow response times (p99 > 2 seconds)
- Database connection pool exhaustion
- High memory/CPU usage (> 80%)
- Turn processing delays (> 10 minutes backlog)

## Security

### Threat Model

**Common Threats:**
1. **Cheating:** Fake actions, resource manipulation, wallhacking
2. **Account Takeover:** Credential stuffing, phishing
3. **DDoS:** Overwhelming servers with requests
4. **Data Breach:** Unauthorized access to player data
5. **Payment Fraud:** Stolen credit cards, chargebacks

### Mitigation Strategies

**Anti-Cheat:**
- Server-authoritative game state (never trust client)
- Validate all player actions server-side (resources, legality of moves)
- Rate limiting on action submissions
- Statistical anomaly detection (impossible resource gains, inhuman APM)
- Replay analysis for suspicious behavior

**Authentication Security:**
- Enforce strong passwords (min 10 chars, complexity)
- 2FA optional but encouraged
- IP-based login anomaly detection
- Session expiration (JWT refresh every 1 hour)

**DDoS Protection:**
- CloudFlare or AWS Shield for network-layer protection
- Rate limiting at API Gateway (per IP, per user)
- CAPTCHA for registration and sensitive actions
- Auto-scaling to absorb traffic spikes

**Data Protection:**
- Encrypt sensitive data at rest (AES-256)
- Encrypt data in transit (TLS 1.3)
- GDPR compliance (data export, right to deletion)
- Regular security audits and penetration testing

**Payment Security:**
- PCI-DSS compliance (use Stripe/PayPal, never store card data)
- Webhook signature verification
- Fraud detection (velocity checks, geographic mismatches)

## DevOps & Deployment

### CI/CD Pipeline

```
1. Developer pushes code to GitHub
2. GitHub Actions triggers:
   a. Lint and code quality checks (ESLint, Prettier)
   b. Unit tests (Jest, Go testing)
   c. Build Docker images
   d. Integration tests (test environment)
3. On success:
   a. Push Docker images to registry (ECR, Docker Hub)
   b. Deploy to staging environment (automatic)
   c. Run smoke tests
4. Manual approval for production deployment
5. Deploy to production (blue-green or rolling update)
6. Monitor for errors, auto-rollback if error rate spikes
```

### Environment Strategy

- **Development:** Local Docker Compose setup for developers
- **Staging:** Mimics production, used for QA and pre-release testing
- **Production:** Live environment, high availability

### Backup & Disaster Recovery

**Database Backups:**
- Automated daily backups to S3 (retained for 30 days)
- Point-in-time recovery (transaction logs)
- Test restore process monthly

**Disaster Recovery Plan:**
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour (max data loss)
- Multi-AZ deployment for high availability
- Runbook for common failure scenarios

## Development Priorities

### Phase 1: MVP (Months 1-6)

1. **Core Backend Services:**
   - Auth service with JWT
   - Basic game logic service (single-player vs. AI)
   - PostgreSQL schema for game state
   - REST API for client communication

2. **Client:**
   - Unity client with basic UI
   - Single-player mode (vs. AI)
   - Core gameplay loop (build, produce resources, simple combat)

3. **Infrastructure:**
   - Docker setup for local development
   - Deploy to AWS (single instance, minimal HA)

### Phase 2: Multiplayer (Months 7-12)

1. **Multiplayer Systems:**
   - Turn-based multiplayer logic
   - Matchmaking service
   - Real-time notifications (WebSockets)
   - Chat system

2. **Scalability:**
   - Redis caching
   - Load balancer and auto-scaling
   - Database optimization

3. **Client:**
   - Multiplayer UI
   - Player profiles and leaderboards

### Phase 3: Monetization & Polish (Months 13-18)

1. **Store & Payments:**
   - Store service with Stripe integration
   - Cosmetic items and battle pass
   - Purchase UI in client

2. **Advanced Features:**
   - Guild/alliance system
   - Replays and spectator mode
   - Advanced analytics

3. **Operations:**
   - Monitoring and alerting (DataDog, Sentry)
   - CI/CD pipeline refinement
   - Security hardening

### Phase 4: Launch & Beyond (Months 18+)

1. **Pre-Launch:**
   - Beta testing with community
   - Performance optimization
   - Marketing and user acquisition

2. **Post-Launch:**
   - Live operations and support
   - Content updates (new factions, maps, events)
   - Mobile client development
   - Ongoing balance and bug fixes
