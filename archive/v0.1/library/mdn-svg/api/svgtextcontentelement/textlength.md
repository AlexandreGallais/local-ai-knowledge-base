---
title: "SVGTextContentElement: textLength property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextcontentelement/textlength/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
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
