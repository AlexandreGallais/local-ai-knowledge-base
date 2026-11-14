---
title: "FontFace: family property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontface/family/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFace: family property

The **`FontFace.family`** property allows the author to get or set the font family of a `FontFace` object.

The value is used for name matching against a particular font face when styling elements using the `font-family` property.
Any name may be used, and this overrides any name specified in the underlying font data.

This property is equivalent to the `font-family` descriptor of `@font-face`.

## Value

A string.

## Examples

```js
let fontFace = new FontFace(
  "Roboto",
  'url("https://fonts.example.com/roboto.woff2")',
);
console.log(fontFace.family); // 'Roboto'

fontFace.family = "newRoboto";
console.log(fontFace.family); // 'newRoboto'
```
