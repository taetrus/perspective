# Interactive Range Slider

The Interactive Range Slider is a customizable React component that allows users to select values within a specified range. It supports multiple colored regions, custom increments, and the ability to mark and unmark specific points along the slider.

## Features

- Customizable min and max values
- Support for multiple colored regions
- Configurable major and minor tick marks
- Adjustable increment for value selection
- Hover tooltip showing current value
- Ability to mark and unmark points on the slider
- Configurable tolerance for unmarking points

## Installation

To use the Interactive Range Slider in your React project, copy the `InteractiveRangeSlider.tsx` file into your project's component directory.

## Usage

Import the component in your React file:

```jsx
import InteractiveRangeSlider from "./path/to/InteractiveRangeSlider";
```

Then, use it in your JSX:

```jsx
const App = () => {
  const regions = [
    { start: 100, end: 2500, color: '#FFB3BA' },
    { start: 2500, end: 7500, color: '#BAFFC9' },
    { start: 7500, end: 20000, color: '#BAE1FF' }
  ];

  return (

      Interactive Range Slider Demo


  );
};
```

## Props

The Interactive Range Slider accepts the following props:

|
Prop
|
Type
|
Default
|
Description
|
|

---

## |

## |

## |

|
|
min
|
number
|
100
|
The minimum value of the slider
|
|
max
|
number
|
20000
|
The maximum value of the slider
|
|
lineThickness
|
number
|
4
|
The thickness of the slider line
|
|
majorStep
|
number
|
5000
|
The interval for major tick marks
|
|
minorStep
|
number
|
1000
|
The interval for minor tick marks
|
|
regions
|
Region[]
|
[]
|
An array of colored regions on the slider
|
|
increment
|
number
|
25
|
The step size for value selection
|
|
tolerance
|
number
|
100
|
The tolerance (in units) for unmarking points
|

### Region Object

Each region in the `regions` array should be an object with the following properties:

```typescript
interface Region {
  start: number;
  end: number;
  color: string;
}
```

## Functionality

- **Hover**: When hovering over the slider, a tooltip displays the current value.
- **Marking Points**: Click on the slider to mark a point. The point will be displayed with a red dot and a popup showing its value.
- **Unmarking Points**: Click on or near a marked point (within the specified tolerance) to unmark it.
- **Regions**: The slider can display multiple colored regions to visually separate different ranges.

## Customization

You can customize the appearance of the slider by modifying the inline styles in the component. Future versions may support more extensive theming options.

## Dependencies

This component is built with React and TypeScript. It does not require any additional dependencies.
