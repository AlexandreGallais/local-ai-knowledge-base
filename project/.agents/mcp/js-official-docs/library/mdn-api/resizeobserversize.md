---
title: "ResizeObserverSize"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserversize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserverSize

The **`ResizeObserverSize`** interface of the Resize Observer API is used by the `ResizeObserverEntry` interface to access the box sizing properties of the element being observed.

> **Note:**
> In multi-column layout, which is a fragmented context, the sizing returned by `ResizeObserverSize` will be the size of the first column.

## Instance properties

- `ResizeObserverSize.blockSize` (read-only)
    The length of the observed element's border box in the block dimension. For boxes with a horizontal `writing-mode`, this is the vertical dimension, or height; if the writing-mode is vertical, this is the horizontal dimension, or width.
- `ResizeObserverSize.inlineSize` (read-only)
    The length of the observed element's border box in the inline dimension. For boxes with a horizontal `writing-mode`, this is the horizontal dimension, or width; if the writing-mode is vertical, this is the vertical dimension, or height.

> **Note:**
> For more explanation of writing modes and block and inline dimensions, read Handling different text directions.

## Examples

In this example the `ResizeObserverEntry.contentBoxSize` property returns a `ResizeObserverSize` object. This is an array containing the sizing information for the content box of the observed element.

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentBoxSize[0]); // a ResizeObserverSize
  }
});

resizeObserver.observe(divElem);
```
