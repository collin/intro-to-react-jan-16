const ColorBox = ({ color, children }) => {
  return <div style={{ background: color }}>{children}</div>;
};
export const App = () => {
  return (
    <div>
      <ColorBox color="#fcc">This is red!</ColorBox>
      <ColorBox color="#cfc">This is green!</ColorBox>
      <ColorBox color="#ccf">This is blue!</ColorBox>
    </div>
  );
};
