import { useState } from "react";

export const App = () => {
  const [timestampse, setTimestamps] = useState([]);
  return (
    <div>
      <button
        onClick={() => {
          setTimestamps([...timestampse, new Date()]);
        }}
      >
        {" "}
        Add Timestamp
      </button>

      <ol>
        {timestampse.map((timestamp) => (
          <li>
            <button
              onClick={() => {
                setTimestamps(timestampse.filter((t) => t !== timestamp));
              }}
            >
              Remove
            </button>
            {timestamp.toLocaleString("en-US")}
          </li>
        ))}
      </ol>
    </div>
  );
};
