import React, { useRef, useEffect, useState } from 'react';
import { MousePosition } from '../types';

export const PixelHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: -1000, y: -1000 });
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 }); // Ref for animation loop access

  // Handle Mouse Movement
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      mouseRef.current = { x, y };
      setMousePos({ x, y });
    }
  };

  const handleLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
    setMousePos({ x: -1000, y: -1000 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Pixel grid configuration
    const gap = 30; // Distance between pixels
    const size = 3; // Base size of pixel
    const returnSpeed = 0.08; // How fast pixels go back to origin
    const repulsionRadius = 150; // Radius of mouse interaction
    const repulsionStrength = 30; // How hard pixels flee

    interface Pixel {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;
      scale: number;
    }

    let pixels: Pixel[] = [];
    const colors = ['#06b6d4', '#d946ef', '#8b5cf6', '#facc15'];

    const initPixels = () => {
      pixels = [];
      const width = canvas.width;
      const height = canvas.height;
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);

      // Center the grid
      const offsetX = (width - (cols * gap)) / 2;
      const offsetY = (height - (rows * gap)) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * gap;
          const y = offsetY + j * gap;
          const color = colors[Math.floor(Math.random() * colors.length)];
          pixels.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            color,
            scale: 1,
          });
        }
      }
    };

    const draw = () => {
      // Clear with trail effect for "digital" ghosting
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      pixels.forEach((p) => {
        // --- MOUSE INTERACTION ---
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        
        if (dist === 0) {
            forceDirectionX = 0;
            forceDirectionY = 0;
        }

        const force = Math.max(0, repulsionRadius - dist) / repulsionRadius;
        const directionX = forceDirectionX * force * repulsionStrength;
        const directionY = forceDirectionY * force * repulsionStrength;

        if (dist < repulsionRadius) {
            p.vx -= directionX;
            p.vy -= directionY;
            p.scale = 1 + force * 1.5; 
        } else {
            p.scale = Math.max(1, p.scale - 0.05); 
        }

        // --- PHYSICS ---
        // Spring back to origin
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        
        p.vx += homeDx * returnSpeed;
        p.vy += homeDy * returnSpeed;

        // Friction
        p.vx *= 0.85; 
        p.vy *= 0.85;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // --- RENDER ---
        ctx.fillStyle = p.color;
        
        // Glow effect
        if (dist < repulsionRadius) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
        } else {
            ctx.shadowBlur = 0;
        }

        const currentSize = size * p.scale;
        ctx.fillRect(p.x - currentSize / 2, p.y - currentSize / 2, currentSize, currentSize);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        initPixels();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    draw(); 

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="absolute inset-0 w-full h-full cursor-crosshair block" 
      aria-label="Interactive digital particle background"
    />
  );
};