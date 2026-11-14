---
title: "MouseEvent: clientY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/clienty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: clientY property

The **`clientY`** read-only property of the `MouseEvent` interface provides the vertical coordinate within the application's viewport at which the event occurred (as opposed to the coordinate within the page).

For example, clicking on the top edge of the viewport will always result in a mouse event with a `clientY` value of `0`, regardless of whether the page is scrolled vertically.

## Value

A `double` floating point value in pixels.

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
- `clientX`
- `screenX` / `screenY`
- Coordinate systems
