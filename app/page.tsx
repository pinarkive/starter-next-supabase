import { UploadForm } from "@/components/upload-form";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
          PinArkive
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Next.js upload starter
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Select a file, upload it to PinArkive via a server-side proxy, and view
          the returned content identifier (CID). Your API key never reaches the
          browser.
        </p>
      </div>
      <UploadForm />
    </main>
  );
}
