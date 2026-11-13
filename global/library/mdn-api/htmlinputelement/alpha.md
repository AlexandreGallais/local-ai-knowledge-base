---
title: "HTMLInputElement: alpha property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/alpha/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: alpha property

The **`alpha`** property of the `HTMLInputElement` interface reflects the `` element's `alpha` attribute, which indicates whether the CSS color's alpha component can be manipulated by the end user and does not have to be fully opaque. It is only relevant to color controls.

## Value

A boolean value.

## Examples

```html
<input id="color-picker" type="color" alpha />
```

```js
const colorInput = document.getElementById("color-picker");

if (colorInput.alpha) {
  // Color values contain an alpha component
} else {
  // We have fully opaque color values
}
```

## See also

- ``
