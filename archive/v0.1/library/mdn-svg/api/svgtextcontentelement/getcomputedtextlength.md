---
title: "SVGTextContentElement: getComputedTextLength() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextcontentelement/getcomputedtextlength/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getComputedTextLength() method

The `getComputedTextLength()` method of the `SVGTextContentElement` interface represents the computed length for the text within the element.

## Syntax

```js
getComputedTextLength()
```

### Parameters

None.

### Return value

A float.

## Examples

### Computing the text length

```html
<svg width="300" height="100">
  <text id="exampleText" x="10" y="50" font-size="16">Hello, SVG World!</text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the computed text length
const textLength = textElement.getComputedTextLength();

console.log(textLength); // Output: 124.5 (e.g. depends on font size and text content)
```
