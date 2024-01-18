import { useEffect, useRef, useState } from "react";

export const App = () => {
  const canvasRef = useRef(null);
  const [radius, setRadius] = useState(10);
  const [color, setColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a circle with the given radius and color
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0, 2 * Math.PI);
    ctx.fill();
  }, [radius, color]);

  return (
    <div>
      <h1>Canvas Draw</h1>
      <canvas ref={canvasRef} width="400" height="400" />
      <input
        type="range"
        min="10"
        max="150"
        value={radius}
        onChange={(event) => setRadius(event.target.valueAsNumber)}
      />
      <input
        type="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
    </div>
  );
};
