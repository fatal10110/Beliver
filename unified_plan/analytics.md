# Analytics & Data Strategy

## 1. Key Performance Indicators (KPIs)

### User Metrics
*   **Acquisition**: New Registrations, CAC (Customer Acquisition Cost).
*   **Retention**: D1, D7, D30 Retention.
*   **Engagement**: DAU/MAU, Average Session Length, Turns per Day.
*   **Monetization**: ARPU (Average Revenue Per User), Conversion Rate (Free to Paid).

### Game Balance Metrics
*   **Win Rates**: By Faction (aiming for 33% split), Map Type, and Turn Order.
*   **Unit Usage**: Pick rates for units; identifies Overpowered/Underpowered units.
*   **Match Duration**: Average turns to victory; surrender rates.
*   **Economy Health**: Average resource stockpiles per turn (inflation monitoring).

## 2. Telemetry Implementation
*   **Event Tracking**:
    *   `game_start`: Faction choice, Map Seed.
    *   `turn_end`: Resources accumulated, Actions taken.
    *   `combat_result`: Winner, Casualties, Spell usage.
    *   `purchase`: Item ID, Price, Currency.
    *   `error`: Crash reports, Sync failures.

## 3. Tech Stack
*   **Pipeline**: Segment (Data Collection) -> AWS Kinesis / Kafka.
*   **Storage**: Datawarehouse (Snowflake or Redshift) for long-term analysis.
*   **Visualization**: Grafana or Tableau dashboards for Game Designers.
