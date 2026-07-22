"use client";

import { useRef, useState, useEffect } from "react";

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
  shineColor?: string;
  spread?: number;
  pauseOnHover?: boolean;
}

export function ShinyText({
  text,
  speed = 3,
  className = "",
  shineColor = "#828fff",
  spread = 80,
  pauseOnHover = false,
}: ShinyTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const [bgPos, setBgPos] = useState("150% center");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    progressRef.current = 0;

    const animate = (time: number) => {
      if (isPaused) {
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      elapsedRef.current += delta;

      const cycleDuration = speed * 1000;
      const cycleTime = elapsedRef.current % cycleDuration;
      const p = (cycleTime / cycleDuration) * 100;
      progressRef.current = p;

      setBgPos(`${150 - p * 2}% center`);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, isPaused]);

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, transparent 0%, transparent 35%, ${shineColor} 50%, transparent 65%, transparent 100%)`,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundPosition: bgPos,
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {text}
    </span>
  );
}
