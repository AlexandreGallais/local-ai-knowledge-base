---
title: "SVGPointList: appendItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpointlist/appenditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPointList: appendItem() method

The **`appendItem()`** method of the `SVGPointList` interface adds a `DOMPoint` to the end of the list.

## Syntax

```js
appendItem(obj)
```

### Parameters

- `obj`
    A `DOMPoint` object containing the coordinates of the point to be appended.

### Return value

The `DOMPoint` object that was appended.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the list is read-only.

## Examples

The following example shows an SVG which contains a `<polyline>` with five coordinate pairs. A new `DOMPoint` is created, and appended to the list.

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
console.log(example.points.appendItem(point));
```
