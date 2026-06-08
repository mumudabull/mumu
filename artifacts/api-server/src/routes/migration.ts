import { Router, type IRouter } from "express";
import { GetMigrationStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const RPC_URL =
  process.env.SOLANA_RPC_URL ?? "https://api.mainnet-beta.solana.com";
const TOKEN_MINT =
  process.env.MIGRATION_TOKEN_MINT ??
  "4x2TvLjYobssGdspdUnRcjYD4QwTvC9wFbtriuTW3gp9";
const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const PROGRESS_URL =
  process.env.MIGRATE_FUN_PROGRESS_URL ??
  "https://emblemvault.dev/api/migrate-fun/progress/181?network=mainnet";

// MUMU's official old-token circulating supply. The migrated-supply figure is
// reported proportional to this (progress% × this), not the new token's 1B cap.
const OLD_CIRCULATING_SUPPLY = 2_329_634_050_965.286;

const CACHE_TTL_MS = 60_000;
let cache: { data: unknown; at: number } | null = null;

async function rpc(method: string, params: unknown[]): Promise<any> {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC ${method} HTTP ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: { message?: string } };
  if (json.error) throw new Error(`RPC ${method}: ${json.error.message ?? "error"}`);
  return json.result;
}

async function fetchProgress(): Promise<Record<string, unknown>> {
  const res = await fetch(PROGRESS_URL);
  if (!res.ok) throw new Error(`progress HTTP ${res.status}`);
  return (await res.json()) as Record<string, unknown>;
}

async function fetchStats() {
  // All three are required: if any upstream source fails, this rejects so the
  // route handler serves the last good cached value instead of misleading zeros.
  const [supply, accounts, progress] = await Promise.all([
    rpc("getTokenSupply", [TOKEN_MINT]),
    rpc("getProgramAccounts", [
      TOKEN_PROGRAM,
      {
        encoding: "base64",
        // SPL token account layout: owner at offset 32 (32 bytes),
        // amount at offset 64 (8 bytes). Slice both to dedupe by owner.
        dataSlice: { offset: 32, length: 40 },
        filters: [
          { dataSize: 165 },
          { memcmp: { offset: 0, bytes: TOKEN_MINT } },
        ],
      },
    ]),
    fetchProgress(),
  ]);

  // On-chain supply of the new migrated token (always reflects new supply).
  if (!supply?.value) throw new Error("getTokenSupply returned no value");
  const newTokenSupply: number = supply.value.uiAmount ?? 0;

  // Count unique wallet owners holding a non-zero balance (= users upgraded),
  // not raw token accounts (one owner can hold several).
  if (!Array.isArray(accounts)) throw new Error("getProgramAccounts malformed");
  const owners = new Set<string>();
  for (const acc of accounts) {
    const b64 = acc?.account?.data?.[0];
    if (typeof b64 !== "string") continue;
    const buf = Buffer.from(b64, "base64");
    if (buf.length < 40) continue;
    if (buf.readBigUInt64LE(32) > 0n) {
      owners.add(buf.subarray(0, 32).toString("base64"));
    }
  }
  const holders = owners.size;

  const migrated = Number(progress.totalMigratedFormatted ?? 0);
  const oldSupply = Number(progress.totalOldTokenSupplyFormatted ?? 0);
  const migrationProgress =
    oldSupply > 0 ? (migrated / oldSupply) * 100 : 0;

  // Total migrated supply = old-token migrated (progress% of MUMU's official
  // old-token circulating supply, not the 1B cap) + the new token's on-chain
  // supply.
  const oldTokenMigrated = (migrationProgress / 100) * OLD_CIRCULATING_SUPPLY;
  const totalSupply = oldTokenMigrated + newTokenSupply;
  const totalSupplyFormatted = totalSupply.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  const currentPhase =
    typeof progress.currentPhase === "string"
      ? progress.currentPhase
      : "Migration Active";
  const startDate =
    typeof progress.startDate === "string" ? progress.startDate : "";
  const endDate = typeof progress.endDate === "string" ? progress.endDate : "";

  return GetMigrationStatsResponse.parse({
    holders,
    totalSupply,
    totalSupplyFormatted,
    migrationProgress: Math.round(migrationProgress * 100) / 100,
    currentPhase,
    startDate,
    endDate,
    updatedAt: new Date().toISOString(),
  });
}

router.get("/migration/stats", async (_req, res) => {
  try {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      res.json(cache.data);
      return;
    }
    const data = await fetchStats();
    cache = { data, at: Date.now() };
    res.json(data);
  } catch {
    if (cache) {
      res.json(cache.data);
      return;
    }
    res.status(502).json({ message: "Failed to fetch migration stats" });
  }
});

export default router;
