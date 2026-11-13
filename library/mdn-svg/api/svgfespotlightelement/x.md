---
title: "SVGFESpotLightElement: x property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfespotlightelement/x/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFESpotLightElement: x property

The **`x`** read-only property of the `SVGFESpotLightElement` interface describes the horizontal coordinate of the position of an SVG filter primitive as a `SVGAnimatedNumber`.

It reflects the `x` attribute of the `<feSpotLight>` element, which can be used to define the light source in a spotlight effect. The attribute is a `<number>`. The default value is `0`.

## Value

An `SVGAnimatedNumber`.

## Example

```js
const feSpotLight = document.querySelector("feSpotLight");
const leftPosition = feSpotLight.x;
console.log(leftPosition.baseVal.value); // the `x` value
```

## See also

- `SVGFESpotLightElement.y`
- `SVGFESpotLightElement.z`
- `SVGFEDistantLightElement`
- `SVGFEPointLightElement`
