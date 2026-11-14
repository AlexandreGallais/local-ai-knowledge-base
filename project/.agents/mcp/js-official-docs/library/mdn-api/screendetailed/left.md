---
title: "ScreenDetailed: left property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetailed/left/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetailed: left property

The **`left`** read-only property of the
`ScreenDetailed` interface is a number representing the x-coordinate (left-hand edge) of the total screen area inside the OS virtual screen arrangement, relative to the multi-screen origin.

This is equal to the true left-hand edge, ignoring any OS UI element drawn at the left of the screen. Windows cannot be placed in those areas; to get the left-hand coordinate of the screen area that windows can be placed in, use `ScreenDetailed.availLeft`.

> **Note:**
> In Firefox, a non-standard implementation of the `left` property is available on the `Screen` interface. See the Non-standard example below for usage details, and see the `Screen` reference page for browser support information relating to the non-standard implementation.

## Value

A number.

## Examples

### Window Management API example

```js
// Available in browsers that support the Window Management API
const screenDetails = await window.getScreenDetails();

// Return the absolute left value of the first screen
const screen1Left = screenDetails.screens[0].left;
```

### Non-standard example

```js
// Available in Firefox
// Return the absolute left value of the current screen
const screenLeft = window.screen.left;
```

## See also

- Window Management API
