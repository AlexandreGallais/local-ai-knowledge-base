---
title: "HTMLInputElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: height property

The **`height`** property of the `HTMLInputElement` interface specifies the height of a control. It reflects the `` element's `height` attribute.

The `height` property is valid for the `image` type only. It defines the vertical dimension of the image button, in pixels. If CSS sizing properties apply to the control, the value is the height of the content box of the rendered control, not the value of the `height` attribute. If no `height` is set and CSS does not impact the control's size, the `height` will be the intrinsic height of the image. If the image didn't load, the value will be the height of the `alt` text. The `height` will be `0` if the height is not known; if no `height` is set, CSS doesn't impact the height, the image didn't load, and either the value of the `alt` is the empty string or no `src` is set.

## Value

A number.

## Examples

```js
const inputElement = document.getElementById("imageButton");
console.log(inputElement.height);
```

## See also

- `HTMLInputElement.width`
- `HTMLInputElement.src`
- `HTMLInputElement.alt`
- `HTMLButtonElement`
- ``
- ``
- ``
- CSS `inline-size` property
- CSS `height` property
- CSS `aspect-ratio` property
- CSS box sizing module
