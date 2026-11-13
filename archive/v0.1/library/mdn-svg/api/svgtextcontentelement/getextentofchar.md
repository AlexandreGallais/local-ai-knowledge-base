---
title: "SVGTextContentElement: getExtentOfChar() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextcontentelement/getextentofchar/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getExtentOfChar() method

The `getExtentOfChar()` method of the `SVGTextContentElement` interface the represents computed tight bounding box of the glyph cell that corresponds to a given typographic character.

## Syntax

```js
getExtentOfChar(index)
```

### Parameters

- `index`
    An `integer`; the index of the character.

### Return value

A `DOMRect` object; the tight bounding box of the specified character.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if no character is found at `index`.

## Examples

### Getting the Extent of a Character

```html
<svg width="300" height="100">
  <text id="exampleText" x="10" y="50" font-size="16">Hello, SVG World!</text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the extent (bounding box) of the character at index 0 (the first character)
const extent = textElement.getExtentOfChar(0);

// The bounding box of the first character
console.dir(extent); // Output: DOMRect { x: 10, y: 38, width: 11.55, height: 16 }
```

## See also

- `DOMRect`
