---
title: "FontFaceSet: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: add() method

The **`add()`** method of the `FontFaceSet` interface adds a new font to the set.

## Syntax

```js
add(font)
```

### Parameters

- `font`
    A `FontFace` to be added to the set.

### Return value

A new `FontFaceSet`.

### Exceptions

- `InvalidModificationError` `DOMException`
    Thrown if this font is already included via the CSS `@font-face` rule.

## Examples

In the following example a new `FontFace` object is created and then added to the `FontFaceSet`.

```js
const font = new FontFace("MyFont", 'url("myFont.woff2")');
document.fonts.add(font);
```
