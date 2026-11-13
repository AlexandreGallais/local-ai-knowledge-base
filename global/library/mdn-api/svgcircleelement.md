---
title: "SVGCircleElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgcircleelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGCircleElement

The **`SVGCircleElement`** interface is an interface for the `<circle>` element.

## Instance properties

_This interface also inherits properties from its parent, `SVGGeometryElement`._

- `SVGCircleElement.cx` (read-only)
    This property defines the x-coordinate of the center of the `<circle>` element. It is denoted by the `cx` attribute of the element.
- `SVGCircleElement.cy` (read-only)
    This property defines the y-coordinate of the center of the `<circle>` element. It is denoted by the `cy` attribute of the element.
- `SVGCircleElement.r` (read-only)
    This property defines the radius of the `<circle>` element. It is denoted by the `r` of the element.

## Instance methods

_Inherits methods from its parent interface, `SVGGeometryElement`._

## Examples

### Resizing a circle

In this example we draw a circle and randomly increase or decrease its radius when you click it.

#### HTML

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 250 250"
  width="250"
  height="250">
  <circle cx="100" cy="100" r="50" fill="gold" id="circle" />
</svg>
```

#### JavaScript

```js
const circle = document.getElementById("circle");

function clickCircle() {
  // Randomly determine if the circle radius will increase or decrease
  const change = Math.random() > 0.5 ? 10 : -10;
  // Clamp the circle radius to a minimum of 10 and a maximum of 250,
  // so it won't disappear or get bigger than the viewport
  const newValue = Math.min(Math.max(circle.r.baseVal.value + change, 10), 250);
  circle.setAttribute("r", newValue);
}

circle.addEventListener("click", clickCircle);
```

## See also

- `<circle>` SVG element
