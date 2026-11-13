---
title: "MouseEvent: movementY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/movementy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: movementY property

The **`movementY`** read-only property of the `MouseEvent` interface provides the difference in the Y coordinate of the mouse (or pointer) between the given move event and the previous move event of the same type.

In other words, the value of the property is computed like this: `currentEvent.movementY = currentEvent.screenY - previousEvent.screenY`.
The value is zero for all events other than `mousemove`, `pointermove`, and `pointerrawupdate`.

> **Warning:**
> Browsers use different units for `movementY` and `screenY` than what the specification defines.
> Depending on the browser and operating system, the `movementY` units may be a physical pixel, a logical pixel, or a CSS pixel.
> You may want to avoid the movement properties, and instead calculate the delta between the current client values (`screenX`, `screenY`) and the previous client values.

## Value

A number.
Always zero on any `MouseEvent` other than `mousemove`, and any `PointerEvent` other than `pointermove` or `pointerrawupdate`.

## Examples

### Log mouse movement for `mousemove` events

This example logs the amount of mouse movement using `movementX` and `movementY`.

#### HTML

```html
<p id="log">Move your mouse around inside this element.</p>
```

#### JavaScript

```js
const log = document.getElementById("log");

function logMovement(event) {
  log.innerText = `movement: ${event.movementX}, ${event.movementY}\n${log.innerText}`;
}

document.addEventListener("mousemove", logMovement);
```

#### Result

## See also

- `MouseEvent.movementX`
- `MouseEvent`
- Pointer Lock
