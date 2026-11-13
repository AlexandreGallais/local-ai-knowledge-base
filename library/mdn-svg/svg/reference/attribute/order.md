---
title: "order"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/order/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# order

The **`order`** attribute indicates the size of the matrix to be used by a `<feConvolveMatrix>` element.

You can use this attribute with the following SVG elements:

- `<feConvolveMatrix>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="emboss1" x="0" y="0" width="100%" height="100%">
    <feTurbulence baseFrequency="0.025" seed="0" />
    <feConvolveMatrix kernelMatrix="3 0 0 -4" order="2" />
  </filter>
  <filter id="emboss2" x="0" y="0" width="100%" height="100%">
    <feTurbulence baseFrequency="0.025" seed="0" />
    <feConvolveMatrix kernelMatrix="3 0 0 0 0 0 0 0 -4" order="3" />
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#emboss1)" />
  <rect x="220" y="0" width="200" height="200" filter="url(#emboss2)" />
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;number-optional-number></code
        >

       | Default value
       | `3`

       | Animatable
       | Yes

- `<number-optional-number>`
    This value indicates the number of cells in each dimension for the kernel matrix. The values provided must be `integer`s greater than zero. Values that are not integers will be truncated, i.e., rounded to the closest integer value towards zero. The first number, indicates the number of columns in the matrix. The second number, indicates the number of rows in the matrix. If no second number is not provided, it defaults to the first number.

    It is recommended that only small values (e.g., 3) be used; higher values may result in very high CPU overhead and usually do not produce results that justify the impact on performance.
