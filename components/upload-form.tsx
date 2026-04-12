"use client";

import type { NormalizedPinarkiveResult } from "@/lib/normalize-pinarkive-response";
import { useState } from "react";
import { ResultCard } from "./result-card";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NormalizedPinarkiveResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    if (!file) {
      setResult({
        ok: false,
        cid: null,
        data: null,
        error: "Choose a file first.",
      });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const body = (await res.json()) as NormalizedPinarkiveResult;
      setResult(body);
    } catch {
      setResult({
        ok: false,
        cid: null,
        data: null,
        error: "Could not reach the server.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-[var(--text)]"
          >
            File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full cursor-pointer text-sm text-[var(--muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--border)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--text)] hover:file:bg-[#343a48]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Upload to PinArkive"}
        </button>
      </form>
      <ResultCard result={result} />
    </div>
  );
}
