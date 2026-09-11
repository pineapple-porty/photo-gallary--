import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpen,
  Scale,
  Copy,
  Check,
  Download,
  ExternalLink,
  GitBranch,
  FileCode2,
  Eye
} from "lucide-react";

// Raw imports of README.md and LICENSE
// @ts-ignore
import readmeRaw from "../README.md?raw";
// @ts-ignore
import licenseRaw from "../LICENSE?raw";

export default function App() {
  const [activeTab, setActiveTab] = useState<"readme" | "license">("readme");
  const [viewMode, setViewMode] = useState<"rendered" | "raw">("rendered");
  const [copied, setCopied] = useState(false);

  const activeContent = activeTab === "readme" ? readmeRaw : licenseRaw;
  const fileName = activeTab === "readme" ? "README.md" : "LICENSE";

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          {/* Repo Info */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-base">photo-gallery-</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-800 text-stone-300 border border-stone-700/60">
                  main
                </span>
              </div>
              <a
                href="https://github.com/pineapple-porty/photo-gallery-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                <GitBranch className="w-3 h-3 text-stone-500" />
                <span>github.com/pineapple-porty/photo-gallery-</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-stone-800">
            <button
              id="tab-readme"
              onClick={() => setActiveTab("readme")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "readme"
                  ? "bg-orange-500 text-stone-950 shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>README.md</span>
            </button>
            <button
              id="tab-license"
              onClick={() => setActiveTab("license")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "license"
                  ? "bg-orange-500 text-stone-950 shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>LICENSE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Document Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
            <span className="font-mono text-stone-200 bg-stone-800 px-2 py-0.5 rounded border border-stone-700/60">
              {fileName}
            </span>
            <span>&bull;</span>
            <span>{activeContent.split("\n").length} lines</span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode (Rendered vs Raw) */}
            <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs">
              <button
                id="view-rendered"
                onClick={() => setViewMode("rendered")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                  viewMode === "rendered"
                    ? "bg-stone-800 text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                id="view-raw"
                onClick={() => setViewMode("raw")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                  viewMode === "raw"
                    ? "bg-stone-800 text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Raw</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              id="copy-file-btn"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            {/* Download Button */}
            <button
              id="download-file-btn"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="rounded-2xl bg-stone-900/40 border border-stone-800/90 overflow-hidden shadow-sm">
          {viewMode === "rendered" ? (
            activeTab === "readme" ? (
              <div className="p-6 sm:p-10 prose prose-invert prose-stone max-w-none prose-headings:font-bold prose-headings:text-white prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg prose-p:text-stone-300 prose-p:leading-relaxed prose-code:text-orange-300 prose-code:bg-stone-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-800 prose-pre:p-4 prose-pre:rounded-xl prose-table:border prose-table:border-stone-800 prose-th:text-stone-200 prose-td:text-stone-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeContent}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="p-6 sm:p-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-orange-400" />
                  <span>The Unlicense</span>
                </h2>
                <pre className="p-6 bg-stone-950 rounded-xl text-xs sm:text-sm font-mono text-stone-300 leading-relaxed whitespace-pre-wrap border border-stone-800">
                  {activeContent}
                </pre>
              </div>
            )
          ) : (
            <div className="p-6 sm:p-8">
              <pre className="p-6 bg-stone-950 rounded-xl text-xs sm:text-sm font-mono text-stone-300 leading-relaxed whitespace-pre-wrap overflow-x-auto border border-stone-800">
                {activeContent}
              </pre>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-6 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>photo-gallery- &bull; Google Gemini Multimodal Documentation</span>
          <a
            href="https://github.com/pineapple-porty/photo-gallery-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-300 transition-colors flex items-center gap-1"
          >
            <GitBranch className="w-3 h-3" />
            <span>pineapple-porty/photo-gallery-</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
