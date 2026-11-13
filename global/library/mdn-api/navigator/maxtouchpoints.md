---
title: "Navigator: maxTouchPoints property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/maxtouchpoints/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: maxTouchPoints property

The **`maxTouchPoints`** read-only property of the
`Navigator` interface returns the maximum number of simultaneous touch
contact points that are supported by the current device.

## Value

A number.

This value is hardware-dependent. Desktop computers without a touchscreen (Mac, Windows and Linux) return 0 while smartphones (Android and iOS) typically return 5.

## Example

```js
if (navigator.maxTouchPoints > 1) {
  // Device supports tracking at least 2 touch points; offer complex
  // interaction gestures such as swiping with two/three fingers
} else {
  // Device only has 1 touch point or is not a touch screen.
  // Offer basic <example-value> such as dragging and clicking
}
```
