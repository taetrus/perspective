import React from "react";
import InteractiveRangeSlider from "./InteractiveRangeSlider";

const App: React.FC = () => {
  const regions = [
    { start: 1000, end: 4000, color: "#FFB3BA" },
    { start: 4000, end: 7000, color: "#BAFFC9" },
    { start: 7000, end: 20000, color: "#BAE1FF" },
  ];

  return (
    <div style={{ padding: "16px", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Interactive Range Slider</h1>
      <InteractiveRangeSlider
        min={100}
        max={20000}
        lineThickness={4}
        majorStep={5000}
        minorStep={1000}
        regions={regions}
        increment={25}
        tolerance={20} // Custom tolerance of 200 units
      />
    </div>
  );
};

export default App;
