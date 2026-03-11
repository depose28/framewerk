"use client";

import { useState, useEffect, useCallback } from "react";
import { useGraphStore } from "@/store/graphStore";

const STORAGE_KEY = "framewerk-onboarded";

const hints = [
  { key: "graph", text: "700 mental models · 2,796 semantic edges" },
  { key: "explore", text: "Click nodes to explore · Double-click for Synapse Mode" },
  { key: "oracle", text: "Oracle — describe a situation, get a thinking framework" },
  { key: "search", text: "⌘K search · Filter disciplines · Spotlight connections" },
];

export function OnboardingHints() {
  const loading = useGraphStore((s) => s.loading);
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) {
      setHidden(true);
      return;
    }

    // Show hints shortly after loading finishes
    if (!loading) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const dismiss = useCallback(() => {
    if (fadingOut || hidden) return;
    setFadingOut(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setHidden(true), 600);
  }, [fadingOut, hidden]);

  useEffect(() => {
    if (!visible || fadingOut) return;

    // Auto-dismiss after 12 seconds
    const timer = setTimeout(() => dismiss(), 12000);

    // Dismiss on any click or keypress
    function onInteract() {
      dismiss();
    }
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [visible, fadingOut, dismiss]);

  if (!visible || hidden) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-500"
      style={{
        background: "rgba(7, 11, 15, 0.6)",
        animation: !fadingOut ? "onboardingFadeIn 0.8s ease-out" : undefined,
        opacity: fadingOut ? 0 : 1,
      }}
      onClick={dismiss}
    >
      <div
        className="px-8 py-7 rounded-lg"
        style={{
          background: "rgba(7, 11, 15, 0.95)",
          border: "1px solid rgba(60, 90, 110, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 12px 48px rgba(0, 0, 0, 0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3A5060] block mb-4">
          Framewerk
        </span>
        <div className="flex flex-col gap-2.5 mb-5">
          {hints.map((hint, i) => (
            <div
              key={hint.key}
              className="flex items-center gap-3"
              style={{
                animation: `onboardingSlideIn 0.4s ease-out ${i * 0.1}s both`,
              }}
            >
              <span
                className="w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ background: "#4A6070" }}
              />
              <span className="font-mono text-[11px] text-[#7A8E9C]">
                {hint.text}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={dismiss}
          className="w-full py-2 rounded font-mono text-[9px] tracking-[0.15em] uppercase
            cursor-pointer transition-colors"
          style={{
            color: "#5A7A8A",
            background: "rgba(42, 59, 71, 0.15)",
            border: "1px solid rgba(60, 90, 110, 0.12)",
          }}
        >
          Begin exploring
        </button>
      </div>
    </div>
  );
}
