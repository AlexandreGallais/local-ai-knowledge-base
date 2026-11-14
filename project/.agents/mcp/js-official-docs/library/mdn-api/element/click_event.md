---
title: "Element: click event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/click_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: click event

An element receives a **`click`** event when any of the following occurs:

- A pointing-device button (such as a mouse's primary button) is both pressed and released while the pointer is located inside the element.
- A touch gesture is performed on the element.
- Any user interaction that is equivalent to a click, such as pressing the `Space` key or `Enter` key while the element is focused. Note that this only applies to elements with a default key event handler, and therefore, excludes other elements that have been made focusable by setting the `tabindex` attribute.

If the button is pressed on one element and the pointer is moved outside the element before the button is released, the event is fired on the most specific ancestor element that contained both elements.

`click` fires after both the `mousedown` and `mouseup` events have fired, in that order.

The event is a device-independent event — meaning it can be activated by touch, keyboard, mouse, and any other mechanism provided by assistive technology.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("click", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclick = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `MouseEvent`.

> **Note:**
> In earlier versions of the specification, the event type for this event was a `MouseEvent`. Check browser compatibility for more information.

## Usage notes

The `PointerEvent` object passed into the event handler for `click` has its `detail` property set to the number of times the `target` was clicked. In other words, `detail` will be 2 for a double-click, 3 for triple-click, and so forth. This counter resets after a short interval without any clicks occurring; the specifics of how long that interval is may vary from browser to browser and across platforms. The interval is also likely to be affected by user preferences; for example, accessibility options may extend this interval to make it easier to perform multiple clicks with adaptive interfaces.

## Examples

This example displays the number of consecutive clicks on a ``.

### HTML

```html
<button>Click</button>
```

### JavaScript

```js
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  button.textContent = `Click count: ${event.detail}`;
});
```

### Result

Try making rapid, repeated clicks on the button to increase the click count. If you take a break between clicks, the count will reset.

## See also

- Learn: Introduction to events
- `auxclick`
- `contextmenu`
- `dblclick`
- `mousedown`
- `mouseup`
- `pointerdown`
- `pointerup`
