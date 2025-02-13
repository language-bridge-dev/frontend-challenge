import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IconContext } from "react-icons";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <App />
      </IconContext.Provider>
    </Provider>
  </StrictMode>
);
