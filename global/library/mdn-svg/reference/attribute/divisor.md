---
title: "divisor"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/divisor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# divisor

The **`divisor`** attribute specifies the value by which the resulting number of applying the `kernelMatrix` of a `<feConvolveMatrix>` element to the input image color value is divided to yield the destination color value.

A divisor that is the sum of all the matrix values tends to have an evening effect on the overall color intensity of the result.

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
    <feConvolveMatrix kernelMatrix="1 2 0 0 0 0 0 0 -1" divisor="1" />
  </filter>
  <filter id="convolveMatrix2" x="0" y="0" width="100%" height="100%">
    <feConvolveMatrix kernelMatrix="1 2 0 0 0 0 0 0 -1" divisor="8" />
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
       | `number`

       | Default value
       |
        Sum of all values in `kernelMatrix` or
        `1` if sum is 0

       | Animatable
       | Yes

- `<number>`
    This value defines the divisor. If the specified divisor is `0` then the default value will be used instead.
