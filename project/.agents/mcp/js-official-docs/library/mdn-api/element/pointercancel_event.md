---
title: "Element: pointercancel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/pointercancel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: pointercancel event

The **`pointercancel`** event is fired when the browser determines that there are unlikely to be any more pointer events, or if after the `pointerdown` event is fired, the pointer is then used to manipulate the viewport by panning, zooming, or scrolling.

Some examples of situations that will trigger a `pointercancel` event:

- A hardware event occurs that cancels the pointer activities. This may include, for example, the user switching applications using an application switcher interface or the "home" button on a mobile device.
- The device's screen orientation is changed while the pointer is active.
- The browser decides that the user started pointer input accidentally. This can happen if, for example, the hardware supports palm rejection to prevent a hand resting on the display while using a stylus from accidentally triggering events.
- The `touch-action` CSS property prevents the input from continuing.
- When the user interacts with too many simultaneous pointers, the browser can fire this event for all existing pointers (even if the user is still touching the screen).

> **Note:**
> After the `pointercancel` event is fired, the browser will also send `pointerout` followed by `pointerleave`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointercancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointercancel = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

para.addEventListener("pointercancel", (event) => {
  console.log("Pointer event canceled");
});
```

Using the `onpointercancel` event handler property (but note that this replaces other event listeners added using `onpointercancel`, if any):

```js
const para = document.querySelector("p");

para.onpointercancel = (event) => {
  console.log("Pointer event canceled");
};
```

## See also

- Related events
  - `gotpointercapture`
  - `lostpointercapture`
  - `pointerover`
  - `pointerenter`
  - `pointerdown`
  - `pointermove`
  - `pointerup`
  - `pointerout`
  - `pointerleave`
  - `pointerrawupdate`
