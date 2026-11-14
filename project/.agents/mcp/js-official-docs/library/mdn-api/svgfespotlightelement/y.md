---
title: "SVGFESpotLightElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespotlightelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
