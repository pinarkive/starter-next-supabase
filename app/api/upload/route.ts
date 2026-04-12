import { NextRequest, NextResponse } from "next/server";
import { uploadFileWithPinarkiveSdk } from "@/lib/pinarkive";
import type { NormalizedPinarkiveResult } from "@/lib/normalize-pinarkive-response";

function json(body: NormalizedPinarkiveResult, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.PINARKIVE_API_KEY?.trim();
  const clusterId = process.env.PINARKIVE_CLUSTER_ID?.trim();

  if (!apiKey) {
    return json(
      {
        ok: false,
        cid: null,
        data: null,
        error:
          "Missing PINARKIVE_API_KEY. See README and the environment example file in this repository.",
      },
      500
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return json(
      { ok: false, cid: null, data: null, error: "Invalid multipart body." },
      400
    );
  }

  const entry = formData.get("file");
  if (!entry || typeof entry === "string") {
    return json(
      { ok: false, cid: null, data: null, error: "No file provided." },
      400
    );
  }

  const file = entry as File;
  const { result, httpStatus } = await uploadFileWithPinarkiveSdk(file, {
    apiKey,
    baseUrlFromEnv: process.env.PINARKIVE_API_BASE_URL,
    clusterId,
  });

  return json(result, httpStatus);
}
