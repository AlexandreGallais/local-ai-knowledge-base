---
title: "SVGTextContentElement: getEndPositionOfChar() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextcontentelement/getendpositionofchar/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getEndPositionOfChar() method

The `getEndPositionOfChar()` method of the `SVGTextContentElement` interface returns the trailing position of a typographic character after text layout has been performed.

## Syntax

```js
getEndPositionOfChar(index)
```

### Parameters

- `index`
    An `integer`; the index of the character.

### Return value

A `DOMPoint` object; the position of the character in user coordinates.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if no character is found at `index`.

## Examples

### Getting the End Position of a Character

```html
<svg width="300" height="100">
  <text id="exampleText" x="10" y="50" font-size="16">Hello, SVG World!</text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the end position of the character at index 0 (the first character)
const position = textElement.getEndPositionOfChar(0);

// Get the x and y coordinates of the first character
console.log(position.x, position.y); // Output: 21.5 50
```
