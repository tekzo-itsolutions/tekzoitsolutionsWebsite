import React, { useState } from 'react';

const Particles = ({ count = 20 }) => {
  const [particles] = useState(() =>
    Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 60 + 20;
      return {
        id: i,
        size: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${Math.random() * 4 + 4}s`,
      };
    })
  );

  return (
    <div className="hero-particles" style={{ pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
