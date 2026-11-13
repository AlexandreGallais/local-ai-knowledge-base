---
title: "SVGFEDropShadowElement: stdDeviationX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedropshadowelement/stddeviationx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDropShadowElement: stdDeviationX property

The **`stdDeviationX`** read-only property of the `SVGFEDropShadowElement` interface reflects the (possibly automatically computed) X component of the `stdDeviation` attribute of the given `<feDropShadow>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `stdDeviationX` value

In this example, we retrieve the horizontal standard deviation for the blur operation of the `<feDropShadow>` by using the `stdDeviationX` read-only property of the `SVGFEDropShadowElement` interface.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="drop-shadow-filter">
      <!-- Drop Shadow with stdDeviationY property set to 10 for vertical blur -->
      <feDropShadow
        in="SourceGraphic"
        dx="10"
        dy="10"
        stdDeviation="5 10"
        flood-color="gray" />
    </filter>
  </defs>

  <!-- Rectangle with a gray shadow -->
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="red"
    filter="url(#drop-shadow-filter)" />
</svg>
```

```js
const dropShadow = document.querySelector("feDropShadow");

console.log(dropShadow.stdDeviationX.baseVal); // Output: 5
```

## See also

- `SVGAnimatedNumber`
