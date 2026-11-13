---
title: "SVGPointList: clear() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpointlist/clear/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPointList: clear() method

The **`clear()`** method of the `SVGPointList` interface removes all items from the list.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the list is read-only.

## Examples

The following example shows an SVG which contains a `<polyline>` with five coordinate pairs. Calling `clear()` empties the list. Therefore the polyline no longer displays in the SVG.

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
let example = document.getElementById("example");
example.points.clear();
```
