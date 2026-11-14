---
title: "SVGFEGaussianBlurElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfegaussianblurelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement: in1 property

The **`in1`** read-only property of the `SVGFEGaussianBlurElement` interface reflects the `in` attribute of the given `<feGaussianBlur>` element.

## Value

An `SVGAnimatedString` object.

## Examples

In this example, two `<feGaussianBlur>` elements are defined in a filter, each with a different `in` attribute.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="gaussian-blur-filter">
      <!-- Gaussian blur applied to the SourceGraphic -->
      <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="5"
        result="blurred-source" />
      <!-- Gaussian blur applied to the BackgroundImage -->
      <feGaussianBlur
        in="BackgroundImage"
        stdDeviation="10"
        result="blurred-background" />
    </filter>
  </defs>

  <!-- Rectangle with SourceGraphic blur effect -->
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="rebeccapurple"
    filter="url(#gaussian-blur-filter)" />

  <!-- Circle with BackgroundImage blur effect -->
  <circle
    cx="150"
    cy="100"
    r="50"
    fill="hotpink"
    filter="url(#gaussian-blur-filter)" />
</svg>
```

We can access the `in` attribute:

```js
// Get all feGaussianBlur elements
const gaussianBlurs = document.querySelectorAll("feGaussianBlur");

// Access the 'in' attribute values
console.log(gaussianBlurs[0].in1.baseVal); // Output: "SourceGraphic"
console.log(gaussianBlurs[1].in1.baseVal); // Output: "BackgroundImage"
```

## See also

- `SVGAnimatedString`
