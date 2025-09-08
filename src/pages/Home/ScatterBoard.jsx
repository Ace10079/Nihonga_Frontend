import React, { useMemo, useState, useRef, useEffect } from "react";

const ScatterBoard = ({ imageUrl, rows = 5, cols = 8 }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 960, height: 540 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width, height } = dimensions;

  const pieces = useMemo(() => {
    const arr = [];
    const pieceW = width / cols;
    const pieceH = height / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * pieceW;
        const y = r * pieceH;
        arr.push({
          id: r * cols + c,
          clip: `inset(${y}px ${width - (x + pieceW)}px ${height - (y + pieceH)}px ${x}px)`,
          tx: (Math.random() - 0.5) * width * 0.6,
          ty: (Math.random() - 0.5) * height * 0.6,
          rot: (Math.random() - 0.5) * 40,
          delay: Math.random() * 200,
        });
      }
    }
    return arr;
  }, [rows, cols, width, height]);

  return (
    <section className="w-full py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Hover to Assemble</h2>
      <div className="flex justify-center">
        <div
          ref={containerRef}
          className="relative bg-white border border-gray-200 overflow-hidden group cursor-pointer w-full max-w-4xl aspect-video"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {pieces.map((p) => (
            <img
              key={p.id}
              src={imageUrl}
              alt="tile"
              className="absolute top-0 left-0 will-change-transform"
              style={{
                width,
                height,
                clipPath: p.clip,
                WebkitClipPath: p.clip,
                transform: hovered
                  ? `translate3d(0,0,0) rotate(0deg)`
                  : `translate3d(${p.tx}px, ${p.ty}px, 0) rotate(${p.rot}deg)`,
                transition: `transform 700ms cubic-bezier(0.22, 1, 0.36, 1)`,
                transitionDelay: `${p.delay}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScatterBoard;
