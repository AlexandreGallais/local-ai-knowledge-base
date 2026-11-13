---
title: "SVGFECompositeElement: in2 property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfecompositeelement/in2/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFECompositeElement: in2 property

The **`in2`** read-only property of the `SVGFECompositeElement` interface reflects the `in2` attribute of the given `<feComposite>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feComposite>` elements are defined in a filter, each with a different `in2` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter1">
    <feImage
      href="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
      width="200" />
    <feComposite in2="SourceAlpha" operator="over" />
    <feComposite in2="SourceAlpha" operator="in" />
  </filter>
  <circle cx="50" cy="50" r="30" filter="url(#filter1)" />
</svg>
```

We can access the `in2` attribute:

```js
const composites = document.querySelectorAll("feComposite");

console.log(composites[0].in2.baseVal); // output: "SourceAlpha"
console.log(composites[1].in2.baseVal); // output: "SourceAlpha"
```

## See also

- `SVGAnimatedString`
