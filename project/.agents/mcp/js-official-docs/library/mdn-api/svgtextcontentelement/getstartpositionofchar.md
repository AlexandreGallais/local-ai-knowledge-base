---
title: "SVGTextContentElement: getStartPositionOfChar() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextcontentelement/getstartpositionofchar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getStartPositionOfChar() method

The `getStartPositionOfChar()` method of the `SVGTextContentElement` interface returns the position of a typographic character after text layout has been performed.

## Syntax

```js
getStartPositionOfChar(index)
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

### Getting the Position of a Character

```html
<svg width="300" height="100">
  <text id="exampleText" x="10" y="50" font-size="16">Hello, SVG World!</text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the position of the character at index 0 (the first character)
const position = textElement.getStartPositionOfChar(0);

// Get the x and y coordinates of the first character
console.log(position.x, position.y); // Output: 10 50
```
