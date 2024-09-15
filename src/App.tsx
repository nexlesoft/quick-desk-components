import { Support } from "../lib/main";

import "./App.css";

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
