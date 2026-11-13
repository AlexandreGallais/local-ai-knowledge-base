---
title: "FontFace: sizeAdjust property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontface/sizeadjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFace: sizeAdjust property

The **`sizeAdjust`** property of the `FontFace` interface represents a multiplier for the font's glyph outlines and metrics, such as glyph widths and line heights, used to lay out text.

Different fonts can look larger or smaller at the same font size, because each font's glyphs are drawn at a different size relative to that font size.
The `sizeAdjust` property allows you to scale a font to match the apparent size of another font, such as a fallback font that is shown until a web font loads.

It is equivalent to the `@font-face/size-adjust` descriptor of `@font-face`.

## Value

A string containing a non-negative percentage, such as `"120%"`.
The default value is `"100%"`, which leaves the font's glyph outlines and metrics unchanged.

This property accepts the same values as the `@font-face/size-adjust` descriptor.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown when setting the property to a value that doesn't match the syntax of the `@font-face/size-adjust` descriptor, such as a negative percentage.

## Examples

### Setting the size adjustment

This example sets the size adjustment when constructing a font face, then updates it using the property.

```js
const fontFace = new FontFace(
  "Roboto",
  'url("https://fonts.example.com/roboto.woff2")',
  {
    sizeAdjust: "120%",
  },
);
console.log(fontFace.sizeAdjust); // "120%"

fontFace.sizeAdjust = "100%";
console.log(fontFace.sizeAdjust); // "100%"
```

## See also

- `@font-face/size-adjust`
- CSS Font Loading API
