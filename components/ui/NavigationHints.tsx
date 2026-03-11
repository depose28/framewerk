"use client";

import { useState, useEffect, useMemo } from "react";
import { useGraphStore } from "@/store/graphStore";

export function NavigationHints() {
  const nodes = useGraphStore((s) => s.nodes);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const hoveredNodeId = useGraphStore((s) => s.hoveredNodeId);
  const navigationHistory = useGraphStore((s) => s.navigationHistory);
  const synapseMode = useGraphStore((s) => s.synapseMode);
  const appMode = useGraphStore((s) => s.appMode);
  const [ready, setReady] = useState(false);

  // Delay showing hints until after boot sequence
  useEffect(() => {
    if (nodes.length === 0) return;
    const timer = setTimeout(() => setReady(true), 8000);
    return () => clearTimeout(timer);
  }, [nodes.length]);

  // Build contextual hints based on current state
  const hints = useMemo(() => {
    if (!ready || nodes.length === 0) return [];
    if (appMode === "oracle") return [];

    const items: { icon: string; label: string; key: string }[] = [];

    if (synapseMode) {
      items.push({ icon: "click", label: "Click labels to fly", key: "synapse-click" });
      items.push({ icon: "esc", label: "Exit synapse", key: "synapse-esc" });
      if (navigationHistory.length > 0) {
        items.push({ icon: "backspace", label: "Go back", key: "synapse-back" });
      }
      return items;
    }

    if (selectedNodeId) {
      items.push({ icon: "arrows", label: "Cycle connections", key: "sel-arrows" });
      if (navigationHistory.length > 0) {
        items.push({ icon: "backspace", label: "Go back", key: "sel-back" });
      }
      items.push({ icon: "esc", label: "Deselect", key: "sel-esc" });
      return items;
    }

    if (hoveredNodeId) {
      items.push({ icon: "click", label: "Select", key: "hov-click" });
      items.push({ icon: "dblclick", label: "Deep dive", key: "hov-dbl" });
      return items;
    }

    // Default — no interaction yet
    items.push({ icon: "scroll", label: "Zoom", key: "def-scroll" });
    items.push({ icon: "drag", label: "Rotate", key: "def-drag" });
    items.push({ icon: "click", label: "Select node", key: "def-click" });
    return items;
  }, [ready, nodes.length, selectedNodeId, hoveredNodeId, navigationHistory.length, synapseMode, appMode]);

  if (hints.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5 px-5 py-2.5 rounded-full
        transition-all duration-500"
      style={{
        background: "rgba(7, 11, 15, 0.85)",
        border: "1px solid rgba(60, 90, 110, 0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      {hints.map((hint, i) => (
        <div key={hint.key} className="flex items-center gap-2">
          {i > 0 && (
            <div
              className="w-px h-3 flex-shrink-0 mr-3"
              style={{ background: "rgba(60, 90, 110, 0.2)" }}
            />
          )}
          <HintIcon type={hint.icon} />
          <span className="font-mono text-[9px] text-[#4A6A7A] tracking-wider uppercase">
            {hint.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HintIcon({ type }: { type: string }) {
  const cls = "flex-shrink-0 text-[#5A7A8A]";

  switch (type) {
    case "scroll":
      return (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className={cls}>
          <rect x="3" y="0.5" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1" />
          <line x1="6" y1="3" x2="6" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M3 12.5L6 13.5L9 12.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 11L6 10L9 11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "drag":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={cls}>
          <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1" />
          <path d="M7 1V4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M7 10V13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M1 7H4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M10 7H13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      );
    case "click":
      return (
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" className={cls}>
          <path d="M4 1V8.5L2 7L1 8L5 13L10 7.5L8.5 6.5L7 8V1C7 0.5 6.5 0 6 0H5C4.5 0 4 0.5 4 1Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
        </svg>
      );
    case "dblclick":
      return (
        <kbd
          className="font-mono text-[8px] text-[#5A7A8A] px-1 py-0.5 rounded"
          style={{ border: "1px solid rgba(60, 90, 110, 0.3)" }}
        >
          2×
        </kbd>
      );
    case "arrows":
      return (
        <kbd
          className="font-mono text-[8px] text-[#5A7A8A] px-1 py-0.5 rounded"
          style={{ border: "1px solid rgba(60, 90, 110, 0.3)" }}
        >
          ↑↓
        </kbd>
      );
    case "backspace":
      return (
        <kbd
          className="font-mono text-[8px] text-[#5A7A8A] px-1 py-0.5 rounded"
          style={{ border: "1px solid rgba(60, 90, 110, 0.3)" }}
        >
          ⌫
        </kbd>
      );
    case "esc":
      return (
        <kbd
          className="font-mono text-[8px] text-[#5A7A8A] px-1 py-0.5 rounded"
          style={{ border: "1px solid rgba(60, 90, 110, 0.3)" }}
        >
          esc
        </kbd>
      );
    default:
      return null;
  }
}
