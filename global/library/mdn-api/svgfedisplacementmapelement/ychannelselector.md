---
title: "SVGFEDisplacementMapElement: yChannelSelector property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedisplacementmapelement/ychannelselector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDisplacementMapElement: yChannelSelector property

The **`yChannelSelector`** read-only property of the `SVGFEDisplacementMapElement` interface reflects the `yChannelSelector` attribute of the given `<feDisplacementMap>` element. It takes one of the `SVG_CHANNEL_*` constants defined on this interface.

## Value

An `SVGAnimatedEnumeration` object.

## Examples

### Accessing the `yChannelSelector` attribute

In this example, the `<feDisplacementMap>` element defined in the `<filter>` includes a `yChannelSelector` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="displacementFilter">
      <!-- Displacement Map with yChannelSelector set to Red Channel -->
      <feDisplacementMap in="SourceGraphic" scale="20" yChannelSelector="G">
        <feFuncR type="table" tableValues="0 1" />
      </feDisplacementMap>
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="green"
    filter="url(#displacementFilter)" />
</svg>
```

We can access the `yChannelSelector` attribute and get its value:

```js
const displacementMap = document.querySelector("feDisplacementMap");

console.log(displacementMap.yChannelSelector.baseVal); // Output: 2 (SVG_CHANNEL_G)
```

## See also

- `SVGAnimatedEnumeration`
