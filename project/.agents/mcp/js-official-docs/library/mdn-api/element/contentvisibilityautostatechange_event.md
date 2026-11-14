---
title: "Element: contentvisibilityautostatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/contentvisibilityautostatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: contentvisibilityautostatechange event

The **`contentvisibilityautostatechange`** event fires on any element with `content-visibility: auto` set on it when it starts or stops being relevant to the user and skipping its contents.

While the element is not relevant (between the start and end events), the user agent skips an element's rendering, including layout and painting, which can significantly improve page rendering speed.
The `contentvisibilityautostatechange` event provides a way for an app's code to also start or stop rendering processes (e.g., drawing on a `<canvas>`) when they are not needed, thereby conserving processing power.

Note that even when hidden from view, element contents will remain semantically relevant (e.g., to assistive technology users), so this signal should not be used to skip significant semantic DOM updates.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("contentvisibilityautostatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncontentvisibilityautostatechange = (event) => { }
```

## Event type

A `ContentVisibilityAutoStateChangeEvent`.

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

- `ContentVisibilityAutoStateChangeEvent`
- CSS Containment
- The `content-visibility` property
- The `contain` property
