---
title: "ToggleEvent: oldState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/toggleevent/oldstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ToggleEvent: oldState property

The **`oldState`** read-only property of the `ToggleEvent` interface is a string representing the state the element is transitioning from.

## Value

A string. Possible values are `"open"` (the popover is going from showing to hidden) or `"closed"` (the popover going from hidden to shown).

## Examples

```js
const popover = document.getElementById("mypopover");

// …

popover.addEventListener("beforetoggle", (event) => {
  if (event.oldState === "open") {
    console.log("Popover is being hidden");
  } else {
    console.log("Popover is being shown");
  }
});
```

## See also

- Popover API
