---
title: "edgeMode"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/edgemode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# edgeMode

The **`edgeMode`** attribute determines how to extend the input image as necessary with color values so that the matrix operations can be applied when the kernel is positioned at or near the edge of the input image.

You can use this attribute with the following SVG elements:

- `<feConvolveMatrix>`
- `<feGaussianBlur>`

## feConvolveMatrix

For `<feConvolveMatrix>`, `edgeMode` determines how to extend the input image as necessary with color values so that the matrix operations can be applied when the kernel is positioned at or near the edge of the input image.

       | Value
       | `duplicate` | `wrap` | `none`

       | Default value
       | `duplicate`

       | Animatable
       | Yes

- `duplicate`
    This value indicates that the input image is extended along each of its borders as necessary by duplicating the color values at the given edge of the input image.
- `wrap`
    This value indicates that the input image is extended by taking the color values from the opposite edge of the image.
- `none`
    This value indicates that the input image is extended with pixel values of zero for R, G, B and A.

## feGaussianBlur

For `<feGaussianBlur>`, `edgeMode` determines how to extend the input image as necessary with color values so that the matrix operations can be applied when the kernel is positioned at or near the edge of the input image.

       | Value
       | `duplicate` | `wrap` | `none`

       | Default value
       | `none`

       | Animatable
       | Yes

- `duplicate`
    This value indicates that the input image is extended along each of its borders as necessary by duplicating the color values at the given edge of the input image.
- `wrap`
    This value indicates that the input image is extended by taking the color values from the opposite edge of the image.
- `none`
    This value indicates that the input image is extended with pixel values of zero for R, G, B and A.
