
import React, { useEffect, useRef } from "react";

// Animated background: vertical gradient and floating geometric shapes (mini rugby balls/abstract dots)
const BACKGROUND_GRADIENT =
  "linear-gradient(to bottom, #003366 0%, #00A6FF 100%)";

const SHAPES = [
  // shape: circle, triangle, or rugby ball ellipse
  { type: "circle", color: "#FFC700" }, // gold
  { type: "circle", color: "#FFEA70" }, // yellow
  { type: "ellipse", color: "#FFFFFF" }, // white (ball)
  { type: "circle", color: "#29A1F6" }, // light blue
  { type: "ellipse", color: "#003366" }, // navy ball
  { type: "triangle", color: "#FFC700" },
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animate floating shapes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let devicePixelRatio = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth * devicePixelRatio;
    let height = canvas.offsetHeight * devicePixelRatio;
    canvas.width = width;
    canvas.height = height;

    // position/velocity for shapes
    const shapes = Array.from({ length: 15 }).map((_, i) => {
      const type = SHAPES[i % SHAPES.length].type;
      const color = SHAPES[i % SHAPES.length].color;
      const x = randomBetween(0, width);
      const y = randomBetween(0, height);
      const r = randomBetween(12, 34) * devicePixelRatio; // size
      const duration = randomBetween(9, 18);
      return {
        type,
        color,
        x,
        y,
        r,
        progress: Math.random(),
        speed: randomBetween(0.006, 0.014) / duration, // vertical speed
        drift: randomBetween(0.09, 0.19),
        shapeRotation: randomBetween(0, Math.PI * 2)
      };
    });

    let frame = 0;
    let running = true;
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#003366");
      gradient.addColorStop(1, "#00A6FF");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Animate and draw shapes
      for (let s of shapes) {
        // update
        s.progress += s.speed;
        let posY = (s.y - s.progress * (height + 120)) % (height + 120);
        if (posY < -80) {
          s.x = randomBetween(0, width);
          s.r = randomBetween(12, 34) * devicePixelRatio;
          s.progress = 0;
        }
        const posX =
          s.x +
          Math.sin((frame / 55) * s.drift + s.x) * 15 * (s.drift * 1.6);

        ctx.save();
        ctx.globalAlpha = 0.45 + 0.19 * Math.sin(frame / 120 + s.x);

        // Draw shape
        if (s.type === "circle") {
          ctx.beginPath();
          ctx.arc(posX, posY, s.r, 0, Math.PI * 2, false);
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 20;
          ctx.fill();
        } else if (s.type === "ellipse") {
          ctx.beginPath();
          ctx.ellipse(
            posX,
            posY,
            s.r * 1.2,
            s.r * 0.9,
            s.shapeRotation + (frame / 470),
            0,
            Math.PI * 2
          );
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 13;
          ctx.fill();
          // add faint stroke for ball "seams"
          ctx.save();
          ctx.globalAlpha = 0.48;
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#E2D2A3";
          ctx.beginPath();
          ctx.ellipse(
            posX,
            posY,
            (s.r * 1.18),
            (s.r * 0.6),
            s.shapeRotation + (frame / 470),
            0,
            Math.PI * 2
          );
          ctx.stroke();
          ctx.restore();
        } else if (s.type === "triangle") {
          ctx.beginPath();
          let angle = s.shapeRotation + (frame / 100);
          for (let i = 0; i < 3; i++) {
            let ang = angle + (i * (2 * Math.PI) / 3);
            let xx = posX + s.r * Math.cos(ang);
            let yy = posY + s.r * Math.sin(ang);
            if (i === 0) ctx.moveTo(xx, yy);
            else ctx.lineTo(xx, yy);
          }
          ctx.closePath();
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 9;
          ctx.fill();
        }
        ctx.restore();
      }
      frame++;
      if (running) requestAnimationFrame(draw);
    }

    draw();
    function onResize() {
      devicePixelRatio = window.devicePixelRatio || 1;
      width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.offsetHeight * devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none select-none"
        style={{
          background: BACKGROUND_GRADIENT,
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0
        }}
      />
      <canvas
        ref={canvasRef}
        className="canvas-container pointer-events-none fixed inset-0 z-0"
        width={1920}
        height={1080}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 0
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default BackgroundAnimation;

