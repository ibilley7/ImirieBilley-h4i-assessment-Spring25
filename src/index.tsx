import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '@fontsource/roboto/400.css';  // Regular weight
import '@fontsource/roboto/700.css';  // Bold weight
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
