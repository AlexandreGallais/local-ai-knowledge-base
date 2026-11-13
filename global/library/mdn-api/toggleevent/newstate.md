---
title: "ToggleEvent: newState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/toggleevent/newstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ToggleEvent: newState property

The **`newState`** read-only property of the `ToggleEvent` interface is a string representing the state the element is transitioning to.

## Value

A string. Possible values are `"open"` (the popover is being shown) or `"closed"` (the popover is being hidden).

## Examples

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
