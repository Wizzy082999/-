
import React, { useEffect, useRef } from 'react';
import { WeatherType } from '../types';

interface WeatherLayerProps {
  weather: WeatherType;
}

export const WeatherLayer: React.FC<WeatherLayerProps> = ({ weather }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles based on weather
    const initParticles = () => {
      particles = [];
      // Significantly increased star count for a denser sky
      const count = weather === 'starry' ? 350 : 150;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: weather === 'snow' ? Math.random() * 1 - 0.5 : weather === 'rain' ? 0 : 0,
          speedY: weather === 'snow' ? Math.random() * 2 + 1 : weather === 'rain' ? Math.random() * 15 + 10 : 0,
          // Stars vary in size for realism
          size: weather === 'starry' ? Math.random() * 2.5 + 0.5 : Math.random() * 3 + 1,
          opacity: Math.random(),
          // Faster flicker for some stars
          flickerSpeed: Math.random() * 0.03 + 0.005
        });
      }
    };

    initParticles();

    const draw = () => {
      // Clear canvas but keep background styles from CSS
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (weather === 'sunny') {
        // Draw sun
        const time = Date.now() * 0.001;
        const sunY = 100 + Math.sin(time) * 10;
        
        // Sun Glow
        const gradient = ctx.createRadialGradient(100, sunY, 20, 100, sunY, 100);
        gradient.addColorStop(0, 'rgba(253, 184, 19, 1)');
        gradient.addColorStop(1, 'rgba(253, 184, 19, 0)');
        
        ctx.beginPath();
        ctx.arc(100, sunY, 100, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(100, sunY, 50, 0, Math.PI * 2);
        ctx.fillStyle = '#FDB813';
        ctx.fill();

        // Draw clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        [1, 2, 3].forEach((i) => {
            const cloudX = (Date.now() * (0.02 * i) + i * 200) % (canvas.width + 400) - 200;
            const cloudY = 50 + i * 40;
            ctx.beginPath();
            ctx.arc(cloudX, cloudY, 40, 0, Math.PI * 2);
            ctx.arc(cloudX + 30, cloudY - 20, 50, 0, Math.PI * 2);
            ctx.arc(cloudX + 70, cloudY, 40, 0, Math.PI * 2);
            ctx.fill();
        });
        
      } else {
        // Particle systems (Rain, Snow, Stars)
        particles.forEach(p => {
          ctx.beginPath();
          
          if (weather === 'snow') {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            p.x += p.speedX;
            p.y += p.speedY;
          } else if (weather === 'rain') {
            ctx.strokeStyle = `rgba(174, 194, 224, ${p.opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + p.speedY * 2);
            ctx.stroke();
            p.y += p.speedY;
          } else if (weather === 'starry') {
            // Twinkle effect
            p.opacity += p.flickerSpeed;
            if (p.opacity > 1 || p.opacity < 0.1) p.flickerSpeed *= -1;
            
            // Pure white stars for better contrast
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.shadowBlur = p.opacity * 5; // Add slight glow
            ctx.shadowColor = "white";
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.shadowBlur = 0; // Reset shadow
          }

          if (weather !== 'starry') {
             // Reset particles that fall off screen
             if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
             }
          }
          
          if (weather !== 'rain') ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather]);

  // Dynamic Background Gradients based on weather
  const getBackgroundClass = () => {
    switch (weather) {
      case 'sunny': return 'bg-gradient-to-b from-sky-400 to-sky-200';
      case 'rain': return 'bg-gradient-to-b from-slate-700 to-slate-900';
      // Deep dark night sky for stars
      case 'starry': return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black';
      case 'snow': default: return 'bg-slate-900';
    }
  };

  return (
    <div className={`fixed inset-0 z-0 transition-colors duration-1000 ${getBackgroundClass()}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
