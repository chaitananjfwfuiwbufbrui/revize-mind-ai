import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { PikaHeader } from "@/components/PikaHeader";
import { FileText, Youtube, NotebookPen, Sparkles, Upload } from "lucide-react";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
});

type Tab = "pdf" | "youtube" | "notes";

function UploadPage() {
  const [tab, setTab] = useState<Tab>("pdf");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [filename, setFilename] = useState("");

  const ready =
    (tab === "pdf" && filename) ||
    (tab === "youtube" && url.length > 5) ||
    (tab === "notes" && text.length > 10);

  return (
    <MobileShell>
      <PikaHeader title="Upload" subtitle="Turn anything into flashcards" />

      <main className="px-5 -mt-6 space-y-6">
        {/* Tab switcher */}
        <div className="bg-card p-1.5 rounded-2xl border border-border grid grid-cols-3 gap-1">
          <TabBtn active={tab === "pdf"} onClick={() => setTab("pdf")} icon={<FileText className="size-4" />} label="PDF" />
          <TabBtn active={tab === "youtube"} onClick={() => setTab("youtube")} icon={<Youtube className="size-4" />} label="YouTube" />
          <TabBtn active={tab === "notes"} onClick={() => setTab("notes")} icon={<NotebookPen className="size-4" />} label="Notes" />
        </div>

        {/* Input area */}
        <div className="bg-card rounded-3xl p-5 border border-border shadow-soft min-h-[260px]">
          {tab === "pdf" && (
            <label className="cursor-pointer flex flex-col items-center justify-center gap-3 h-full text-center py-8 border-2 border-dashed border-border rounded-2xl hover:border-primary transition-colors">
              <div className="size-14 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                <Upload className="size-6" />
              </div>
              <div>
                <p className="font-display font-semibold">
                  {filename || "Tap to upload a PDF"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Up to 50 MB</p>
              </div>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFilename(e.target.files?.[0]?.name ?? "")}
              />
            </label>
          )}

          {tab === "youtube" && (
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                YouTube URL
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-2xl bg-muted border border-border focus:outline-none focus:border-primary text-sm"
              />
              <p className="text-xs text-muted-foreground">
                We'll pull the transcript and extract key concepts.
              </p>
            </div>
          )}

          {tab === "notes" && (
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Paste your notes
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste lecture notes, study material, or anything you want to remember…"
                rows={8}
                className="w-full px-4 py-3 rounded-2xl bg-muted border border-border focus:outline-none focus:border-primary text-sm resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">{text.length} chars</p>
            </div>
          )}
        </div>

        <Link
          to="/"
          disabled={!ready}
          className={`w-full py-4 rounded-2xl font-display font-semibold flex items-center justify-center gap-2 transition-all ${
            ready
              ? "bg-primary text-primary-foreground shadow-pop hover:scale-[0.98]"
              : "bg-muted text-muted-foreground pointer-events-none"
          }`}
          aria-disabled={!ready}
        >
          <Sparkles className="size-5" /> Generate Flashcards
        </Link>

        <p className="text-center text-xs text-muted-foreground">
          AI generation is mocked in this UI shell.
        </p>
      </main>
    </MobileShell>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
      }`}
    >
      {icon} {label}
    </button>
  );
}
