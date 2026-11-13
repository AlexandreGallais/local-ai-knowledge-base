---
title: "ResizeObserverSize: blockSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserversize/blocksize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserverSize: blockSize property

The **`blockSize`** read-only property of the `ResizeObserverSize` interface returns the length of the observed element's border box in the block dimension. For boxes with a horizontal `writing-mode`, this is the vertical dimension, or height; if the writing-mode is vertical, this is the horizontal dimension, or width.

> **Note:**
> For more explanation of writing modes and block and inline dimensions, read Handling different text directions.

## Value

A decimal representing the block size in pixels.

## Examples

In this example we return an array of sizing information with `ResizeObserverEntry.contentBoxSize`. The `blockSize` property returns the block dimension size of the observed element.

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const elemSize = entry.contentBoxSize[0];
    console.log(elemSize.blockSize); // a decimal
  }
});

resizeObserver.observe(divElem);
```
