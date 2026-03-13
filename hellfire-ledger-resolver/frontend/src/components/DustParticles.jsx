import React, { useEffect, useState } from 'react';

const DustParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = [];
    for (let i = 0; i < 30; i++) {
      p.push({
        id: i,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: Math.random() * 4 + 1 + 'px',
        duration: Math.random() * 20 + 10 + 's',
        delay: Math.random() * 10 + 's'
      });
    }
    setParticles(p);
  }, []);

  return (
    <div className="dust-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="dust-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.duration,
            animationDelay: particle.delay
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;
