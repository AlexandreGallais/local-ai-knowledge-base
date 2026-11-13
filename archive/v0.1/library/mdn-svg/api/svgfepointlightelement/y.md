---
title: "SVGFEPointLightElement: y property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfepointlightelement/y/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEPointLightElement: y property

The **`y`** read-only property of the `SVGFEPointLightElement` interface describes the vertical coordinate of the position of an SVG filter primitive as a `SVGAnimatedNumber`.

It reflects the `y` attribute of the `<fePointLight>` element, which can be used to define the light source in a point light effect. The attribute is a `<number>`. The default value is `0`.

## Value

An `SVGAnimatedNumber`.

## Example

```js
const fePointLight = document.querySelector("fePointLight");
const topPosition = fePointLight.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `SVGFEPointLightElement.x`
- `SVGFEPointLightElement.z`
- `SVGFEDistantLightElement`
- `SVGFESpotLightElement`
