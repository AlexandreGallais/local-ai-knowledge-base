---
title: "SVGTextContentElement: getNumberOfChars() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextcontentelement/getnumberofchars/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: getNumberOfChars() method

The `getNumberOfChars()` method of the `SVGTextContentElement` interface represents the total number of addressable characters available for rendering within the current element, regardless of whether they will be rendered.

## Syntax

```js
getNumberOfChars()
```

### Parameters

None.

### Return value

A long.

## Examples

### Counting Characters in a Text Element

```html
<svg width="300" height="100">
  <text id="exampleText" x="10" y="50">Hello, SVG World!</text>
</svg>
```

```js
const textElement = document.getElementById("exampleText");

// Get the number of characters in the text element
const charCount = textElement.getNumberOfChars();

console.log(charCount); // Output: 17
```
