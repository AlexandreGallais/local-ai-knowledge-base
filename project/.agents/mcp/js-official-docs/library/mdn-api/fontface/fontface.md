---
title: "FontFace: FontFace() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontface/fontface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFace: FontFace() constructor

The **`FontFace()`** constructor creates a new `FontFace` object.

## Syntax

```js
new FontFace(family, source)
new FontFace(family, source, descriptors)
```

### Parameters

- `family`
    Specifies a font family name that can be used to match against this font face when styling elements.

    Takes the same type of values as the `font-family` descriptor of `@font-face`.
    This value may also be read and set using the `FontFace.family` property.

- `source`
    The font source.
    This can be either:
    - A URL to a font face file.
    - Binary font face data in an `ArrayBuffer` or a `TypedArray`.

- `descriptors` (optional)
    A set of optional descriptors passed as an object.
    It can contain any of the descriptors available for `@font-face`:
    - `ascentOverride`
        With an allowable value for `@font-face/ascent-override`.
    - `descentOverride`
        With an allowable value for `@font-face/descent-override`.
    - `display`
        With an allowable value for `@font-face/font-display`.
    - `featureSettings`
        With an allowable value for `font-feature-settings`.
    - `lineGapOverride`
        With an allowable value for `@font-face/line-gap-override`.
    - `sizeAdjust`
        With an allowable value for `@font-face/size-adjust`.
    - `stretch`
        With an allowable value for `@font-face/font-stretch`.
    - `style`
        With an allowable value for `@font-face/font-style`.
    - `unicodeRange`
        With an allowable value for `@font-face/unicode-range`.
    - `variationSettings`
        With an allowable value for `@font-face/font-variation-settings`.
    - `weight`
        With an allowable value for `@font-face/font-weight`.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown when a descriptor string does not match the grammar of the corresponding `@font-face` descriptor, or the specified binary source cannot be loaded.
    This error results in `FontFace.status` being set to `error`.

## Examples

```js
async function loadFonts() {
  const font = new FontFace("my-font", 'url("my-font.woff")', {
    style: "normal",
    weight: "400",
    stretch: "condensed",
  });
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
  // enable font with CSS class
  document.body.classList.add("fonts-loaded");
}
```

## See also

- `@font-face`
