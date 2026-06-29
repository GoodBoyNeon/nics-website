import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  angleX: number;
  angleY: number;
  speedX: number;
  speedY: number;
  radius: number;
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const nodeCount = 70;
    const connectionDistance = 150;

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const isTeal = Math.random() > 0.4;
        const color = isTeal
          ? "rgba(38, 149, 149, 0.45)" // teal-ish
          : "rgba(156, 163, 175, 0.3)"; // gray-ish

        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          angleX: Math.random() * Math.PI * 2,
          angleY: Math.random() * Math.PI * 2,
          speedX: 0.003 + Math.random() * 0.005,
          speedY: 0.003 + Math.random() * 0.005,
          radius: 1.5 + Math.random() * 2,
          color,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // If reduced motion is requested, draw static nodes and skip the animation loop updates
      if (!isReducedMotion) {
        // Update positions using sine-wave motion
        nodes.forEach((node) => {
          node.angleX += node.speedX;
          node.angleY += node.speedY;

          // Float around the base position with standard offsets
          node.x = node.baseX + Math.sin(node.angleX) * 35;
          node.y = node.baseY + Math.cos(node.angleY) * 35;

          // Keep within bounds
          if (node.x < -40) node.x = canvas.width + 40;
          if (node.x > canvas.width + 40) node.x = -40;
          if (node.y < -40) node.y = canvas.height + 40;
          if (node.y > canvas.height + 40) node.y = -40;
        });
      }

      // Draw connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Faint lines based on proximity
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(38, 149, 149, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    // Set up resize observer to watch container
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (isReducedMotion) {
        draw(); // draw once statically
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }
    resizeCanvas();

    if (isReducedMotion) {
      draw(); // Draw static state once
    } else {
      draw(); // Start animation loop
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="absolute inset-0 w-full h-full block bg-white"
      style={{ pointerEvents: "none" }}
    />
  );
}
