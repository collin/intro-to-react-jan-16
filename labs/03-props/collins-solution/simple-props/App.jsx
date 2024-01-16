import { SimpleProps } from "./SimpleProps";
const simple1 = {
  title: "My First Props",
  description: "This is my first props",
  count: 1,
};

const simple2 = {
  title: "My Second Props",
  description: "This is my second props",
  count: 2,
};

export const App = () => {
  return (
    <div>
      <SimpleProps {...simple1} />
      <SimpleProps {...simple2} />
    </div>
  );
};
