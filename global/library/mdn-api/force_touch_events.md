---
title: "Force Touch events"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/force_touch_events/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Force Touch events

**Force Touch Events** are a proprietary, Apple-specific feature which makes possible (where supported by the input hardware) new interactions based on how hard the user clicks or presses down on the touchscreen or trackpad.

## Events

- `webkitmouseforcewillbegin` (non-standard)
    This event is fired before the `mousedown` event. Its main use is that it can be `default-prevented`.
- `webkitmouseforcedown` (non-standard)
    This event is fired after the `mousedown` event as soon as sufficient pressure has been applied for it to qualify as a "force click".
- `webkitmouseforceup` (non-standard)
    This event is fired after the `webkitmouseforcedown` event as soon as the pressure has been reduced sufficiently to end the "force click".
- `webkitmouseforcechanged` (non-standard)
    This event is fired each time the amount of pressure changes. This event first fires after the `mousedown` event and stops firing before the `mouseup` event.

## Event properties

The following property is known to be available on the `webkitmouseforcewillbegin`, `mousedown`, `webkitmouseforcechanged`, `webkitmouseforcedown`, `webkitmouseforceup`, `mousemove`, and `mouseup` event objects:

- `MouseEvent.webkitForce` (non-standard) (read-only)
    The amount of pressure currently being applied to the trackpad/touchscreen.

## Constants

These constants are useful for determining the relative intensity of the pressure indicated by `MouseEvent.webkitForce`:

- `MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN` (non-standard) (read-only)
    Minimum force necessary for a normal click.
- `MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN` (non-standard) (read-only)
    Minimum force necessary for a force click.

## Specifications

_Not part of any specification._ Apple has a description at the Mac Developer Library.
