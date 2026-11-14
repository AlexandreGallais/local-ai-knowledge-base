---
title: "class: Touchscreen"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-touchscreen.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Touchscreen
* since: v1.8

The Touchscreen class operates in main-frame CSS pixels relative to the top-left corner of the viewport. Methods on the
touchscreen can only be used in browser contexts that have been initialized with `hasTouch` set to true.

This class is limited to emulating tap gestures. For examples of other gestures simulated by manually dispatching touch events, see the emulating legacy touch events page.

## async method: Touchscreen.tap
* since: v1.8

Dispatches a `touchstart` and `touchend` event with a single touch at the position ([`param: x`],[`param: y`]).

:::note
[`method: Touchscreen.tap`] will throw if the [`option: Browser.newContext.hasTouch`] option of the browser context is false.
:::

### param: Touchscreen.tap.x
* since: v1.8
- `x` <[float]>

X coordinate relative to the main frame's viewport in CSS pixels.

### param: Touchscreen.tap.y
* since: v1.8
- `y` <[float]>

Y coordinate relative to the main frame's viewport in CSS pixels.
