---
title: "FontFaceSet: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: delete() method

The **`delete()`** method of the `FontFaceSet` interface removes a font from the set.

Font faces that were added to the set using the CSS `@font-face` rule remain connected to the corresponding CSS, and cannot be deleted.

## Syntax

```js
delete(font)
```

### Parameters

- `font`
    A `FontFace` to be removed from the set.

### Return value

A boolean value which is `true` if the deletion was successful, and `false` otherwise.

## Examples

In the following example a new `FontFace` object is created and then deleted from the `FontFaceSet`.

```js
const font = new FontFace("MyFont", 'url("myFont.woff2")');
document.fonts.delete(font);
```
