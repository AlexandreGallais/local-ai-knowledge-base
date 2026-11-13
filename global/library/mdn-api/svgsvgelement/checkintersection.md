---
title: "SVGSVGElement: checkIntersection() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/checkintersection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: checkIntersection() method

The `checkIntersection()` method of the `SVGSVGElement` interface checks if the rendered content of the given element intersects the supplied rectangle.

Each candidate graphics element is to be considered a match only if the same graphics element can be a target of pointer events as defined in `pointer-events` processing.

## Syntax

```js
checkIntersection(element, rect)
```

### Parameters

- `element`
    An `Element` representing the SVG graphics element to check.
- `rect`
    An `SVGRect` object that defines the rectangle to check against.

### Return value

A boolean.

## Examples

### Checking if an Element Intersects a Rectangle

```html
<svg id="exampleSVG" width="200" height="200">
  <rect
    id="checkRect"
    x="10"
    y="10"
    width="100"
    height="100"
    fill="none"
    stroke="red" />
  <circle id="targetElement" cx="80" cy="80" r="50" fill="blue" />
</svg>
<button id="checkIntersectionBtn">Check Intersection</button>
<pre id="result"></pre>
```

```js
const svgElement = document.getElementById("exampleSVG");
const checkRect = document.getElementById("checkRect");
const targetElement = document.getElementById("targetElement");
const resultDisplay = document.getElementById("result");

document
  .getElementById("checkIntersectionBtn")
  .addEventListener("click", () => {
    const rect = svgElement.createSVGRect();
    rect.x = checkRect.x.baseVal.value;
    rect.y = checkRect.y.baseVal.value;
    rect.width = checkRect.width.baseVal.value;
    rect.height = checkRect.height.baseVal.value;

    const isIntersecting = svgElement.checkIntersection(targetElement, rect);
    resultDisplay.textContent = `Does the circle intersect with the rectangle? ${isIntersecting}`;
  });
```

## See also

- `SVGSVGElement.checkEnclosure()`
