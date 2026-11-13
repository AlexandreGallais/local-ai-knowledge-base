---
title: "SVGFEDisplacementMapElement: scale property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfedisplacementmapelement/scale/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDisplacementMapElement: scale property

The **`scale`** read-only property of the `SVGFEDisplacementMapElement` interface reflects the `scale` attribute of the given `<feDisplacementMap>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `scale` attribute

In this example, the `<feDisplacementMap>` element defined in the `<filter>` includes a `scale` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="filter1">
      <!-- Displacement Map -->
      <feDisplacementMap in="SourceGraphic" scale="20">
        <feFuncR type="table" tableValues="0 1" />
      </feDisplacementMap>
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="red"
    filter="url(#filter1)" />
</svg>
```

We can access the `scale` attribute and get its value:

```js
const displacementMap = document.querySelector("feDisplacementMap");

console.log(displacementMap.scale.baseVal); // Output: 20
```

## See also

- `SVGAnimatedNumber`
