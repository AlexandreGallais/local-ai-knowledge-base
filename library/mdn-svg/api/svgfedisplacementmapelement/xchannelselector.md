---
title: "SVGFEDisplacementMapElement: xChannelSelector property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfedisplacementmapelement/xchannelselector/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDisplacementMapElement: xChannelSelector property

The **`xChannelSelector`** read-only property of the `SVGFEDisplacementMapElement` interface reflects the `xChannelSelector` attribute of the given `<feDisplacementMap>` element. It takes one of the `SVG_CHANNEL_*` constants defined on this interface.

## Value

An `SVGAnimatedEnumeration` object.

## Examples

### Accessing the `xChannelSelector` attribute

In this example, the `<feDisplacementMap>` element defined in the `<filter>` includes a `xChannelSelector` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="displacementFilter">
      <!-- Displacement Map with xChannelSelector set to Red Channel -->
      <feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R">
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
    filter="url(#displacementFilter)" />
</svg>
```

We can access the `xChannelSelector` attribute and get its value:

```js
const displacementMap = document.querySelector("feDisplacementMap");

console.log(displacementMap.xChannelSelector.baseVal); // Output: 1 (SVG_CHANNEL_R)
```

## See also

- `SVGAnimatedEnumeration`
