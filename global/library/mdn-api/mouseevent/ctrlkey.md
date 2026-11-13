---
title: "MouseEvent: ctrlKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/ctrlkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: ctrlKey property

The **`MouseEvent.ctrlKey`** read-only property is a boolean value that indicates whether the `ctrl` key was pressed or not when a given mouse event occurs.

On Macintosh keyboards, this key is labeled the `control` key. Also, note that on a Mac, a click combined with the `control` key is intercepted by the operating system and used to open a context menu, so `ctrlKey` is not detectable on click events.

Pinch-zooming using a trackpad also sends a simulated `wheel` event with `ctrlKey` set to true.

## Value

A boolean value, where `true` indicates that the key is pressed, and `false` indicates that the key is _not_ pressed.

## Examples

This example logs the `ctrlKey` property when you trigger a `mousemove` event.

### HTML

```html
<p id="log">The ctrl key was pressed while the cursor was moving: false</p>
```

### JavaScript

```js
const log = document.querySelector("#log");
window.addEventListener("mousemove", logKey);

function logKey(e) {
  log.textContent = `The ctrl key was pressed while the cursor was moving: ${e.ctrlKey}`;
}
```

## See also

- `MouseEvent`
