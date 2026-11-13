---
title: "SVGGraphicsElement: getCTM() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svggraphicselement/getctm/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGGraphicsElement: getCTM() method

The `getCTM()` method of the `SVGGraphicsElement` interface represents the matrix that transforms the current element's coordinate system to its SVG viewport's coordinate system.

## Syntax

```js
getCTM()
```

### Parameters

None.

### Return value

A `DOMMatrix` object.

## Examples

### Getting the Transformation Matrix

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <!-- Circle transformed using translation -->
  <circle
    id="circle"
    cx="50"
    cy="50"
    r="30"
    fill="blue"
    transform="translate(100, 150)" />
</svg>
```

```js
const circle = document.getElementById("circle");

// Get the current transformation matrix
const ctm = circle.getCTM();

console.log("Matrix values:");
console.log(
  `a: ${ctm.a}, b: ${ctm.b}, c: ${ctm.c}, d: ${ctm.d}, e: ${ctm.e}, f: ${ctm.f}`,
);
// Output: Matrix values: a: 1, b: 0, c: 0, d: 1, e: 100, f: 150
```
