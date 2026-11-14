---
title: "FontFaceSet: load() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/load/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: load() method

The `load()` method of the `FontFaceSet` forces all the fonts given in parameters to be loaded.

## Syntax

```js
load(font)
load(font, text)
```

### Parameters

- `font`
    A font specification using the CSS value syntax, e.g., "italic bold 16px Roboto"
- `text` (optional)
    Limit the font faces to those whose Unicode range contains at least one of the characters in text. This does not check for individual glyph coverage. Defaults to a string containing a single space character (`" "`).

### Return value

A `Promise` fulfilled with an `Array` of loaded `FontFace` objects. The
promise is fulfilled when all the fonts are loaded; it is rejected if one of the fonts
failed to load.

## Examples

The following example returns a promise that will be fulfilled or rejected according the success of loading "MyFont". The code in `then()` can assume the availability of that font.

```js
document.fonts.load("12px MyFont", "ß").then(/* ... */);
```
