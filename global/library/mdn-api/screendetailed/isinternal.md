---
title: "ScreenDetailed: isInternal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetailed/isinternal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetailed: isInternal property

The **`isInternal`** read-only property of the
`ScreenDetailed` interface is a boolean indicating whether the screen is internal to the device or external. External devices are generally manufactured separately from the device they are attached to and can be connected and disconnected as needed, whereas internal screens are part of the device and not intended to be disconnected.

## Value

A boolean value — `true` if the screen is internal, and `false` if it is external.

## Examples

```js
const screenDetails = await window.getScreenDetails();

// Is the first screen internal?
const screen1Internal = screenDetails.screens[0].isInternal;
```

## See also

- Window Management API
