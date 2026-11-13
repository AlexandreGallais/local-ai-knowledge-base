---
title: "Document: exitFullscreen() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/exitfullscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: exitFullscreen() method

The `Document` method
**`exitFullscreen()`** requests that the element on this
document which is currently being presented in fullscreen mode be taken out of
fullscreen mode, restoring the previous state of the screen. This usually
reverses the effects of a previous call to `Element.requestFullscreen()`.

## Syntax

```js
exitFullscreen()
```

### Parameters

None.

### Return value

A `Promise` which is resolved once the user agent has
finished exiting fullscreen mode. If an error occurs while attempting to exit
fullscreen mode, the `catch()` handler for the promise is called.

## Examples

This example causes the current document to toggle in and out of a fullscreen
presentation whenever the mouse button is clicked within it.

```js
document.onclick = (event) => {
  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .then(() => console.log("Document Exited from Full screen mode"))
      .catch((err) => console.error(err));
  } else {
    document.documentElement.requestFullscreen();
  }
};
```

> **Note:**
> For a more complete example, see the
> `Element.requestFullscreen()` examples.

## See also

- Fullscreen API
- Guide to the Fullscreen API
- `Element.requestFullscreen()`
- `Document.fullscreenElement`
- `:fullscreen` and `::backdrop`
- The `` `allowfullscreen`
  attribute
