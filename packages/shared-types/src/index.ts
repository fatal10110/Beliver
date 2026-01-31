export enum ResourceType {
  Faith = 'faith',
  Food = 'food',
  Wood = 'wood',
  Devotion = 'devotion',
}

export enum UnitType {
  Acolyte = 'acolyte',
  Guardian = 'guardian',
  Ranger = 'ranger',
}

export enum ActionType {
  Build = 'build',
  Train = 'train',
  Move = 'move',
  Pray = 'pray',
  Harvest = 'harvest',
  Wait = 'wait',
}

export interface VersionedPolicyContract {
  policy_schema_version: string;
  engine_version: string;
}

export interface DoctrineRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  weight?: number;
  priority?: number;
}

export interface DoctrinePolicy extends VersionedPolicyContract {
  policy_id: string;
  weights?: Record<string, number>;
  rules: DoctrineRule[];
  complexity_usage: number;
  seeded_personality?: number;
}

export interface PolicyComplexity {
  score: number;
  budget: number;
  warnings?: string[];
}

export interface RuleFired {
  rule_id: string;
  rule_name: string;
  turn: number;
  weight?: number;
  summary?: string;
}

export interface CompileResult extends VersionedPolicyContract {
  policy: DoctrinePolicy;
  policy_hash: string;
  complexity: PolicyComplexity;
  warnings?: string[];
  errors?: string[];
}

export type ResourceStockpile = Record<ResourceType, number>;

export interface Unit {
  id: string;
  type: UnitType;
  owner_id: string;
  x: number;
  y: number;
  hp: number;
}

export interface GameState {
  turn: number;
  max_turns: number;
  seed: number;
  resources: ResourceStockpile;
  units: Unit[];
  victory_points: Record<string, number>;
}

export interface Action {
  type: ActionType;
  actor_id?: string;
  target?: { x: number; y: number };
  payload?: Record<string, unknown>;
}
