---
title: "SVGTextContentElement: getSubStringLength() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextcontentelement/getsubstringlength/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getSubStringLength() method

The `getSubStringLength()` method of the `SVGTextContentElement` interface represents the computed length of the formatted text advance distance for a substring of text within the element.

Note that this method only accounts for the widths of the glyphs in the substring and any extra spacing inserted by the CSS `letter-spacing` and `word-spacing` properties. Visual spacing adjustments made by the `x` attribute are ignored.

## Syntax

```js
getSubStringLength(index, length)
```

### Parameters

- `index`
    An `integer`; the start index of the substring.
- `length`
    An `integer`; the number of characters to include in the substring.

### Return value

A float.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if the `index` is greater than the highest index or `length` is negative.

## Examples

### Getting the Length of a Substring

```html
<svg width="300" height="100">
  <text id="exampleText" x="10" y="50" font-size="16">Hello, SVG World!</text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the length of a substring starting at character 0 with 5 characters
const substringLength = textElement.getSubStringLength(0, 5);

console.log(substringLength); // Output: 35.55
```
