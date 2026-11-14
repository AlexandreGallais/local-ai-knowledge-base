---
title: "Element: fullscreenerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/fullscreenerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: fullscreenerror event

The **`fullscreenerror`** event is fired when the browser cannot switch to fullscreen mode.

As with the `fullscreenchange` event, two `fullscreenerror` events are fired; the first is sent to the `Element` which failed to change modes, and the second is sent to the `Document` which owns that element.

For some reasons that switching into fullscreen mode might fail, see the guide to the Fullscreen API.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("fullscreenerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onfullscreenerror = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
const requestor = document.querySelector("div");

function handleError(event) {
  console.error("an error occurred changing into fullscreen");
  console.log(event);
}

requestor.addEventListener("fullscreenerror", handleError);
// Or (but note that this replaces other event listeners
// added using onfullscreenerror, if any)
requestor.onfullscreenerror = handleError;

requestor.requestFullscreen();
```

## See also

- `fullscreenchange`
- Fullscreen API
- Guide to the Fullscreen API
