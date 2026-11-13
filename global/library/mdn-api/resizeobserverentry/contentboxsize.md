---
title: "ResizeObserverEntry: contentBoxSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserverentry/contentboxsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserverEntry: contentBoxSize property

The **`contentBoxSize`** read-only property of
the `ResizeObserverEntry` interface returns an array containing the new
content box size of the observed element when the callback is run.

## Value

An array containing objects with the new content box size of the observed element.
The array is necessary to support elements that have multiple fragments, which occur in multi-column scenarios. Each object in the array contains two properties:

- `blockSize`
    The length of the observed element's content box in the block dimension. For boxes
    with a horizontal `writing-mode`, this is the vertical dimension, or
    height; if the writing-mode is vertical, this is the horizontal dimension, or width.
- `inlineSize`
    The length of the observed element's content box in the inline dimension. For boxes
    with a horizontal `writing-mode`, this is the horizontal dimension, or
    width; if the writing-mode is vertical, this is the vertical dimension, or height.

> **Note:**
> For more explanation of writing modes and block and inline
> dimensions, read Handling different text directions.

## Examples

The following snippet is taken from the resize-observer-border-radius.html
(see source) example. This example includes a green box, sized as a percentage of the
viewport size. When the viewport size is changed, the box's rounded corners change in
proportion to the size of the box. We could just implement this using
`border-radius` with a percentage, but that quickly leads to ugly-looking
elliptical corners; this solution gives you nice square corners that scale with the box
size.

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      // The standard makes contentBoxSize an array...
      if (entry.contentBoxSize[0]) {
        entry.target.style.borderRadius = `${Math.min(
          100,
          entry.contentBoxSize[0].inlineSize / 10 +
            entry.contentBoxSize[0].blockSize / 10,
        )}px`;
      } else {
        // … but old versions of Firefox treat it as a single item
        entry.target.style.borderRadius = `${Math.min(
          100,
          entry.contentBoxSize.inlineSize / 10 +
            entry.contentBoxSize.blockSize / 10,
        )}px`;
      }
    } else {
      entry.target.style.borderRadius = `${Math.min(
        100,
        entry.contentRect.width / 10 + entry.contentRect.height / 10,
      )}px`;
    }
  }
});

resizeObserver.observe(document.querySelector("div"));
```
