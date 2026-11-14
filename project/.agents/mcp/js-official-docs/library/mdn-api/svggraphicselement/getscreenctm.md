---
title: "SVGGraphicsElement: getScreenCTM() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svggraphicselement/getscreenctm/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGGraphicsElement: getScreenCTM() method

The `getScreenCTM()` method of the `SVGGraphicsElement` interface represents the matrix that transforms the current element's coordinate system to the coordinate system of the SVG viewport for the SVG document fragment.

## Syntax

```js
getScreenCTM()
```

### Parameters

None.

### Return value

A `DOMMatrix` object.

## Examples

### Getting the Screen Transformation Matrix

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <!-- Circle with translation and scale -->
  <circle
    id="circle"
    cx="50"
    cy="50"
    r="30"
    fill="blue"
    transform="translate(100, 150) scale(2)" />
</svg>
```

```js
const circle = document.getElementById("circle");

// Get the current screen transformation matrix
const screenCTM = circle.getScreenCTM();

console.log("Screen transformation matrix:");
console.log(
  `a: ${screenCTM.a}, b: ${screenCTM.b}, c: ${screenCTM.c}, d: ${screenCTM.d}, e: ${screenCTM.e}, f: ${screenCTM.f}`,
);
// Output: a: 2, b: 0, c: 0, d: 2, e: 100, f: 150
```
