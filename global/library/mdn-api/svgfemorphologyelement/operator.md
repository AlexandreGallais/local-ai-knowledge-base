---
title: "SVGFEMorphologyElement: operator property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemorphologyelement/operator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMorphologyElement: operator property

The **`operator`** read-only property of the `SVGFEMorphologyElement` interface reflects the `operator` attribute of the given `<feMorphology>` element. It takes one of the `SVG_MORPHOLOGY_OPERATOR_*` constants defined on this interface.

## Value

An `SVGAnimatedEnumeration` object.

## Examples

### Accessing the `operator` Property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="morphologyFilter">
      <!-- Applies a morphology filter with the "dilate" operator -->
      <feMorphology in="SourceGraphic" operator="dilate" radius="3" />
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

```js
// Select the feMorphology element
const morphologyNode = document.querySelector("feMorphology");

// Access the 'operator' property
const operatorEnum = morphologyNode.operator.baseVal;

console.log(operatorEnum); // Output: 2 (SVG_MORPHOLOGY_OPERATOR_DILATE)
```

## See also

- `SVGAnimatedEnumeration`
