---
title: "SVGFEDisplacementMapElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedisplacementmapelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDisplacementMapElement: in1 property

The **`in1`** read-only property of the `SVGFEDisplacementMapElement` interface reflects the `in` attribute of the given `<feDisplacementMap>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feDisplacementMap>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="filter1">
      <!-- First Displacement Map -->
      <feDisplacementMap in="SourceGraphic" scale="20">
        <feFuncR type="table" tableValues="0 1" />
      </feDisplacementMap>

      <!-- Second Displacement Map -->
      <feDisplacementMap in="BackgroundImage" scale="30">
        <feFuncR type="table" tableValues="0.5 1" />
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
  <circle cx="100" cy="100" r="50" fill="blue" filter="url(#filter1)" />
</svg>
```

We can access the `in` attribute:

```js
const displacementMaps = document.querySelectorAll("feDisplacementMap");

console.log(displacementMaps[0].getAttribute("in")); // Output: "SourceGraphic"
console.log(displacementMaps[1].getAttribute("in")); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
