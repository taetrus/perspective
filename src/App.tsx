import React from "react";
import ParentComponent from "./ParentComponent";

const App: React.FC = () => {
  return (
    <div style={{ padding: "16px", fontFamily: "monospace" }}>
      <ParentComponent></ParentComponent>
    </div>
  );
};

export default App;
