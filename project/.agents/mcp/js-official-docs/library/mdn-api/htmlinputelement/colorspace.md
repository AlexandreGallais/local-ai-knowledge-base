---
title: "HTMLInputElement: colorSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/colorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: colorSpace property

The **`colorSpace`** property of the `HTMLInputElement` interface reflects the `` element's `colorspace` attribute, which indicates whether the color space of the serialized CSS color is `sRGB` (the default) or `display-p3`. It is only relevant to color controls.

## Value

A string containing the value of the `colorspace` attribute.

## Examples

### Getting and setting color spaces

```html
<input id="color-picker" type="color" colorspace="display-p3" alpha />
```

```js
const colorInput = document.getElementById("color-picker");
console.log(colorInput.colorSpace); // "display-p3"
colorInput.colorSpace = "limited-srgb"; // convert to srgb
```

## See also

- ``
