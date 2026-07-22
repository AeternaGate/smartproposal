import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={3}
        gridGap={5}
        color="#5e6ad2"
        maxOpacity={0.15}
        flickerChance={0.08}
      />

      <div className="absolute -left-[10%] -top-[20%] h-[60%] w-[60%] animate-glow-drift rounded-full bg-primary/6 blur-[140px]" />
      <div className="absolute -right-[10%] top-[30%] h-[40%] w-[40%] animate-glow-drift-slow rounded-full bg-primary/4 blur-[120px]" />
      <div className="absolute left-[30%] top-[65%] h-[30%] w-[30%] animate-glow-drift-3 rounded-full bg-primary/3 blur-[100px]" />

      <div className="absolute inset-0 animate-grid-sweep bg-[linear-gradient(90deg,transparent_0%,rgba(94,106,210,0.02)_50%,transparent_100%)] bg-[length:250%_100%]" />
    </div>
  );
}
