---
title: "ContentVisibilityAutoStateChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentvisibilityautostatechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentVisibilityAutoStateChangeEvent

The **`ContentVisibilityAutoStateChangeEvent`** interface is the event object for the `contentvisibilityautostatechange` event, which fires on any element with `content-visibility: auto` set on it when it starts or stops being relevant to the user and skipping its contents.

While the element is not relevant (between the start and end events), the user agent skips an element's rendering, including layout and painting.
This can significantly improve page rendering speed.
The `contentvisibilityautostatechange` event provides a way for an app's code to also start or stop rendering processes (e.g., drawing on a `<canvas>`) when they are not needed, thereby conserving processing power.

Note that even when hidden from view, element contents will remain semantically relevant (e.g., to assistive technology users), so this signal should not be used to skip significant semantic DOM updates.

## Constructor

- `ContentVisibilityAutoStateChangeEvent()`
    Creates a new `ContentVisibilityAutoStateChangeEvent` object instance.

## Instance properties

_Inherits properties from its parent, `Event`._

- `skipped` (read-only)
    Returns `true` if the user agent is skipping the element's rendering, or `false` otherwise.

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
