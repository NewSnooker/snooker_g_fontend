"use client";

import React, { useRef, useEffect } from "react";

interface Spot {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number];
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function CanvasBlurSpotsLarge({
  count = 4,
  colors = [
    [255, 100, 100],
    [100, 200, 255],
    [255, 100, 500],
    [255, 200, 100],
  ],
  random = false,
}: {
  count?: number;
  colors?: [number, number, number][];
  random?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // ถ้าไม่สุ่ม ให้ใช้ค่า fixed ที่กำหนดไว้ภายใน component
    let spots: Spot[] = [];

    if (!random) {
      spots = [
        { x: 200, y: 150, radius: 300, color: [255, 100, 100] },
        { x: 600, y: 400, radius: 250, color: [100, 200, 255] },
        { x: 400, y: 300, radius: 200, color: [255, 200, 100] },
        { x: 800, y: 500, radius: 350, color: [255, 100, 500] },
      ];
    } else {
      spots = Array.from({ length: count }).map(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
          x: randomBetween(0, w),
          y: randomBetween(0, h),
          radius: randomBetween(170, 400),
          color,
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      spots.forEach((s) => {
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        const [r, g, b] = s.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0.4)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    draw();

    function onResize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      draw();
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [count, colors, random]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
