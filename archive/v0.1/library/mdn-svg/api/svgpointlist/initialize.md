---
title: "SVGPointList: initialize() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpointlist/initialize/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPointList: initialize() method

The **`initialize()`** method of the `SVGPointList` interface clears the list then adds a single new `DOMPoint` object to the list.

## Syntax

```js
initialize(obj)
```

### Parameters

- `obj`
    A `DOMPoint` object containing the coordinates of the point to be added when the list is initialized.

### Return value

The added `DOMPoint` object.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the list is read-only.

## Examples

The following example shows an SVG which contains a `<polyline>` with five coordinate pairs. Returning `SVGPointList.length` gives the value `5`. After calling `initialize()`, returning `SVGPointList.length` gives the value `1`.

```html
<svg id="svg" viewBox="-10 -10 120 120" xmlns="http://www.w3.org/2000/svg">
  <polyline
    id="example"
    stroke="black"
    fill="none"
    points="50,0 21,90 98,35 2,35 79,90" />
</svg>
```

```js
const example = document.getElementById("example");
console.log(example.points.length); // 5;
const point = document.getElementById("svg").createSVGPoint();
example.points.initialize(point);
console.log(example.points.length); // 1
```
