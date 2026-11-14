---
title: "MouseEvent: altKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/altkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: altKey property

The **`MouseEvent.altKey`** read-only property is a boolean value that indicates whether the `alt` key was pressed or not when a given mouse event occurs.

Be aware that the browser can't always detect the `alt` key on some operating systems.
On some Linux variants, for example, a left mouse click combined with the `alt` key is used to move or resize windows.

> **Note:**
> On Macintosh keyboards, this key is also known as the `option` key.

## Value

A boolean value, where `true` indicates that the key is pressed, and `false` indicates that the key is _not_ pressed.

## Examples

This example logs the `altKey` property when you trigger a `click` event.

### HTML

```html
<p>Click anywhere to test the <code>altKey</code> property.</p>
<p id="log"></p>
```

### JavaScript

```js
let log = document.querySelector("#log");
document.addEventListener("click", logKey);

function logKey(e) {
  log.textContent = `The alt key is pressed: ${e.altKey}`;
}
```

## See also

- `MouseEvent`
