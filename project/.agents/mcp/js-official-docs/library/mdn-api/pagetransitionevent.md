---
title: "PageTransitionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pagetransitionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PageTransitionEvent

The **`PageTransitionEvent`** event object is available inside handler functions for the `pageshow` and `pagehide` events, fired when a document is being loaded or unloaded.

## Constructor

- `PageTransitionEvent()`
    Creates a new `PageTransitionEvent` object.

## Instance properties

_This interface also inherits properties from its parent, `Event`._

- `PageTransitionEvent.persisted` (read-only)
    Indicates if the document is loading from a cache.

## Example

```js
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    alert("The page was cached by the browser");
  } else {
    alert("The page was NOT cached by the browser");
  }
});
```

## See also

- `pageshow` event
- `pagehide` event
