---
title: "ScreenDetailed: availLeft property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetailed/availleft/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetailed: availLeft property

The **`availLeft`** read-only property of the
`ScreenDetailed` interface is a number representing the x-coordinate (left-hand edge) of the available screen area inside the OS virtual screen arrangement, relative to the multi-screen origin.

This is equal to the `ScreenDetailed.left` property, plus the width of any OS UI element drawn on the left of the screen. Windows cannot be placed in those areas, so `availLeft` is useful for giving you the left boundary of the actual area available to open or place windows.

> **Note:**
> A non-standard implementation of the `availLeft` property is available on the `Screen` interface in all browsers. See the Non-standard example below for usage details, and see the `Screen` reference page for browser support information relating to the non-standard implementation.

## Value

A number.

## Examples

### Window Management API example

```js
// Available in browsers that support the Window Management API
const screenDetails = await window.getScreenDetails();

// Return the availLeft value of the first screen
const screen1AvailLeft = screenDetails.screens[0].availLeft;
```

### Non-standard example

```js
// Available in all browsers
// Return the availLeft value of the current screen
const screenAvailLeft = window.screen.availLeft;
```

## See also

- Window Management API
