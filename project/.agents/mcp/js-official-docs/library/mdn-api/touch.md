---
title: "Touch"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch

The **`Touch`** interface represents a single contact point on a touch-sensitive device. The contact point is commonly a finger or stylus and the device may be a touchscreen or trackpad.

The `Touch.radiusX`, `Touch.radiusY`, and `Touch.rotationAngle` describe the area of contact between the user and the screen, the _touch area_. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).

> **Note:**
> Many of the properties' values are hardware-dependent; for example, if the device doesn't have a way to detect the amount of pressure placed on the surface, the `force` value will always be 0. This may also be the case for `radiusX` and `radiusY`; if the hardware reports only a single point, these values will be 1.

## Constructor

- `Touch()`
    Creates a Touch object.

## Instance properties

_This interface has no parent, and doesn't inherit or implement other properties._

### Basic <example-value>

- `Touch.identifier` (read-only)
    Returns a unique identifier for this `Touch` object. A given touch point (say, by a finger) will have the same identifier for the duration of its movement around the surface. This lets you ensure that you're tracking the same touch all the time.
- `Touch.screenX` (read-only)
    Returns the X coordinate of the touch point relative to the left edge of the screen.
- `Touch.screenY` (read-only)
    Returns the Y coordinate of the touch point relative to the top edge of the screen.
- `Touch.clientX` (read-only)
    Returns the X coordinate of the touch point relative to the left edge of the browser viewport, not including any scroll offset.
- `Touch.clientY` (read-only)
    Returns the Y coordinate of the touch point relative to the top edge of the browser viewport, not including any scroll offset.
- `Touch.pageX` (read-only)
    Returns the X coordinate of the touch point relative to the left edge of the document. Unlike `clientX`, this value includes the horizontal scroll offset, if any.
- `Touch.pageY` (read-only)
    Returns the Y coordinate of the touch point relative to the top of the document. Unlike `clientY`, this value includes the vertical scroll offset, if any.
- `Touch.target` (read-only)
    Returns the `Element` on which the touch point started when it was first placed on the surface, even if the touch point has since moved outside the interactive area of that element or even been removed from the document.

### Touch area

- `Touch.radiusX` (read-only)
    Returns the X radius of the ellipse that most closely circumscribes the area of contact with the screen. The value is in pixels of the same scale as `screenX`.
- `Touch.radiusY` (read-only)
    Returns the Y radius of the ellipse that most closely circumscribes the area of contact with the screen. The value is in pixels of the same scale as `screenY`.
- `Touch.rotationAngle` (read-only)
    Returns the angle (in degrees) that the ellipse described by radiusX and radiusY must be rotated, clockwise, to most accurately cover the area of contact between the user and the surface.
- `Touch.force` (read-only)
    Returns the amount of pressure being applied to the surface by the user, as a `float` between `0.0` (no pressure) and `1.0` (maximum pressure).

### Touch type and angle

- `Touch.altitudeAngle` (read-only)
    Returns the angle (in radians) between the transducer (pointer or stylus) axis and the X-Y plane of the device, in the range `0` (parallel to the surface) to `π/2` (perpendicular to the surface). Defaults to `0` for hardware that does not report tilt or angle.
- `Touch.azimuthAngle` (read-only)
    Returns the azimuth angle (in radians) of the transducer (pointer or stylus), in the range `0` to `2π`. `0` represents a transducer whose cap is pointing in the direction of increasing X values on the X-Y plane, and values increase clockwise.
- `Touch.touchType` (read-only)
    Returns the type of device that triggered the touch, such as `"direct"` for a finger or `"stylus"` for a pen device.

## Instance methods

_This interface has no methods and no parent, and doesn't inherit or implement any methods._

## See also

- Touch events
- `Document.createTouch()`
