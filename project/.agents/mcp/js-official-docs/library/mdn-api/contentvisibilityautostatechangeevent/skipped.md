---
title: "ContentVisibilityAutoStateChangeEvent: skipped property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentvisibilityautostatechangeevent/skipped/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentVisibilityAutoStateChangeEvent: skipped property

The `skipped` read-only property of the `ContentVisibilityAutoStateChangeEvent` interface returns `true` if the user agent skips the element's contents, or `false` otherwise.

## Value

A boolean. Returns `true` if the user agent skips the element's contents, or `false` otherwise.

## Examples

```js
const canvasElem = document.querySelector("canvas");

canvasElem.addEventListener("contentvisibilityautostatechange", stateChanged);
canvasElem.style.contentVisibility = "auto";

function stateChanged(event) {
  if (event.skipped) {
    stopCanvasUpdates(canvasElem);
  } else {
    startCanvasUpdates(canvasElem);
  }
}

// Call this when the canvas updates need to start.
function startCanvasUpdates(canvas) {
  // …
}

// Call this when the canvas updates need to stop.
function stopCanvasUpdates(canvas) {
  // …
}
```

## See also

- The `contentvisibilityautostatechange` event
- CSS Containment
- The `content-visibility` property
- The `contain` property
