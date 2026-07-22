"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Pen, RotateCcw, Check } from "lucide-react";
import { signDocument } from "./actions";
import { Button } from "@/components/ui/button";

export function SignForm({ token }: { token: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setSubmitting(true);
    try {
      await signDocument(token, dataUrl);
      router.push(`/share/${token}`);
      router.refresh();
    } catch {
      setSubmitting(false);
    }
  }, [token, router]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <Pen className="size-4" />
        <span>Draw your signature below</span>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        className="w-full rounded-lg border border-hairline bg-black/40 touch-none cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" size="sm" onClick={clearCanvas}>
          <RotateCcw className="size-3.5" />
          Clear
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={!hasDrawn || submitting}>
          <Check className="size-4" />
          {submitting ? "Signing..." : "Sign Document"}
        </Button>
      </div>
    </div>
  );
}
