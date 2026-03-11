"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { label: "Introduction", href: "/docs" },
  {
    label: "The Graph",
    children: [
      { label: "Mental Models", href: "/docs/the-graph/mental-models" },
      { label: "Connections", href: "/docs/the-graph/connections" },
      { label: "Embeddings", href: "/docs/the-graph/embeddings" },
    ],
  },
  {
    label: "Explorer",
    children: [
      { label: "Navigation", href: "/docs/explorer/navigation" },
      { label: "Disciplines", href: "/docs/explorer/disciplines" },
      { label: "Synapse Mode", href: "/docs/explorer/synapse-mode" },
      { label: "Visual System", href: "/docs/explorer/visual-system" },
    ],
  },
  {
    label: "Oracle",
    children: [
      { label: "Overview", href: "/docs/oracle/overview" },
      { label: "API Key Setup", href: "/docs/oracle/api-key-setup" },
      { label: "How Results Work", href: "/docs/oracle/how-results-work" },
      { label: "Follow-Ups", href: "/docs/oracle/follow-ups" },
    ],
  },
  {
    label: "Self-Hosting",
    children: [
      { label: "Quickstart", href: "/docs/self-hosting/quickstart" },
      { label: "Configuration", href: "/docs/self-hosting/configuration" },
      { label: "Deployment", href: "/docs/self-hosting/deployment" },
    ],
  },
  {
    label: "Integrations",
    children: [
      { label: "MCP Server", href: "/docs/integrations/mcp-server" },
    ],
  },
  {
    label: "Architecture",
    children: [
      { label: "Overview", href: "/docs/architecture/overview" },
      { label: "Rendering", href: "/docs/architecture/rendering" },
      { label: "State", href: "/docs/architecture/state" },
    ],
  },
];

function NavSection({
  item,
  pathname,
}: {
  item: (typeof NAV)[number];
  pathname: string;
}) {
  const isActive =
    "children" in item &&
    item.children?.some((c) => pathname === c.href);
  const [open, setOpen] = useState(isActive);

  if ("href" in item && !("children" in item)) {
    return (
      <Link
        href={item.href as string}
        className={`block px-3 py-1.5 rounded text-sm transition-colors ${
          pathname === item.href
            ? "text-amber-400 bg-amber-400/10"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 w-full px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
          fill="currentColor"
        >
          <path d="M3 1.5L7 5L3 8.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        {item.label}
      </button>
      {open && "children" in item && (
        <div className="ml-4 border-l border-zinc-800 pl-2 mt-0.5 mb-1">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-3 py-1 rounded text-sm transition-colors ${
                pathname === child.href
                  ? "text-amber-400 bg-amber-400/10"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-zinc-200 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
            <Link
              href="/"
              className="font-mono font-bold text-sm tracking-[0.15em] text-zinc-100 hover:text-amber-400 transition-colors"
            >
              FRAMEWERK
            </Link>
            <Link
              href="/docs"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Documentation
            </Link>
          </div>
          <a
            href="https://github.com/depose28/framewerk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-zinc-800 py-6 px-2">
          <nav className="flex flex-col gap-0.5">
            {NAV.map((item) => (
              <NavSection key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>
        </aside>

        {/* Sidebar - mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <aside
              className="w-72 h-full bg-[#0a0a0a] border-r border-zinc-800 py-6 px-2 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-0.5">
                {NAV.map((item) => (
                  <NavSection key={item.label} item={item} pathname={pathname} />
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-10 lg:px-12 lg:py-12">
          <article className="prose prose-invert prose-zinc max-w-3xl prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-code:text-amber-300 prose-code:bg-zinc-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-table:text-sm prose-th:text-zinc-300 prose-td:text-zinc-400 prose-strong:text-zinc-200 prose-hr:border-zinc-800">
            {children}
          </article>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4 text-center">
        <p className="text-xs text-zinc-600">Framewerk Documentation</p>
      </footer>
    </div>
  );
}
