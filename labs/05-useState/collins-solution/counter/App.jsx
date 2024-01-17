import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);

  if (count > 3) {
    useState(10);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Subtract
      </button>
    </div>
  );
};
