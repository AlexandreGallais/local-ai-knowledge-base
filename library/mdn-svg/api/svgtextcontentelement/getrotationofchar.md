---
title: "SVGTextContentElement: getRotationOfChar() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextcontentelement/getrotationofchar/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getRotationOfChar() method

The `getRotationOfChar()` method of the `SVGTextContentElement` interface the represents the rotation of a typographic character.

## Syntax

```js
getRotationOfChar(index)
```

### Parameters

- `index`
    An `integer`; the index of the character.

### Return value

A float; the rotation angle of the character in degrees.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if no character is found at `index`.

## Examples

### Getting the Rotation of a Character

```html
<svg width="200" height="100">
  <text id="exampleText" x="10" y="40" writing-mode="vertical-rl">
    Hello, SVG
  </text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the rotation of the first character "H"
const rotation = textElement.getRotationOfChar(0);

console.log(extent); // Output: 90
```

## See also

- `writing-mode`
