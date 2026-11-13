---
title: "SVGPointList: getItem() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpointlist/getitem/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPointList: getItem() method

The **`getItem()`** method of the `SVGPointList` interface gets one item from the list at the specified index.

## Syntax

```js
getItem(index)
```

### Parameters

- `index`
    The index of the item to return.

### Return value

A `DOMPoint` object.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if the index passed in is greater than the number of items in the list.

## Examples

The following example shows an SVG which contains a `<polyline>` with five coordinate pairs. The `DOMPoint` at index `0`.

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
console.log(example.points.getItem(0));
```
