import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Configuration } from "@nexle-soft/quick-desk-client";

import App from "./App.tsx";

Configuration.getInstance({
  host: "https://be.quickdesk.demo.nexlesoft.com/api/v1",
  secretKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbk5hbWUiOiJCZWFIdWIiLCJhcHBsaWNhdGlvbklkIjo3LCJ1c2VySWQiOjEsImlhdCI6MTcyNDkyNTQyNn0.8qvPyuDJr1OQEY1iicsxzFF9rzFdFMbiXlbZxNzzeMM",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
