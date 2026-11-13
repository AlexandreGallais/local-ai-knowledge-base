---
title: "SVGTextContentElement: textLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextcontentelement/textlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: textLength property

The **`textLength`** read-only property of the `SVGTextContentElement` interface reflects the `textLength` attribute of the given element.

## Value

An `SVGAnimatedLength`.

## Examples

### Accessing the `textLength` Property

```html
<svg width="200" height="100">
  <text id="myText" x="10" y="50" textLength="100" lengthAdjust="spacing">
    Hello, SVG!
  </text>
</svg>
```

```js
const textElement = document.getElementById("myText");

// Access the textLength property
const animatedLength = textElement.textLength;

// The base value of the textLength attribute
console.log(animatedLength.baseVal.value); // Output: 100
```

## See also

- `textLength`
- `SVGAnimatedLength`
