"use client";

import { useEffect, useRef, useState } from "react";
import { useGraphStore } from "@/store/graphStore";

const SEEN_KEY = "framewerk-mode-toggled";

export function ModeToggle() {
  const appMode = useGraphStore((s) => s.appMode);
  const setAppMode = useGraphStore((s) => s.setAppMode);
  const nodes = useGraphStore((s) => s.nodes);
  const oracleLoading = useGraphStore((s) => s.oracleLoading);
  const oracleRef = useRef<HTMLButtonElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const [flashKey, setFlashKey] = useState(0);
  const prevMode = useRef(appMode);

  // Attention pulse state — shows once until user interacts with toggle
  const [showAttention, setShowAttention] = useState(false);
  const [attentionDismissed, setAttentionDismissed] = useState(false);

  // Start attention pulse after boot sequence (10s delay)
  useEffect(() => {
    if (nodes.length === 0) return;
    if (typeof window !== "undefined" && localStorage.getItem(SEEN_KEY)) {
      setAttentionDismissed(true);
      return;
    }
    const timer = setTimeout(() => setShowAttention(true), 10000);
    return () => clearTimeout(timer);
  }, [nodes.length]);

  // Dismiss attention on mode change
  useEffect(() => {
    if (prevMode.current !== appMode) {
      setFlashKey((k) => k + 1);
      prevMode.current = appMode;
      if (!attentionDismissed) {
        setAttentionDismissed(true);
        setShowAttention(false);
        if (typeof window !== "undefined") {
          localStorage.setItem(SEEN_KEY, "1");
        }
      }
    }
  }, [appMode, attentionDismissed]);

  // Tab key toggles mode (when not in an input)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Tab" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        if (oracleLoading) return;
        const selectedNodeId = useGraphStore.getState().selectedNodeId;
        if (selectedNodeId) return;
        e.preventDefault();
        setAppMode(appMode === "explore" ? "oracle" : "explore");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [appMode, setAppMode, oracleLoading]);

  if (nodes.length === 0) return null;
  if (oracleLoading) return null;

  const isOracle = appMode === "oracle";
  const pulseOracle = showAttention && !attentionDismissed && !isOracle;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30">
      {/* Mode switch flash overlay */}
      {flashKey > 0 && (
        <div
          key={flashKey}
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background: isOracle
              ? "radial-gradient(circle at 50% 0%, rgba(232, 160, 48, 0.08), transparent 60%)"
              : "radial-gradient(circle at 50% 0%, rgba(140, 180, 204, 0.06), transparent 60%)",
            animation: "modeFlash 0.6s ease-out forwards",
          }}
        />
      )}
      <div
        className="relative grid grid-cols-2 rounded-xl"
        role="tablist"
        aria-label="App mode"
        style={{
          background: "rgba(7, 11, 15, 0.92)",
          border: "1px solid rgba(60, 90, 110, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
        }}
      >
        <button
          ref={oracleRef}
          role="tab"
          aria-selected={isOracle}
          onClick={() => setAppMode("oracle")}
          className="relative px-10 py-3.5 rounded-xl font-mono text-[11px] tracking-[0.2em]
            uppercase cursor-pointer transition-all duration-300 min-w-[130px] text-center
            max-md:px-6 max-md:py-3 max-md:min-w-[90px] max-md:text-[10px]"
          style={{
            color: isOracle ? "#E8A030" : pulseOracle ? "#7A6A50" : "#3A5565",
            background: isOracle ? "rgba(232, 160, 48, 0.13)" : "transparent",
            border: isOracle ? "1px solid rgba(232, 160, 48, 0.25)" : "1px solid transparent",
            animation: pulseOracle ? "toggleAttention 2s ease-in-out 3" : "none",
          }}
        >
          Oracle
        </button>

        <button
          ref={exploreRef}
          role="tab"
          aria-selected={!isOracle}
          onClick={() => setAppMode("explore")}
          className="relative px-10 py-3.5 rounded-xl font-mono text-[11px] tracking-[0.2em]
            uppercase cursor-pointer transition-all duration-300 min-w-[130px] text-center
            max-md:px-6 max-md:py-3 max-md:min-w-[90px] max-md:text-[10px]"
          style={{
            color: !isOracle ? "#B0C8D8" : "#3A5565",
            background: !isOracle ? "rgba(140, 180, 204, 0.08)" : "transparent",
            border: !isOracle ? "1px solid rgba(140, 180, 204, 0.15)" : "1px solid transparent",
          }}
        >
          Explore
        </button>
      </div>

      {/* Hint text below toggle — only during attention pulse */}
      {pulseOracle && (
        <p
          className="text-center mt-2 font-mono text-[8px] tracking-wider uppercase"
          style={{
            color: "#5A5040",
            animation: "onboardingFadeIn 0.8s ease-out",
          }}
        >
          Ask the Oracle a question
        </p>
      )}
    </div>
  );
}
