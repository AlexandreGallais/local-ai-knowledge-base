---
title: "SVGFEGaussianBlurElement: stdDeviationX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfegaussianblurelement/stddeviationx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement: stdDeviationX property

The **`stdDeviationX`** read-only property of the `SVGFEGaussianBlurElement` interface reflects the (possibly automatically computed) X component of the `stdDeviation` attribute of the given `<feGaussianBlur>` element.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `stdDeviationX` attribute

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="gaussian-blur-filter">
      <!-- Apply Gaussian Blur with stdDeviationX set to 5 and stdDeviationY set to 10 -->
      <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="5 10"
        result="blurred-graphic" />
    </filter>
  </defs>

  <!-- Rectangle with a Gaussian blur effect -->
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="hotpink"
    filter="url(#gaussian-blur-filter)" />
</svg>
```

```js
// Select the feGaussianBlur element
const gaussianBlur = document.querySelector("feGaussianBlur");

// Access the stdDeviationX value
console.log(gaussianBlur.stdDeviationX.baseVal); // Output: 5
```

## See also

- `SVGAnimatedNumber`
