---
title: "ScreenDetailed: devicePixelRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetailed/devicepixelratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetailed: devicePixelRatio property

The **`devicePixelRatio`** read-only property of the
`ScreenDetailed` interface is a number representing the screen's device pixel ratio.

This is the same as the value returned by `Window.devicePixelRatio`, except that `Window.devicePixelRatio`:

- always returns the device pixel ratio for the `current screen`.
- also includes scaling of the window itself, i.e., page zoom (at least on some browser implementations).

## Value

A number.

## Examples

```js
const screenDetails = await window.getScreenDetails();

// Return the device pixel ratio of the first screen
const screen1DPR = screenDetails.screens[0].devicePixelRatio;
```

## See also

- Window Management API
