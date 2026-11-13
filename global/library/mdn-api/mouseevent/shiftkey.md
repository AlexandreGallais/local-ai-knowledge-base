---
title: "MouseEvent: shiftKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/shiftkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: shiftKey property

The **`MouseEvent.shiftKey`** read-only property is a boolean value that indicates whether the `shift` key was pressed or not when a given mouse event occurs.

## Value

A boolean value, where `true` indicates that the key is pressed, and `false` indicates that the key is _not_ pressed.

## Examples

This example logs the `shiftKey` property when you trigger a `click` event.

### HTML

```html
<p>Click anywhere to test the <code>shiftKey</code> property.</p>
<p id="log"></p>
```

### JavaScript

```js
let log = document.querySelector("#log");
document.addEventListener("click", logKey);

function logKey(e) {
  log.textContent = `The shift key is pressed: ${e.shiftKey}`;
}
```

## See also

- `MouseEvent`
