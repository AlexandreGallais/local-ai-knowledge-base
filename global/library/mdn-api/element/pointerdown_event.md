---
title: "Element: pointerdown event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointerdown_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointerdown event

The `pointerdown` event is fired when a pointer becomes active. For mouse, it is fired when the device transitions from no buttons pressed to at least one button pressed. For touch, it is fired when physical contact is made with the digitizer. For pen, it is fired when the stylus makes physical contact with the digitizer.

This behavior is different from `mousedown` events. When using a physical mouse, `mousedown` events fire whenever any button on a mouse is pressed down. `pointerdown` events fire only upon the first button press; subsequent button presses don't fire `pointerdown` events.

> **Note:**
> For touchscreen browsers that allow direct manipulation, a `pointerdown` event triggers implicit pointer capture, which causes the target to capture all subsequent pointer events as if they were occurring over the capturing target. Accordingly, `pointerover`, `pointerenter`, `pointerleave`, and `pointerout` **will not fire** as long as this capture is set. The capture can be released manually by calling `element.releasePointerCapture` on the target element, or it will be implicitly released after a `pointerup` or `pointercancel` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerdown", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerdown = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointerdown", (event) => {
  console.log("Pointer down event");
});
```

Using the `onpointerdown` event handler property (but note that this replaces other event listeners added using `onpointerdown`, if any):

```js
const para = document.querySelector("p");

para.onpointerdown = (event) => {
  console.log("Pointer down event");
};
```

## See also

- Related events
  - `gotpointercapture`
  - `lostpointercapture`
  - `pointerover`
  - `pointerenter`
  - `pointermove`
  - `pointerup`
  - `pointercancel`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`
  - `mousedown`
