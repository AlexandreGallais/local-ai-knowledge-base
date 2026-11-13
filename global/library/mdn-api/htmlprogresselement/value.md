---
title: "HTMLProgressElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlprogresselement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLProgressElement: value property

The **`value`** property of the `HTMLProgressElement` interface represents the current progress of the `<progress>` element.

## Value

A floating point number. If `max` value is not set on the progress bar then value ranges between 0.0 and 1.0. If the `max` value is set then the `value` ranges between `0` and the `max` value.

If the `value` property is not set on `HTMLProgressElement` object, then the progress bar remains indeterminate.

## Examples

### HTML

```html
Determinate Progress bar: <progress id="pBar"></progress> <span>0</span>%
<br />
Indeterminate Progress bar: <progress></progress>
```

### JavaScript

```js
const pBar = document.getElementById("pBar");
const span = document.getElementsByTagName("span")[0];

pBar.max = 100;
pBar.value = 0;

setInterval(() => {
  pBar.value = pBar.value < pBar.max ? pBar.value + 1 : 0;

  span.textContent = Math.trunc(pBar.position * 100);
}, 100);
```
