import React, { useEffect, useRef } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  pulsePhase: number;
}

interface DataLattice3DProps {
  isDark: boolean;
  className?: string;
}

export const DataLattice3D: React.FC<DataLattice3DProps> = ({ isDark, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D point cloud
    const nodeCount = 52;
    const nodes: Node3D[] = [];
    const spreadX = 220;
    const spreadY = 140;
    const spreadZ = 180;

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.9 + 0.1;

      const x = r * Math.sin(phi) * Math.cos(theta) * spreadX;
      const y = r * Math.sin(phi) * Math.sin(theta) * spreadY;
      const z = r * Math.cos(phi) * spreadZ;

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: Math.random() * 1.8 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let rotX = 0.15;
    let rotY = 0.2;
    let targetRotX = 0.15;
    let targetRotY = 0.2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = mx * 0.8;
      targetRotX = -my * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const fov = 380;
    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth camera interpolation
      rotX += (targetRotX + Math.sin(time * 0.7) * 0.05 - rotX) * 0.05;
      rotY += (targetRotY + time * 0.06 - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Project nodes to 2D
      const projected = nodes.map((node) => {
        // Y-axis rotation
        const x1 = node.baseX * cosY - node.baseZ * sinY;
        const z1 = node.baseZ * cosY + node.baseX * sinY;

        // X-axis rotation
        const y1 = node.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.baseY * sinX;

        const distance = fov + z2 + 250;
        const scale = fov / Math.max(distance, 50);

        const screenX = width / 2 + x1 * scale;
        const screenY = height / 2 + y1 * scale;

        return {
          sx: screenX,
          sy: screenY,
          z: z2,
          scale,
          radius: node.radius * scale,
          pulse: Math.sin(time * 2 + node.pulsePhase)
        };
      });

      // Sort by depth (painter algorithm)
      const maxDistance = 95;

      // Draw crystalline connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.28 : 0.2);
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);

            if (isDark) {
              ctx.strokeStyle = `rgba(225, 230, 240, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(30, 41, 59, ${alpha * 0.8})`;
            }
            ctx.lineWidth = 0.85 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw crystalline node vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(p.radius, 0.8), 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = p.pulse > 0.4 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(180, 195, 220, 0.65)';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = p.pulse > 0.5 ? 8 : 2;
        } else {
          ctx.fillStyle = p.pulse > 0.4 ? 'rgba(15, 23, 42, 0.9)' : 'rgba(71, 85, 105, 0.55)';
          ctx.shadowColor = 'rgba(15, 23, 42, 0.2)';
          ctx.shadowBlur = 3;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none transition-opacity duration-700 ${className}`}
      style={{ filter: isDark ? 'contrast(1.1)' : 'contrast(1.05)' }}
    />
  );
};
