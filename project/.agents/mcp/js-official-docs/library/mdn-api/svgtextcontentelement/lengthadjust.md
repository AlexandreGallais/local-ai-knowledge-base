---
title: "SVGTextContentElement: lengthAdjust property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextcontentelement/lengthadjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextContentElement: lengthAdjust property

The **`lengthAdjust`** read-only property of the `SVGTextContentElement` interface reflects the `lengthAdjust` attribute of the given element. It takes one of the `LENGTHADJUST_*` constants defined on this interface.

## Value

An `SVGAnimatedEnumeration`.

## Examples

### Accessing the `lengthAdjust` Property

```html
<svg width="200" height="100">
  <text id="myText" x="10" y="50" textLength="100" lengthAdjust="spacing">
    Hello, SVG!
  </text>
</svg>
```

```js
const textElement = document.getElementById("myText");

// Access the `lengthAdjust` property
const lengthAdjust = textElement.lengthAdjust;

// Log the base value of the `lengthAdjust` attribute
console.log(lengthAdjust.baseVal); // Output: 1 (e.g. LENGTHADJUST_SPACING)
```

## See also

- `lengthAdjust`
- `SVGAnimatedEnumeration`
