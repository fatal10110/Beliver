# Analytics & Data Strategy

## 1. Key Performance Indicators (KPIs)

### User Metrics
*   **Acquisition**: New registrations, CAC (customer acquisition cost).
*   **Retention**: D1, D7, D30 retention.
*   **Engagement**: DAU/MAU, average session length, turns per day.
*   **Monetization**: ARPU, conversion rate (free to paid).

### Doctrine & Policy Metrics
*   **Compile Success Rate**: % of Scripture that compiles into valid policy.
*   **Complexity Budget Usage**: Average budget utilization and rejection rate.
*   **Iteration Velocity**: Scripture edits per match / per week.
*   **Policy Diversity**: Unique policy hashes per season.

### Game Balance Metrics
*   **Win Rates**: By faction, policy archetype, map type, and turn order.
*   **Unit Usage**: Pick rates for units; identifies overpowered/underpowered units.
*   **Match Duration**: Average turns to victory; surrender rates.
*   **Economy Health**: Average resource stockpiles per turn.

### Social / Oracle Feed Metrics
*   **Feed Engagement**: Posts per day, upvote rate, comment rate.
*   **Doctrine Spread**: Remixes per policy hash, covenant formation rate.

## 2. Telemetry Implementation
*   **Event Tracking**:
    *   `scripture_edit`: length, template used.
    *   `scripture_compile_request`: user, faction.
    *   `policy_generated`: `policy_hash`, `policy_schema_version`, `compiler_model+version`, budget_used.
    *   `policy_validation_failed`: error code, rule violated.
    *   `match_start`: policy hashes, `engine_version`, seed, map.
    *   `turn_end`: resources, actions taken.
    *   `match_end`: victory type, turn_count, VP breakdown.
    *   `oracle_feed_post`: policy_hash, sentiment tags.
    *   `oracle_feed_upvote`: post_id.
    *   `external_agent_submit`: agent_id, validation outcome.
    *   `error`: crash reports, desync failures.

## 3. Tech Stack
*   **Pipeline**: Segment -> AWS Kinesis / Kafka.
*   **Storage**: Data warehouse (Snowflake or Redshift).
*   **Visualization**: Grafana or Tableau dashboards for designers.
