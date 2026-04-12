/**
 * Shared UI/API result shape. Uploads go through the official PinArkive SDK (`sdk-ts`);
 * this file keeps types and optional CID hints from arbitrary error payloads.
 */

export type NormalizedPinarkiveResult = {
  ok: boolean;
  cid: string | null;
  data: unknown;
  error?: string;
};

function pickCidFromObject(
  obj: Record<string, unknown> | null | undefined
): string | null {
  if (!obj) return null;
  const keys = ["cid", "hash", "IpfsHash"] as const;
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  const nestedData = obj["data"];
  if (nestedData && typeof nestedData === "object" && !Array.isArray(nestedData)) {
    const d = nestedData as Record<string, unknown>;
    if (typeof d.cid === "string" && d.cid.trim().length > 0) return d.cid.trim();
  }
  const nestedResult = obj["result"];
  if (
    nestedResult &&
    typeof nestedResult === "object" &&
    !Array.isArray(nestedResult)
  ) {
    const r = nestedResult as Record<string, unknown>;
    if (typeof r.cid === "string" && r.cid.trim().length > 0) return r.cid.trim();
  }
  return null;
}

/** Best-effort CID when error bodies still carry structured fields. */
export function tryExtractCid(data: unknown): string | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  return pickCidFromObject(data as Record<string, unknown>);
}
