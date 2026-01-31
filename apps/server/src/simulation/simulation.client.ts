export type RunMatchRequest = {
  policyHashes: string[];
  seed: number;
};

const SIMULATION_URL = process.env.SIMULATION_URL ?? 'http://localhost:8081';

export async function runMatch(_req: RunMatchRequest): Promise<void> {
  // TODO: wire this to the Simulation Service (apps/simulation) over HTTP or gRPC.
  throw new Error(`Simulation client not implemented. Expected service at ${SIMULATION_URL}.`);
}
