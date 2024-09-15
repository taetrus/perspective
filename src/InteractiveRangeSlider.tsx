/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

interface Region {
  start: number;
  end: number;
  color: string;
}

interface InteractiveRangeSliderProps {
  min?: number;
  max?: number;
  lineThickness?: number;
  majorStep?: number;
  minorStep?: number;
  regions?: Region[];
  increment?: number;
  tolerance?: number;
}

export interface InteractiveRangeSliderHandle {
  addPoint: (point: number) => void;
  removePoint: (point: number) => void;
}

const InteractiveRangeSlider = forwardRef<InteractiveRangeSliderHandle, InteractiveRangeSliderProps>(
  (
    {
      min = 100,
      max = 20000,
      lineThickness = 4,
      majorStep = 5000,
      minorStep = 1000,
      regions = [],
      increment = 25,
      tolerance = 100,
    },
    ref
  ) => {
    const [value, setValue] = useState<number>(min);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<number>(0);
    const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      addPoint: (point: number) => {
        if (point >= min && point <= max && !selectedPoints.includes(point)) {
          setSelectedPoints((prev) => [...prev, point].sort((a, b) => a - b));
        }
      },
      removePoint: (point: number) => {
        setSelectedPoints((prev) => prev.filter((p) => p !== point));
      },
    }));

    const getRegionForValue = (val: number): Region | null => {
      return regions.find((region) => val >= region.start && val <= region.end) || null;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(Math.max(x / rect.width, 0), 1);
      const rawValue = percentage * (max - min) + min;
      const newValue = Math.round(rawValue / increment) * increment;

      const region = getRegionForValue(newValue);
      if (region) {
        setValue(Math.max(region.start, Math.min(region.end, newValue)));
      } else {
        setValue(newValue);
      }

      setTooltipPosition(x);
    };

    const handleClick = () => {
      if (!showTooltip) return; // Prevent marking when not hovering

      // Check if there's a nearby point to unmark
      const nearbyPoint = selectedPoints.find((point) => Math.abs(point - value) <= tolerance);

      if (nearbyPoint) {
        // Unmark the nearby point
        setSelectedPoints(selectedPoints.filter((point) => point !== nearbyPoint));
      } else {
        // Mark a new point
        setSelectedPoints([...selectedPoints, value].sort((a, b) => a - b));
      }
    };

    const handlePopupClick = (point: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedPoints(selectedPoints.filter((p) => p !== point));
    };

    const generateTickMarks = (): JSX.Element[] => {
      const ticks: JSX.Element[] = [];
      for (let i = min; i <= max; i += minorStep) {
        const isMajor = (i - min) % majorStep === 0;
        ticks.push(
          <div key={i}>
            <div
              style={{
                position: "absolute",
                left: `${((i - min) / (max - min)) * 100}%`,
                bottom: "0",
                width: "2px",
                height: isMajor ? "12px" : "8px",
                backgroundColor: isMajor ? "#6b7280" : "#d1d5db",
                transform: "translateX(-50%)",
              }}
            />
            {isMajor && (
              <div
                style={{
                  position: "absolute",
                  left: `${((i - min) / (max - min)) * 100}%`,
                  bottom: "-20px",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                {i}
              </div>
            )}
          </div>
        );
      }
      return ticks;
    };

    const renderRegions = (): JSX.Element[] => {
      return regions.map((region, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "0",
            left: `${((region.start - min) / (max - min)) * 100}%`,
            width: `${((region.end - region.start) / (max - min)) * 100}%`,
            height: "100%",
            backgroundColor: region.color,
          }}
        />
      ));
    };

    return (
      <div
        style={{
          width: "100%",
          padding: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "calc(100% -40px)",
            height: "75px",
            // marginBottom: "20px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <div
            ref={sliderRef}
            style={{
              position: "absolute",
              bottom: "20px",
              width: "100%",
              height: "32px",
              backgroundColor: "#e5e7eb",
              borderRadius: "9999px",
              cursor: showTooltip ? "pointer" : "default",
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          >
            {renderRegions()}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                width: `${((value - min) / (max - min)) * 100}%`,
                height: `${lineThickness}px`,
                backgroundColor: "#3b82f6",
                borderRadius: "9999px",
                transform: "translateY(-50%)",
              }}
            />
            {generateTickMarks()}
            {selectedPoints.map((point, index) => (
              <div key={point}>
                <div
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    left: `${((point - min) / (max - min)) * 100}%`,
                    top: "50%",
                  }}
                />
                <div
                  className="popup"
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    left: `${((point - min) / (max - min)) * 100}%`,
                    transform: "translateX(-50%)",
                    padding: "4px 8px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handlePopupClick(point, e)}
                >
                  {point}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: `${((point - min) / (max - min)) * 100}%`,
                    width: "1px",
                    height: "24px",
                    backgroundColor: "#6b7280",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
          {showTooltip && !selectedPoints.includes(value) && (
            <div
              className="popup"
              style={{
                position: "absolute",
                bottom: "60px",
                left: tooltipPosition,
                transform: "translateX(-50%)",
                padding: "4px 8px",
                backgroundColor: "#3b82f6",
                color: "white",
                fontSize: "12px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default InteractiveRangeSlider;
