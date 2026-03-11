"use client";

import { useState, useEffect } from "react";
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
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;

    // Show hints shortly after loading finishes
    if (!loading) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (!visible) return;

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
  }, [visible]);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
      style={{
        animation: "onboardingFadeIn 0.8s ease-out",
      }}
    >
      {/* Subtle vignette behind text so it's readable during boot sequence */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 30% at 50% 50%, rgba(7, 11, 15, 0.6), transparent)",
          animation: "vignetteIn 1s ease-out",
        }}
      />
      {/* Specimen-label style — minimal, clinical, matches the graph aesthetic */}
      <div className="pointer-events-auto relative">
        <div className="flex flex-col gap-2.5">
          {hints.map((hint, i) => (
            <div
              key={hint.key}
              className="flex items-center gap-3"
              style={{
                animation: `onboardingSlideIn 0.4s ease-out ${i * 0.12}s both`,
              }}
            >
              <span
                className="w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ background: "#2A3B47" }}
              />
              <span className="font-mono text-[10px] text-[#4A6A7A] tracking-wide">
                {hint.text}
              </span>
            </div>
          ))}
          <span
            className="font-mono text-[8px] text-[#2A3B47] mt-1 tracking-wider uppercase text-center"
            style={{ animation: "onboardingSlideIn 0.4s ease-out 0.6s both" }}
          >
            Click anywhere to begin
          </span>
        </div>
      </div>
    </div>
  );
}
