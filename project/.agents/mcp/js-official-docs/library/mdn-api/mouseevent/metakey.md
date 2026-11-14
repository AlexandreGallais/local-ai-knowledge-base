---
title: "MouseEvent: metaKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/metakey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: metaKey property

The **`MouseEvent.metaKey`** read-only property is a boolean value that indicates whether the `meta` key was pressed or not when a given mouse event occurs.

Be aware that many operating systems bind special functionality to the `meta` key, so this property may be `false` even when the key is actually pressed.
On Windows, for example, this key may open the Start menu.

> **Note:**
> On Macintosh keyboards, this key is the `command` key (`⌘`).
> On Windows keyboards, this key is the Windows key (`⊞`).

## Value

A boolean value, where `true` indicates that the key is pressed, and `false` indicates that the key is _not_ pressed.

## Examples

This example logs the `metaKey` property when you trigger a `click` event.

### HTML

```html
<p>Click anywhere to test the <code>metaKey</code> property.</p>
<p id="log"></p>
```

### JavaScript

```js
let log = document.querySelector("#log");
document.addEventListener("click", logKey);

function logKey(e) {
  log.textContent = `The meta key is pressed: ${e.metaKey}`;
}
```

## See also

- `MouseEvent`
