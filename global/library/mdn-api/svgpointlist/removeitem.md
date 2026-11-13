---
title: "SVGPointList: removeItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpointlist/removeitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPointList: removeItem() method

The **`removeItem()`** method of the `SVGPointList` interface removes a `DOMPoint` from the list.

## Syntax

```js
removeItem(index)
```

### Parameters

- `index`
    The index of the item to remove.

### Return value

The removed `DOMPoint` object.

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the list is read-only.
- `IndexSizeError` `DOMException`
    Thrown if the index passed in is greater than the number of items in the list.

## Examples

The following example shows an SVG which contains a `<polyline>` with five coordinate pairs. The item at index `2` is removed.

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
console.log(example.points.removeItem(2));
```
