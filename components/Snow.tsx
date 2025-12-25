import React, { useMemo } from "react";

const Snow: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = Math.random() * 5 + 5; // 5-10s
      const delay = Math.random() * 5;
      const size = Math.random() * 10 + 5; // 5-15px
      const opacity = Math.random() * 0.5 + 0.3;

      return (
        <div
          key={i}
          className="snowflake text-white"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            fontSize: `${size}px`,
            opacity: opacity,
          }}
        >
          ❄
        </div>
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">{snowflakes}</div>
  );
};

export default Snow;
