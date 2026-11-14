---
title: "WheelEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wheelevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WheelEvent

The **`WheelEvent`** interface represents events that occur due to the user moving a mouse wheel or similar input device.

> **Note:**
> This is the standard wheel event interface to use. Old versions of browsers implemented the non-standard and non-cross-browser-compatible `MouseWheelEvent` and `MouseScrollEvent` interfaces. Use this interface and avoid the non-standard ones.

Don't confuse the `wheel` event with the `scroll` event:

- A `wheel` event doesn't necessarily dispatch a `scroll` event. For example, the element may be unscrollable at all. Zooming actions using the wheel or trackpad also fire `wheel` events.
- A `scroll` event isn't necessarily triggered by a `wheel` event. Elements can also be scrolled by using the keyboard, dragging a scrollbar, or using JavaScript.
- Even when the `wheel` event does trigger scrolling, the `delta*` values in the `wheel` event don't necessarily reflect the content's scrolling direction.

## Constructor

- `WheelEvent()`
    Creates a `WheelEvent` object.

## Instance properties

_This interface inherits properties from its ancestors, `MouseEvent`, `UIEvent`, and `Event`._

- `WheelEvent.deltaX` (read-only)
    Returns a `double` representing the horizontal scroll amount.
- `WheelEvent.deltaY` (read-only)
    Returns a `double` representing the vertical scroll amount.
- `WheelEvent.deltaZ` (read-only)
    Returns a `double` representing the scroll amount for the z-axis.
- `WheelEvent.deltaMode` (read-only)
    Returns an `unsigned long` representing the unit of the `delta*` values' scroll amount.
- `WheelEvent.wheelDelta` (read-only) (deprecated) (non-standard)
    Returns an integer (32-bit) representing the distance in pixels.
- `WheelEvent.wheelDeltaX` (read-only) (deprecated) (non-standard)
    Returns an integer representing the horizontal scroll amount.
- `WheelEvent.wheelDeltaY` (read-only) (deprecated) (non-standard)
    Returns an integer representing the vertical scroll amount.

> **Note:**
> Element: mousewheel event has additional documentation about the deprecated properties `wheelDelta`, `wheelDeltaX`, `wheelDeltaY`.

## Instance methods

_This interface doesn't define any specific methods, but inherits methods from its ancestors, `MouseEvent`, `UIEvent`, and `Event`._

## See also

- `wheel` event
- Interfaces replaced by this one:
  - Gecko's legacy mouse wheel event object: `MouseScrollEvent`
