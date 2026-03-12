import { LatticeScene } from "@/components/graph/LatticeScene";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { GraphLegend } from "@/components/ui/GraphLegend";
import { SearchBar } from "@/components/ui/SearchBar";
import { OnboardingHints } from "@/components/ui/OnboardingHints";
import { OraclePanel } from "@/components/ui/OraclePanel";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { NavigationHints } from "@/components/ui/NavigationHints";
import { MobileGate } from "@/components/ui/MobileGate";
import { AutoRotateButton } from "@/components/ui/AutoRotateButton";

export default function Home() {
  return (
    <MobileGate>
      <LatticeScene />
      <GraphLegend />
      <SearchBar />
      <ModeToggle />
      <OraclePanel />
      <NavigationHints />
      <OnboardingHints />
      <AutoRotateButton />
      <LoadingScreen />
      {/* Bottom-right links */}
      <div className="fixed bottom-5 right-5 z-20 flex items-center gap-3 hidden md:flex">
        <a
          href="/docs/integrations/mcp-server"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-[10px]
            tracking-[0.15em] uppercase transition-all duration-300 group
            hover:text-[#E8A030]"
          style={{
            background: "rgba(7, 11, 15, 0.7)",
            border: "1px solid rgba(60, 90, 110, 0.2)",
            color: "#6A8A9A",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-80 group-hover:opacity-100 transition-opacity">
            <circle cx="3" cy="7" r="1.5" fill="currentColor" />
            <circle cx="11" cy="4" r="1.5" fill="currentColor" />
            <circle cx="11" cy="10" r="1.5" fill="currentColor" />
            <path d="M4.5 6.5L9.5 4.5M4.5 7.5L9.5 9.5" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          MCP
        </a>
        <a
          href="/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-[10px]
            tracking-[0.15em] uppercase transition-all duration-300
            hover:text-[#8CB4CC]"
          style={{
            background: "rgba(7, 11, 15, 0.7)",
            border: "1px solid rgba(60, 90, 110, 0.2)",
            color: "#6A8A9A",
          }}
        >
          Docs
        </a>
      </div>
    </MobileGate>
  );
}
