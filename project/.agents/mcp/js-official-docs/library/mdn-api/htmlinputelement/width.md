---
title: "HTMLInputElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: width property

The **`width`** property of the `HTMLInputElement` interface specifies the width of a control. It reflects the `` element's `width` attribute.

The `width` property is valid for the `image` type only. It defines the preferred horizontal size of the image button, in pixels. The property value is the width of the content-box of the rendered button. CSS box model properties impacting the size of the control take precedence.

If no `width` is set and no CSS width properties impact the control, the `width` will be the intrinsic width of the image. If the image didn't load, the value will be the maximum intrinsic width of the `alt` text. The `width` will be `0` if the width is not known; if no `width` is set, no CSS dimensions apply, no image loaded, and either the value of the `alt` is the empty string or no `src` is set.

## Value

A number.

## Examples

```js
const inputElement = document.getElementById("imageButton");
console.log(inputElement.width);
```

## See also

- `HTMLInputElement.height`
- `HTMLInputElement.src`
- `HTMLInputElement.alt`
- `HTMLButtonElement`
- ``
- ``
- ``
- CSS `inline-size` property
- CSS `width` property
- CSS `aspect-ratio` property
- CSS box sizing module
