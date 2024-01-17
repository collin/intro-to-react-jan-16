import { useState } from "react";

const boxStyles = {
  border: "1px solid black",
  padding: "1rem",
  margin: "1rem",
};

export const App = () => {
  const [color, setColor] = useState("pink");
  return (
    <div
      style={{
        backgroundColor: color,
      }}
    >
      <div
        style={boxStyles}
        onClick={() => {
          console.log("You clicked me!");
        }}
      >
        Click me
      </div>
      <div
        style={boxStyles}
        onDoubleClick={() => {
          console.log("You double clicked me!");
        }}
      >
        Double click me
      </div>
      <div
        style={boxStyles}
        onMouseOver={() => {
          console.log("You moused over me!");
        }}
      >
        Mouseover me
      </div>
      <div>
        Pick a color:
        <input
          type="color"
          onChange={(event) => {
            setColor(event.target.value);
            console.log(event.target.value);
          }}
        />
      </div>
      <div>
        Log keypresses here
        <input
          type="text"
          onKeyDown={(event) => {
            console.log(event.key);
          }}
        />
      </div>
    </div>
  );
};
