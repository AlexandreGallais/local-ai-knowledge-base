---
title: "ToggleEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/toggleevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ToggleEvent

The **`ToggleEvent`** interface represents an event that fires when a popover element is toggled between being shown and hidden.

This is the event object for the `beforetoggle` and `toggle` events, which fire on elements as follows:

- The `beforetoggle` event fires before popover or `<dialog>` elements are shown or hidden.
- The `toggle` event fires after popover, `<dialog>`, or `` elements are shown or hidden.

## Constructor

- `ToggleEvent()`
    Creates a `ToggleEvent` object.

## Instance properties

_This interface inherits properties from its parent, `Event`._

- `ToggleEvent.newState` (read-only)
    A string (either `"open"` or `"closed"`), representing the state the element is transitioning to.
- `ToggleEvent.oldState` (read-only)
    A string (either `"open"` or `"closed"`), representing the state the element is transitioning from.
- `ToggleEvent.source` (read-only)
    An `Element` object instance representing the HTML control that initiated the toggle.

## Examples

### Basic <example-value>

```js
const popover = document.getElementById("mypopover");

// …

popover.addEventListener("beforetoggle", (event) => {
  if (event.newState === "open") {
    console.log("Popover is being shown");
  } else {
    console.log("Popover is being hidden");
  }
});
```

## See also

- Popover API
- `beforetoggle` event
- `toggle` event
