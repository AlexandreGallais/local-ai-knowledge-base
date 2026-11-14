---
title: "SVGFECompositeElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecompositeelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFECompositeElement: in1 property

The **`in1`** read-only property of the `SVGFECompositeElement` interface reflects the `in` attribute of the given `<feComposite>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feComposite>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter1">
    <feImage
      href="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
      width="200" />
    <feComposite in="SourceGraphic" operator="over" />
    <feComposite in="SourceGraphic" operator="in" />
  </filter>
  <circle cx="50" cy="50" r="30" filter="url(#filter1)" />
</svg>
```

We can access the `in` attribute:

```js
const composites = document.querySelectorAll("feComposite");

console.log(composites[0].in1.baseVal); // output: "SourceGraphic"
console.log(composites[1].in1.baseVal); // output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
