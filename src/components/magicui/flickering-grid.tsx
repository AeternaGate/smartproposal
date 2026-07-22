"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "#5e6ad2",
  maxOpacity = 0.3,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const squaresRef = useRef<Float32Array | null>(null);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(true);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const squares = squaresRef.current;
    if (!canvas || !ctx || !squares) return;

    const { width, height } = canvasSizeRef.current;
    const cols = Math.floor(width / (squareSize + gridGap));
    const rows = Math.floor(height / (squareSize + gridGap));
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols * rows; i++) {
      const alpha = squares[i] * maxOpacity;
      if (alpha < 0.01) continue;

      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * (squareSize + gridGap);
      const y = row * (squareSize + gridGap);

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(x * dpr, y * dpr, squareSize * dpr, squareSize * dpr);
    }
    ctx.globalAlpha = 1;
  }, [squareSize, gridGap, color, maxOpacity]);

  const updateSquares = useCallback(() => {
    const squares = squaresRef.current;
    if (!squares) return;

    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < flickerChance) {
        squares[i] = Math.random();
      }
      squares[i] *= 0.98;
    }
  }, [flickerChance]);

  const setupCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvasSizeRef.current = { width: rect.width, height: rect.height };
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctxRef.current = canvas.getContext("2d");

    const cols = Math.floor(rect.width / (squareSize + gridGap));
    const rows = Math.floor(rect.height / (squareSize + gridGap));

    if (!squaresRef.current || squaresRef.current.length !== cols * rows) {
      squaresRef.current = new Float32Array(cols * rows);
      for (let i = 0; i < squaresRef.current.length; i++) {
        squaresRef.current[i] = Math.random() * 0.5;
      }
    }

    drawGrid();
  }, [squareSize, gridGap, drawGrid]);

  useEffect(() => {
    setupCanvas();

    const container = containerRef.current;
    const ro = new ResizeObserver(() => setupCanvas());
    if (container) ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (canvasRef.current) io.observe(canvasRef.current);

    const animate = () => {
      if (inViewRef.current) {
        updateSquares();
        drawGrid();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [setupCanvas, updateSquares, drawGrid]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
}
