"use client";

import type { NormalizedPinarkiveResult } from "@/lib/normalize-pinarkive-response";
import { useState } from "react";

type Props = {
  result: NormalizedPinarkiveResult | null;
};

export function ResultCard({ result }: Props) {
  const [rawOpen, setRawOpen] = useState(false);

  if (!result) return null;

  if (!result.ok) {
    return (
      <div
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        role="alert"
      >
        <p className="text-sm font-medium text-[var(--error)]">Upload failed</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-sm font-medium text-[var(--success)]">Success</p>
      {result.cid ? (
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
            CID
          </p>
          <p className="mt-1 break-all font-mono text-sm text-[var(--text)]">
            {result.cid}
          </p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-[var(--muted)]">
          No <code className="text-[var(--text)]">cid</code> field detected in
          the response. Expand raw JSON below if the API returned something else.
        </p>
      )}
      <button
        type="button"
        onClick={() => setRawOpen((o) => !o)}
        className="mt-4 text-xs font-medium text-[var(--accent)] hover:underline"
      >
        {rawOpen ? "Hide" : "Show"} raw response
      </button>
      {rawOpen && (
        <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-[var(--bg)] p-3 text-xs text-[var(--muted)]">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )}
    </div>
  );
}
