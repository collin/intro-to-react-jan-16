import "./styles.css";
import { Route, Routes, NavLink } from "react-router-dom";

const Home = () => {
  return <h2>Home</h2>;
};
const About = () => {
  return <h2>About</h2>;
};
const Contact = () => {
  return <h2>Contact</h2>;
};
const NotFound = () => {
  return <h2>Not Found</h2>;
};

export const App = () => {
  return (
    <div>
      <h1>Simple Site with Routes</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/not-a-page">Not Found</NavLink>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
