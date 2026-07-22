export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[image:radial-gradient(rgba(35,37,42,0.3)_1px,transparent_1px)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="absolute -left-[10%] -top-[20%] h-[60%] w-[60%] animate-glow-drift rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute -right-[10%] top-[40%] h-[40%] w-[40%] animate-glow-drift-slow rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute left-[30%] top-[60%] h-[30%] w-[30%] animate-glow-drift-3 rounded-full bg-primary/4 blur-[80px]" />

      <div className="absolute inset-0 animate-grid-sweep bg-[linear-gradient(90deg,transparent_0%,rgba(94,106,210,0.03)_50%,transparent_100%)] bg-[length:200%_100%]" />
    </div>
  );
}
