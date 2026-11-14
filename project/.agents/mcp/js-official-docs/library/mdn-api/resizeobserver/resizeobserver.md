---
title: "ResizeObserver: ResizeObserver() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserver/resizeobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserver: ResizeObserver() constructor

The **`ResizeObserver`** constructor creates a
new `ResizeObserver` object, which can be used to report changes to the
content or border box of an `Element` or the bounding box of an
`SVGElement`.

## Syntax

```js
new ResizeObserver(callback)
```

### Parameters

- `callback`
    The function called whenever an observed resize occurs. The function is called with
    two parameters:
    - `entries`
        An array of `ResizeObserverEntry` objects that can be used to
        access the new dimensions of the element after each change.
    - `observer`
        A reference to the `ResizeObserver` itself, so it will definitely be
        accessible from inside the callback, should you need it. This could be used for
        example to automatically unobserve the observer when a certain condition is
        reached, but you can omit it if you don't need it.

    The callback will generally follow a pattern along the lines of:

    ```js
    function callback(entries, observer) {
      for (const entry of entries) {
        // Do something to each entry
        // and possibly something to the observer itself
      }
    }
    ```

## Examples

The following snippet is taken from the resize-observer-text.html
(see source) example:

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      if (entry.contentBoxSize[0]) {
        h1Elem.style.fontSize = `${Math.max(
          1.5,
          entry.contentBoxSize[0].inlineSize / 200,
        )}rem`;
        pElem.style.fontSize = `${Math.max(
          1,
          entry.contentBoxSize[0].inlineSize / 600,
        )}rem`;
      } else {
        // legacy path
        h1Elem.style.fontSize = `${Math.max(
          1.5,
          entry.contentBoxSize.inlineSize / 200,
        )}rem`;
        pElem.style.fontSize = `${Math.max(
          1,
          entry.contentBoxSize.inlineSize / 600,
        )}rem`;
      }
    } else {
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        entry.contentRect.width / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }
  console.log("Size changed");
});

resizeObserver.observe(divElem);
```
