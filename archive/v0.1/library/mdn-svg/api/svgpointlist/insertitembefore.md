---
title: "SVGPointList: insertItemBefore() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpointlist/insertitembefore/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPointList: insertItemBefore() method

The **`insertItemBefore()`** method of the `SVGPointList` interface inserts a `DOMPoint` before another item in the list.

## Syntax

```js
insertItemBefore(obj, index)
```

### Parameters

- `obj`
    A `DOMPoint` object containing the coordinates of the point to be inserted.
- `index`
    The index of the item the object should be inserted before. If the index passed in is greater than the length of the list, then index will be set to the list length and the item inserted before the last item in the list.

### Return value

The `DOMPoint` object that was inserted.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the list is read-only.

## Examples

The following example shows an SVG which contains a `<polyline>` with five coordinate pairs. A new `DOMPoint` is created, and inserted before the point at index `2`.

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
const point = document.getElementById("svg").createSVGPoint();
point.y = 10;
point.x = 10;
console.log(example.points.insertItemBefore(point, 2));
```
