export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, #0b0b1a 0%, #010102 70%)",
        }}
      />

      <div className="absolute -left-[15%] -top-[10%] h-[55%] w-[60%] animate-glow-drift rounded-full bg-primary/15 blur-[300px]" />
      <div className="absolute bottom-[20%] right-[5%] h-[40%] w-[45%] animate-glow-drift-slow rounded-full bg-primary/10 blur-[350px]" />

      <div className="absolute inset-0 bg-noise" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, #010102 100%)",
        }}
      />
    </div>
  );
}
