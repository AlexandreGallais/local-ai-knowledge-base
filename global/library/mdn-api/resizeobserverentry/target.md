---
title: "ResizeObserverEntry: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserverentry/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserverEntry: target property

The **`target`** read-only property of the
`ResizeObserverEntry` interface returns a reference to the
`Element` or `SVGElement` that is being observed.

## Value

An `Element` or `SVGElement` representing the element being
observed.

## Examples

The following snippet is taken from the resize-observer-border-radius.html
(see source) example. This example includes a green box, sized as a percentage of the
viewport size. When the viewport size is changed, the box's rounded corners change in
proportion to the size of the box. We could just implement this using
`border-radius` with a percentage, but that quickly leads to ugly-looking
elliptical corners; this solution gives you nice square corners that scale with the box
size.

To grab a reference to the observed element so we can update its
`border-radius` value after each change, we make use of the
`target` property of each entry —
`entry.target.style.borderRadius`.

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      entry.target.style.borderRadius = `${Math.min(
        100,
        entry.contentBoxSize.inlineSize / 10 +
          entry.contentBoxSize.blockSize / 10,
      )}px`;
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
