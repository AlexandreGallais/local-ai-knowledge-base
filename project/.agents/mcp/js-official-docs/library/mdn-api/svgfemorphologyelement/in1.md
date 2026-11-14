---
title: "SVGFEMorphologyElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemorphologyelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMorphologyElement: in1 property

The **`in1`** read-only property of the `SVGFEMorphologyElement` interface reflects the `in` attribute of the given `<feMorphology>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `in` Property of `feMorphology` Element

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="morphologyFilter">
      <!-- Applies a morphology filter to the SourceGraphic -->
      <feMorphology in="SourceGraphic" operator="dilate" radius="2" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#morphologyFilter)" />
</svg>
```

We can access the `in` attribute of the `feMorphology` element.

```js
// Select the feMorphology element
const morphologyNode = document.querySelector("feMorphology");
console.log(morphologyNode.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
