---
title: "preserveAlpha"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/preservealpha/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# preserveAlpha

the `preserveAlpha` attribute indicates how a `<feConvolveMatrix>` element handles alpha transparency.

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
    <feConvolveMatrix kernelMatrix="1 -1 2 0 0 0 0 0 -2" preserveAlpha="true" />
  </filter>
  <filter id="convolveMatrix2" x="0" y="0" width="100%" height="100%">
    <feConvolveMatrix
      kernelMatrix="1 -1 2 0 0 0 0 0 -2"
      preserveAlpha="false" />
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

       | Default value
       | `false`

       | Value
       | `true` | `false`

       | Animatable
       | Yes

- `true`
    This value indicates that the convolution is applied only to the color channels. In this case, the filter temporarily removes alpha premultiplication from the color component values, applies the kernel, and then reapplies alpha premultiplication as a final step.
- `false`
    This value indicates that the convolution is applied to all channels, including the alpha channel.
