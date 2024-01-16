import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "@code-hike/mdx/styles";
import "./images/styles.css";

import { Book } from "./Book";
import { ScrollToTop } from "ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ScrollToTop />
    <Book />
  </HashRouter>,
);
