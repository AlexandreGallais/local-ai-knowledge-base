---
title: "kernelMatrix"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/kernelmatrix/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# kernelMatrix

The **`kernelMatrix`** attribute defines the list of numbers that make up the kernel matrix for the `<feConvolveMatrix>` element.

Values are separated by space characters and/or a comma. The number of entries in the list must equal to `<orderX>` by `<orderY>` as defined in the `order` attribute.

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
  <filter id="convolveMatrix1" x="0" y="0" width="100%" height="100%">
    <feConvolveMatrix kernelMatrix="1 1 0 0 0 0 0 0 -1" />
  </filter>
  <filter id="convolveMatrix2" x="0" y="0" width="100%" height="100%">
    <feConvolveMatrix kernelMatrix="-1 0 0 0 0 0 0 0 1" />
  </filter>

  <image
    href="mdn_logo_only_color.png"
    width="200"
    height="200"
    filter="url(#convolveMatrix1)" />
  <image
    x="220"
    href="mdn_logo_only_color.png"
    width="200"
    height="200"
    filter="url(#convolveMatrix2)" />
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;list of numbers></code
        >

       | Default value
       | None

       | Animatable
       | Yes

- `<list of numbers>`
    The list of `number`s that make up the kernel matrix for the convolution. Values are separated by space characters and/or a comma. The number of entries in the list must equal `<orderX>` times `<orderY>`.

    If the result of `orderX` \* `orderY` is not equal to the number of entries in the value list, the filter primitive acts as a pass through filter.
