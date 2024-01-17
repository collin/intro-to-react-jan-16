import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ShowErrors } from "ShowErrors";

const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <ShowErrors>
    <App />
  </ShowErrors>,
);
