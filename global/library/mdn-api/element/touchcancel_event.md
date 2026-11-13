---
title: "Element: touchcancel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/touchcancel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: touchcancel event

The `touchcancel` event is fired when one or more touch points have been disrupted in an implementation-specific manner.

Some examples of situations that will trigger a `touchcancel` event:

- A hardware event occurs that cancels the touch activities. This may include, for example, the user switching applications using an application switcher interface or the "home" button on a mobile device.
- The device's screen orientation is changed while the touch is active.
- The browser decides that the user started touch input accidentally. This can happen if, for example, the hardware supports palm rejection to prevent a hand resting on the display while using a stylus from accidentally triggering events.
- The `touch-action` CSS property prevents the input from continuing.
- When the user interacts with too many fingers simultaneously, the browser can fire this event for all existing pointers (even if the user is still touching the screen).

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("touchcancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontouchcancel = (event) => { }
```

## Event type

A `TouchEvent`. Inherits from `Event`.

## Examples

Code samples for those events are available on the dedicated page: Touch events.
