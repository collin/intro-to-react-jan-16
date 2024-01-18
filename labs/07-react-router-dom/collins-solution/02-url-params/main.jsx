import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ShowErrors } from "ShowErrors";
import { HashRouter } from "react-router-dom";

const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <HashRouter>
    <ShowErrors>
      <App />
    </ShowErrors>
  </HashRouter>,
);
