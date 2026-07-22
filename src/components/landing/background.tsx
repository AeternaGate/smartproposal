export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[image:radial-gradient(rgba(35,37,42,0.3)_1px,transparent_1px)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute -left-[10%] -top-[20%] h-[60%] w-[60%] animate-glow-drift rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute -right-[10%] top-[40%] h-[40%] w-[40%] animate-glow-drift-slow rounded-full bg-primary/5 blur-[100px]" />
    </div>
  );
}
