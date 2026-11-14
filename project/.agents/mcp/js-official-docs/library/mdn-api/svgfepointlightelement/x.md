---
title: "SVGFEPointLightElement: x property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfepointlightelement/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEPointLightElement: x property

The **`x`** read-only property of the `SVGFEPointLightElement` interface describes the horizontal coordinate of the position of an SVG filter primitive as a `SVGAnimatedNumber`.

It reflects the `x` attribute of the `<fePointLight>` element, which can be used to define the light source in a point light effect. The attribute is a `<number>`. The default value is `0`.

## Value

An `SVGAnimatedNumber`.

## Example

```js
const fePointLight = document.querySelector("fePointLight");
const leftPosition = fePointLight.x;
console.log(leftPosition.baseVal.value); // the `x` value
```

## See also

- `SVGFEPointLightElement.y`
- `SVGFEPointLightElement.z`
- `SVGFEDistantLightElement`
- `SVGFESpotLightElement`
