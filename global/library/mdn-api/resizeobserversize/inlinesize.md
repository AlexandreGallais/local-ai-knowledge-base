---
title: "ResizeObserverSize: inlineSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserversize/inlinesize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserverSize: inlineSize property

The **`inlineSize`** read-only property of the `ResizeObserverSize` interface returns the length of the observed element's border box in the inline dimension. For boxes with a horizontal `writing-mode`, this is the horizontal dimension, or width; if the writing-mode is vertical, this is the vertical dimension, or height.

> **Note:**
> For more explanation of writing modes and block and inline dimensions, read Handling different text directions.

## Value

A decimal representing the inline size in pixels.

## Examples

In this example we return an array of sizing information with `ResizeObserverEntry.contentBoxSize`. The `inlineSize` property returns the inline dimension size of the observed element.

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const elemSize = entry.contentBoxSize[0];
    console.log(elemSize.inlineSize); // a decimal
  }
});

resizeObserver.observe(divElem);
```
