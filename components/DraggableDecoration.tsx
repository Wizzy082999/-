import React, { useState, useEffect, useRef } from 'react';
import { Decoration } from '../types';
import { DECORATION_ASSETS } from '../constants';

interface DraggableDecorationProps {
  decoration: Decoration;
  mode: 'editor' | 'viewer';
  onUpdate: (id: string, newPos: { x: number; y: number }) => void;
}

export const DraggableDecoration: React.FC<DraggableDecorationProps> = ({ decoration, mode, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: decoration.x, y: decoration.y });
  const ref = useRef<HTMLDivElement>(null);
  
  // Generate random flight parameters once per component mount
  // This ensures different Santa instances don't fly in perfect sync
  const [flightParams] = useState(() => ({
    duration: 15 + Math.random() * 15 + 's', // 15-30 seconds duration
    delay: -Math.random() * 20 + 's' // Start at random point in path
  }));

  // Sync with props
  useEffect(() => {
    setPosition({ x: decoration.x, y: decoration.y });
  }, [decoration.x, decoration.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode !== 'editor') return;
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate percentage based position
      const newX = (e.clientX / window.innerWidth) * 100;
      const newY = (e.clientY / window.innerHeight) * 100;
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onUpdate(decoration.id, position);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, decoration.id, onUpdate, position]);

  if (decoration.visible === false) return null;

  const isSanta = decoration.type === 'santa';
  
  // FIX 1: Santa size adjustment
  // Santa emoji combo is very wide, so we use a smaller base size (2.5rem) compared to others (5rem)
  const baseSize = isSanta ? 2.5 : 5;

  // Determine styles
  let finalStyle: React.CSSProperties = {
     fontSize: `${baseSize * decoration.scale}rem`,
     textShadow: '0 4px 10px rgba(0,0,0,0.4)',
     zIndex: mode === 'editor' ? 50 : 10,
  };
  
  let animateClass = "";

  if (mode === 'editor') {
      // Editor Mode: Use absolute positioning from state
      finalStyle.left = `${position.x}%`;
      finalStyle.top = `${position.y}%`;
      finalStyle.transform = 'translate(-50%, -50%)';
  } else {
      // Viewer Mode: Use CSS animations
      if (isSanta) {
          // FIX 2: Santa Animation Logic
          animateClass = "animate-santa-fly";
          // We DO NOT set 'left' or 'transform' here. 
          // The 'santa-fly' keyframes in index.html handle the left movement (-20% to 120%)
          // and the centering transform.
          
          // We ONLY set top (height) based on where the user placed it.
          finalStyle.top = `${decoration.y}%`;
          
          // Apply random timing
          finalStyle.animationDuration = flightParams.duration;
          finalStyle.animationDelay = flightParams.delay;
      } else {
          // Standard Decoration Logic
          animateClass = "animate-float";
          finalStyle.left = `${decoration.x}%`;
          finalStyle.top = `${decoration.y}%`;
          // Note: We do NOT set 'transform' here because the 'float' keyframe 
          // in index.html now includes 'translate(-50%, -50%)'.
      }
  }

  return (
    <div
      ref={ref}
      className={`fixed select-none transition-transform duration-75 ${
        mode === 'editor' 
          ? 'cursor-move hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' 
          : `pointer-events-none ${animateClass}`
      }`}
      style={finalStyle}
      onMouseDown={handleMouseDown}
    >
      {DECORATION_ASSETS[decoration.type]}
    </div>
  );
};