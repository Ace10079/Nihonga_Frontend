import React, { useMemo, useRef, useState, useEffect } from 'react';

const ScatterBoard = ({
  imageUrl,
  rows = 5,
  cols = 8,
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 960, height: 540 });
  const [hovered, setHovered] = useState(false);

  // Update width/height based on container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    };

    updateSize(); // initial size
    window.addEventListener('resize', updateSize); // on resize
    return () => window.removeEventListener('resize', updateSize);
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
    <div
      ref={containerRef}
      style={{
        width: '100%',
        aspectRatio: '16 / 9', // maintain aspect ratio
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${width}px ${height}px`,
            clipPath: piece.clip,
            transform: hovered
              ? `translate(${piece.tx}px, ${piece.ty}px) rotate(${piece.rot}deg)`
              : 'translate(0, 0) rotate(0)',
            transition: `transform 0.6s ease ${piece.delay}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default ScatterBoard;
