---
title: "SVGFEMorphologyElement: radiusY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemorphologyelement/radiusy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMorphologyElement: radiusY property

The **`radiusY`** read-only property of the `SVGFEMorphologyElement` interface reflects the Y component of the `radius` attribute of the given `<feMorphology>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `radiusY` Property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="morphologyFilter">
      <!-- Applies a morphology filter with a specific radius -->
      <feMorphology in="SourceGraphic" operator="dilate" radius="5 3" />
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

// Access the radiusY property
const radiusY = morphologyNode.radiusY.baseVal;

console.log(`The Y radius is: ${radiusY}`); // Output: 3
```

## See also

- `SVGAnimatedNumber`
