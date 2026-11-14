---
title: "HTMLProgressElement: max property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlprogresselement/max/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLProgressElement: max property

The **`max`** property of the `HTMLProgressElement` interface represents the upper bound of the `<progress>` element's range.

## Value

A floating point number that is greater than zero. The default value is 1.0.

## Examples

### HTML

```html
Progress: <progress id="pBar"></progress> <span>0</span>%
```

### JavaScript

```js
const pBar = document.getElementById("pBar");
const span = document.getElementsByTagName("span")[0];

console.log(`Default value of max: ${pBar.max}`);

pBar.max = 100;
pBar.value = 0;

setInterval(() => {
  pBar.value = pBar.value < pBar.max ? pBar.value + 1 : 0;

  span.textContent = Math.trunc(pBar.position * 100);
}, 100);
```
