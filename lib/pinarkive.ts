/**
 * PinArkive integration via the official TypeScript SDK (installed as `sdk-ts`).
 * All uploads use `PinarkiveClient.uploadFile` (API v3: POST /files).
 */

import { PinarkiveAPIError, PinarkiveClient } from "sdk-ts";
import type { NormalizedPinarkiveResult } from "./normalize-pinarkive-response";
import { tryExtractCid } from "./normalize-pinarkive-response";

const MAX_BYTES = 50 * 1024 * 1024;

export type PinarkiveUploadEnv = {
  apiKey: string;
  /** Value of PINARKIVE_API_BASE_URL (optional); normalized to include `/api/v3` when needed */
  baseUrlFromEnv?: string;
  /** Optional cluster id, sent as `cl` (see SDK `UploadOptions.clusterId`) */
  clusterId?: string;
};

/** JSON body shape is unchanged; `httpStatus` is for the HTTP response only (not serialized here). */
export type PinarkiveUploadHttpResult = {
  result: NormalizedPinarkiveResult;
  httpStatus: number;
};

function httpStatusForSdkError(e: PinarkiveAPIError): number {
  const s = e.statusCode;
  if (typeof s === "number" && s >= 400 && s < 600) return s;
  return 400;
}

/**
 * Ensures the SDK receives a full API v3 root (e.g. https://api.pinarkive.com/api/v3).
 */
export function resolvePinarkiveApiV3BaseUrl(raw?: string): string {
  const fallbackHost = "https://api.pinarkive.com";
  const trimmed = (raw?.trim() || fallbackHost).replace(/\/+$/, "");
  if (/\/api\/v\d+$/i.test(trimmed)) return trimmed;
  return `${trimmed}/api/v3`;
}

export async function uploadFileWithPinarkiveSdk(
  file: File,
  env: PinarkiveUploadEnv
): Promise<PinarkiveUploadHttpResult> {
  if (file.size === 0) {
    return {
      result: { ok: false, cid: null, data: null, error: "File is empty." },
      httpStatus: 400,
    };
  }
  if (file.size > MAX_BYTES) {
    return {
      result: {
        ok: false,
        cid: null,
        data: null,
        error: `File too large (max ${MAX_BYTES / (1024 * 1024)} MB).`,
      },
      httpStatus: 413,
    };
  }

  const baseUrl = resolvePinarkiveApiV3BaseUrl(env.baseUrlFromEnv);
  const client = new PinarkiveClient({ apiKey: env.apiKey }, baseUrl);
  const uploadOpts =
    env.clusterId?.trim() ? { clusterId: env.clusterId.trim() } : undefined;

  try {
    const res = await client.uploadFile(file, uploadOpts);
    return {
      result: {
        ok: true,
        cid: res.cid?.trim() ? res.cid.trim() : null,
        data: res,
      },
      httpStatus: 200,
    };
  } catch (e) {
    if (e instanceof PinarkiveAPIError) {
      return {
        result: {
          ok: false,
          cid: tryExtractCid(e.body),
          data: e.body ?? null,
          error: e.message,
        },
        httpStatus: httpStatusForSdkError(e),
      };
    }
    const message = e instanceof Error ? e.message : "Upload failed";
    return {
      result: { ok: false, cid: null, data: null, error: message },
      httpStatus: 400,
    };
  }
}
