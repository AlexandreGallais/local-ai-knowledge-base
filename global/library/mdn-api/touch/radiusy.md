---
title: "Touch: radiusY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/radiusy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch: radiusY property

The **`radiusY`** read-only property of the `Touch` interface returns the Y radius of the ellipse that most closely circumscribes the area of contact with the touch surface. The value is in CSS pixels of the same scale as `Touch.screenX`.

This value, in combination with `Touch.radiusX` and `Touch.rotationAngle` constructs an ellipse that approximates the size and shape of the area of contact between the user and the screen. This may be a large ellipse representing the contact between a fingertip and the screen or a small one representing the tip of a stylus, for example.

## Value

A number.

## Examples

The Touch.radiusX example includes an example of this property's usage.
