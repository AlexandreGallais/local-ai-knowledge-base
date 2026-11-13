---
title: "Element: mousedown event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/mousedown_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: mousedown event

The **`mousedown`** event is fired at an `Element` when a pointing device button is pressed while the pointer is inside the element.

This differs from the `click` event in that `click` is fired after a full click action occurs; that is, the mouse button is pressed and released while the pointer remains inside the same element. `mousedown` is fired the moment the button is initially pressed.

This behavior is different from `pointerdown` events. When using a physical mouse, `mousedown` events fire whenever any button on a mouse is pressed down. `pointerdown` events fire only upon the first button press; subsequent button presses don't fire `pointerdown` events.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mousedown", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmousedown = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Examples

See `mousemove` event for example code.

## See also

- Learn: Introduction to events
- `mouseup`
- `mousemove`
- `click`
- `dblclick`
- `mouseover`
- `mouseout`
- `mouseenter`
- `mouseleave`
- `contextmenu`
- `pointerdown`
