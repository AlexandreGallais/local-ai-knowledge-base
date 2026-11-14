---
title: "MouseEvent: screenY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/screeny/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: screenY property

The **`screenY`** read-only property of the `MouseEvent` interface provides the vertical coordinate (offset) of the mouse pointer in screen coordinates.

## Value

A `double` floating point value in pixels.

Early versions of the spec defined this as an integer referring to the number of pixels.

## Examples

This example displays your mouse's coordinates whenever you trigger the `mousemove` event.

### HTML

```html
<p>Move your mouse to see its position.</p>
<p id="screen-log"></p>
```

### JavaScript

```js
let screenLog = document.querySelector("#screen-log");
document.addEventListener("mousemove", logKey);

function logKey(e) {
  screenLog.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`;
}
```

## See also

- `MouseEvent`
- `screenX`
- `clientX` / `clientY`
- Coordinate systems
