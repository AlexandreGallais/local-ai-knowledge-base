---
title: "ResizeObserverEntry"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserverentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserverEntry

The **`ResizeObserverEntry`** interface represents the object passed to the `ResizeObserver()` constructor's callback function, which allows you to access the new dimensions of the `Element` or `SVGElement` being observed.

## Instance properties

- `ResizeObserverEntry.borderBoxSize` (read-only)
    An array of objects containing the new border box size of the observed element when the callback is run.
- `ResizeObserverEntry.contentBoxSize` (read-only)
    An array of objects containing the new content box size of the observed element when the callback is run.
- `ResizeObserverEntry.devicePixelContentBoxSize` (read-only)
    An array of objects containing the new content box size in device pixels of the observed element when the callback is run.
- `ResizeObserverEntry.contentRect` (read-only)
    A `DOMRectReadOnly` object containing the new size of the observed element when the callback is run. Note that this is now a legacy property that is retained in the spec for backward-compatibility reasons only.
- `ResizeObserverEntry.target` (read-only)
    A reference to the `Element` or `SVGElement` being observed.

> **Note:**
> The content box is the box in which content can be placed, meaning the border box minus the padding and border width. The border box encompasses the content, padding, and border. See The box model for further explanation.

## Instance methods

None.

## Examples

The following snippet is taken from the resize-observer-text.html (see source) example.

Note that the code covers three different compatibility cases:

- Some old browsers may support `contentRect` but not `contentBoxSize`.
- Old versions of Firefox support `contentBoxSize`, but incorrectly implemented it as a single object rather than an array.
- Modern browsers support `contentBoxSize` as an array of objects, to enable them to report box sizes for fragmented elements (for example, in a multi-column scenario).

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      // The standard makes contentBoxSize an array...
      if (entry.contentBoxSize[0]) {
        h1Elem.style.fontSize = `${Math.max(1.5, entry.contentBoxSize[0].inlineSize / 200)}rem`;
        pElem.style.fontSize = `${Math.max(1, entry.contentBoxSize[0].inlineSize / 600)}rem`;
      } else {
        // … but old versions of Firefox treat it as a single item
        h1Elem.style.fontSize = `${Math.max(1.5, entry.contentBoxSize.inlineSize / 200)}rem`;
        pElem.style.fontSize = `${Math.max(1, entry.contentBoxSize.inlineSize / 600)}rem`;
      }
    } else {
      h1Elem.style.fontSize = `${Math.max(1.5, entry.contentRect.width / 200)}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }
  console.log("Size changed");
});

resizeObserver.observe(divElem);
```
