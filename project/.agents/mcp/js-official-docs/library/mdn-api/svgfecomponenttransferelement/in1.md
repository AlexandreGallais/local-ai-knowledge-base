---
title: "SVGFEComponentTransferElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecomponenttransferelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEComponentTransferElement: in1 property

The **`in1`** read-only property of the `SVGFEComponentTransferElement` interface reflects the `in` attribute of the given `<feComponentTransfer>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feComponentTransfer>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter1">
    <feComponentTransfer in="SourceGraphic">
      <feFuncR type="table" tableValues="0 1" />
    </feComponentTransfer>
    <feComponentTransfer in="BackgroundImage">
      <feFuncR type="table" tableValues="0.5 1" />
    </feComponentTransfer>
  </filter>
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
const componentTransfers = document.querySelectorAll("feComponentTransfer");

console.log(componentTransfers[0].in1.baseVal); // Output: "SourceGraphic"
console.log(componentTransfers[1].in1.baseVal); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
