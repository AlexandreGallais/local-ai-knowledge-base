---
title: "DOMRectList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domrectlist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMRectList: item() method

The `DOMRectList` method
`item()` returns the `DOMRect` at the specified index within the list, or `null` if the index is out of range.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    A zero-based integer representing the position of the `DOMRect` in the `DOMRectList` to retrieve.

### Return value

A `DOMRect` object at the specified index in the `DOMRectList`, or null if index is greater than or equal to the number of rectangles in the list.

## Example

```js
const rects = document.getElementById("rects").getClientRects();
console.log(rects.length); // Number of rectangles in the DOMRectList

if (rects.length > 0) {
  console.log(rects.item(0)); // Logs the first DOMRect object
}
```
