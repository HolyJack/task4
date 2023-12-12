import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
);
