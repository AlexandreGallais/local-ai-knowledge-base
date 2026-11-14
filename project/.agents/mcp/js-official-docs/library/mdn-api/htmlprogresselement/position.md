---
title: "HTMLProgressElement: position property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlprogresselement/position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLProgressElement: position property

The **`position`** read-only property of the `HTMLProgressElement` interface returns current progress of the `<progress>` element.

## Value

For determinate progress bar returns the result of current value divided by max value, i.e., a fraction between `0.0` and `1.0`.

For indeterminate progress bar the value is always `-1`.

## Examples

### HTML

```html
Determinate Progress bar: <progress id="pBar"></progress> Position:
<span>0</span>
```

### JavaScript

```js
const pBar = document.getElementById("pBar");
const span = document.getElementsByTagName("span")[0];

pBar.max = 100;
pBar.value = 0;

setInterval(() => {
  pBar.value = pBar.value < pBar.max ? pBar.value + 1 : 0;

  span.textContent = pBar.position;
}, 100);
```
