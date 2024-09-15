/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import InteractiveRangeSlider, { InteractiveRangeSliderHandle } from "./InteractiveRangeSlider";

const ParentComponent: React.FC = () => {
  const regions = [
    { start: 1000, end: 4000, color: "#FFB3BA" },
    { start: 4000, end: 7000, color: "#BAFFC9" },
    { start: 7000, end: 20000, color: "#BAE1FF" },
  ];

  const sliderRef = useRef<InteractiveRangeSliderHandle>(null);

  const handleAddPoint = () => {
    sliderRef.current?.addPoint(5000);
  };

  const handleRemovePoint = () => {
    sliderRef.current?.removePoint(5000);
  };

  return (
    <div>
      <InteractiveRangeSlider
        ref={sliderRef}
        min={100}
        max={20000}
        lineThickness={4}
        majorStep={5000}
        minorStep={1000}
        regions={regions}
        increment={25}
        tolerance={45} // Custom tolerance of 200 units
      />
      <button onClick={handleAddPoint}>Add Point at 5000</button>
      <button onClick={handleRemovePoint}>Remove Point at 5000</button>
    </div>
  );
};
export default ParentComponent;
