---
title: "Element: mouseup event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/mouseup_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: mouseup event

The **`mouseup`** event is fired at an `Element` when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located inside it.

`mouseup` events are the counterpoint to `mousedown` events.

This behavior is different from `pointerup` events. When using a physical mouse, `mouseup` events fire whenever any button on a mouse is released. `pointerup` events fire only upon the last button release; previous button releases, while other buttons are held down, don't fire `pointerup` events.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mouseup", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmouseup = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Examples

See `mousemove` event for example code.

## See also

- Learn: Introduction to events
- `mousedown`
- `mousemove`
- `click`
- `dblclick`
- `mouseover`
- `mouseout`
- `mouseenter`
- `mouseleave`
- `contextmenu`
- `pointerup`
