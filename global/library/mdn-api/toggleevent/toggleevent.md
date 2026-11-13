---
title: "ToggleEvent: ToggleEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/toggleevent/toggleevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ToggleEvent: ToggleEvent() constructor

The **`ToggleEvent()`** constructor creates a new `ToggleEvent` object.

## Syntax

```js
new ToggleEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `ToggleEvent` this is always `beforetoggle` or `toggle`.
- `init` (optional)
    An object containing the following properties:
    - `newState` (optional)
        A string representing the state the element is transitioning to. Can be any value, but events fired by the browser set this to `"open"` or `"closed"`. Defaults to `""`.
    - `oldState` (optional)
        A string representing the state the element is transitioning from. Can be any value, but events fired by the browser set this to `"open"` or `"closed"`. Defaults to `""`.
    - `source` (optional)
        An `Element` representing the HTML popover control element that initiated the toggle. Defaults to `null`.

## Examples

A developer would not use this constructor manually. A new `ToggleEvent` object is constructed when a handler is invoked as a result of a relevant event firing.

For example:

```js
const popover = document.getElementById("mypopover");

// …

popover.addEventListener("beforetoggle", (event) => {
  if (event.newState === "open") {
    console.log("Popover is being shown");
    if (event.source) {
      console.log("Initiated by:", event.source);
    }
  } else {
    console.log("Popover is being hidden");
  }
});
```

## See also

- Popover API
