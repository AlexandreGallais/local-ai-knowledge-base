---
title: "SVGFESpotLightElement: y property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfespotlightelement/y/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFESpotLightElement: y property

The **`y`** read-only property of the `SVGFESpotLightElement` interface describes the vertical coordinate of the position of an SVG filter primitive as a `SVGAnimatedNumber`.

It reflects the `y` attribute of the `<feSpotLight>` element, which can be used to define the light source in a spotlight effect. The attribute is a `<number>`. The default value is `0`.

## Value

An `SVGAnimatedNumber`.

## Example

```js
const feSpotLight = document.querySelector("feSpotLight");
const topPosition = feSpotLight.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `SVGFESpotLightElement.x`
- `SVGFESpotLightElement.z`
- `SVGFEDistantLightElement`
- `SVGFEPointLightElement`
