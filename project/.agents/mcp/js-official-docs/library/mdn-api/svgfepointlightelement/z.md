---
title: "SVGFEPointLightElement: z property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfepointlightelement/z/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEPointLightElement: z property

The **`z`** read-only property of the `SVGFEPointLightElement` interface describes the z-axis value of the position of an SVG filter primitive as a `SVGAnimatedNumber`. A positive Z-axis comes out towards the person viewing the content.

It reflects the `z` attribute of the `<fePointLight>` element, which can be used to define the light source in a point light effect. The attribute is a `<number>`. The default value is `0`.

## Value

An `SVGAnimatedNumber`.

## Example

```js
const fePointLight = document.querySelector("fePointLight");
const zVal = fePointLight.z;
console.log(zVal.baseVal.value); // the `z` value
```

## See also

- `SVGFEPointLightElement.x`
- `SVGFEPointLightElement.y`
- `SVGFEDistantLightElement`
- `SVGFESpotLightElement`
