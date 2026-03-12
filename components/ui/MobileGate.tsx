"use client";

import { useState, useEffect } from "react";

export function MobileGate({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile && !dismissed) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8"
        style={{ background: "#070B0F" }}
      >
        <div className="max-w-sm text-center">
          <h1
            className="font-mono text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "#5A7A8A" }}
          >
            Framewerk
          </h1>
          <p className="font-sans text-[14px] leading-relaxed mb-2" style={{ color: "#6A8090" }}>
            700 mental models as neurons. Explore connections, ask the Oracle.
          </p>
          <p className="font-sans text-[12px] leading-relaxed mb-6" style={{ color: "#4A6070" }}>
            Optimized for touch. For the full experience with keyboard shortcuts and legends, visit on desktop.
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-full
              transition-colors duration-200"
            style={{
              color: "#E8A030",
              border: "1px solid rgba(232, 160, 48, 0.3)",
              background: "rgba(232, 160, 48, 0.08)",
            }}
          >
            Explore
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
