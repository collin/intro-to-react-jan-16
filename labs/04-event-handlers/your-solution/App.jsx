const boxStyles = {
  border: "1px solid black",
  padding: "1rem",
  margin: "1rem",
};

export const App = () => {
  return (
    <div>
      <div style={boxStyles}>Click me</div>
      <div style={boxStyles}>Double click me</div>
      <div style={boxStyles}>Mouseover me</div>
      <div>
        Pick a color:
        <input type="color" />
      </div>
      <div>
        Log keypresses here
        <input type="text" />
      </div>
    </div>
  );
};
