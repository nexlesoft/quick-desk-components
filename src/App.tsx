import { Configuration } from "@nexle-soft/quick-desk-client";
import { Support } from "../lib/main";

import "./App.css";

Configuration.getInstance({
  host: "https://be.quickdesk.demo.nexlesoft.com/api/v1",
  secretKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbk5hbWUiOiJCZWFIdWIiLCJhcHBsaWNhdGlvbklkIjo3LCJ1c2VySWQiOjEsImlhdCI6MTcyNDkyNTQyNn0.8qvPyuDJr1OQEY1iicsxzFF9rzFdFMbiXlbZxNzzeMM",
});

function App() {
  return (
    <>
      <div>Test library</div>

      <div className="card">
        <Support
          onClickCreateSupport={() => console.log("Click ticket")}
          onClickToDetail={() => console.log("Click to detail")}
        />
      </div>
    </>
  );
}

export default App;
