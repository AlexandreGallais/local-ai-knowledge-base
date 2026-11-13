---
title: "Element: wheel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/wheel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: wheel event

The **`wheel`** event fires when the user rotates a wheel button on a pointing device (typically a mouse). It is also fired for related devices that simulate wheel actions, such as trackpads and mouse balls.

This event replaces the non-standard deprecated `mousewheel` event.

Don't confuse the `wheel` event with the `scroll` event:

- A `wheel` event doesn't necessarily dispatch a `scroll` event. For example, the element may be unscrollable at all. Zooming actions using the wheel or trackpad also fire `wheel` events (with `ctrlKey` set to true).
- A `scroll` event isn't necessarily triggered by a `wheel` event. Elements can also be scrolled by using the keyboard, dragging a scrollbar, or using JavaScript.
- Even when the `wheel` event does trigger scrolling, the `delta*` values in the `wheel` event don't necessarily reflect the content's scrolling direction.

Therefore, do not rely on the `wheel` event's `delta*` properties to get the scrolling direction. Instead, detect value changes of `scrollLeft` and `scrollTop` of the target in the `scroll` event.

The `wheel` event is cancelable. In some browsers, only the first `wheel` event in a sequence is cancelable, and later events are non-cancelable. If the event is canceled, no scrolling or zooming is performed. This may cause performance issues as the browser has to wait for every wheel event to be processed before actually scrolling the content. You can avoid this by setting `passive: true` when calling `addEventListener()`, which may cause the browser to generate non-cancelable `wheel` events.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("wheel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwheel = (event) => { }
```

## Event type

A `WheelEvent`. Inherits from `MouseEvent`, `UIEvent` and `Event`.

## Examples

### Scaling an element via the wheel

This example shows how to scale an element using the mouse (or other pointing device) wheel. It uses the `onwheel` event handler property (but note that this replaces other event listeners added using `onwheel`, if any).

```html
<div>Scale me with your mouse wheel.</div>
```

```css
body {
  min-height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

div {
  width: 105px;
  height: 105px;
  background: #ccddff;
  padding: 5px;
}
```

```js
let scale = 1;
const el = document.querySelector("div");

function zoom(event) {
  event.preventDefault();

  scale += event.deltaY * -0.01;

  // Restrict scale
  scale = Math.min(Math.max(0.125, scale), 4);

  // Apply scale transform
  el.style.transform = `scale(${scale})`;
}

el.onwheel = zoom;
```

### Using addEventListener()

The event handler can also be set up using the `addEventListener()` method:

```js
el.addEventListener("wheel", zoom, { passive: false });
```

## See also

- `WheelEvent`
