---
title: "SVGFEGaussianBlurElement: setStdDeviation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfegaussianblurelement/setstddeviation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement: setStdDeviation() method

The `setStdDeviation()` method of the `SVGFEGaussianBlurElement` interface sets the values for the `stdDeviation` attribute.

## Syntax

```js
setStdDeviation(x, y)
```

### Parameters

- `x`
    A float representing X component of the `stdDeviation` attribute.
- `y`
    A float representing Y component of the `stdDeviation` attribute.

### Return value

None (`undefined`).

## Examples

### Using `setStdDeviation()`

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="gaussian-blur-filter">
      <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="5 5"
        result="blurred-graphic" />
    </filter>
  </defs>

  <!-- Rectangle with an initial blur effect -->
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="hotpink"
    filter="url(#gaussian-blur-filter)" />
</svg>

<!-- Button to update the blur -->
<button id="updateBlur">Update Blur</button>
```

```js
// Get the feGaussianBlur element
const gaussianBlur = document.querySelector("feGaussianBlur");

// Button to trigger the update
document.getElementById("updateBlur").addEventListener("click", () => {
  // Change the standard deviation (blur radius) of the blur effect
  gaussianBlur.setStdDeviation(15, 20); // Update to X: 15, Y: 20
});
```

## See also

- `SVGAnimatedLength`
