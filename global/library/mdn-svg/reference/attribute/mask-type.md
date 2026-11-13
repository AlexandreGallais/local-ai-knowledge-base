---
title: "mask-type"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/mask-type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# mask-type

The **`mask-type`** attribute indicates which mask mode, _alpha_ or _luminance_, to use for the contents of the `<mask>` element when masking.

You can use this attribute with the following SVG elements:

- `<mask>`

> **Note:**
> This presentation attribute has a CSS property counterpart: `mask-type`. When both are specified, the CSS property takes priority.

## mask

For `<mask>`, the `mask-type` defines whether the content of the mask element is treated as a luminance mask or an alpha mask.

       | Value
       | `alpha` | `luminance`

       | Default value
       | `luminance`

       | Animatable
       | Discrete

- `alpha`
    This value indicates that the `<mask>` element's alpha values should be used; the pixels of the masked object match the opaqueness of the mask areas, without regard to the luminance of the colors of the mask.
- `luminance`
    This value indicates that the `<mask>` element's luminance values should be used; the opaqueness of the masked object depends on the opacity and lightness of the mask. The opacity of a `luminance` mask is determined by the `R`, `G`, `B`, and `A` channels of the mask, using the equation `((0.2125 * R) + (0.7154 * G) + (0.0721 * B)) * A`.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Two identical masks other than the id and mask-type values -->
  <mask id="myMask1" mask-type="alpha">
    <rect
      fill="rgb(10% 10% 10% / 0.4)"
      x="0"
      y="0"
      width="100%"
      height="100%" />
    <circle fill="rgb(90% 90% 90% / 0.6)" cx="50" cy="50" r="35" />
  </mask>

  <mask id="myMask2" mask-type="luminance">
    <rect
      fill="rgb(10% 10% 10% / 0.4)"
      x="0"
      y="0"
      width="100%"
      height="100%" />
    <circle fill="rgb(90% 90% 90% / 0.6)" cx="50" cy="50" r="35" />
  </mask>

  <!-- The first rect is masked with an alpha mask -->
  <rect x="0" y="0" width="45" height="45" mask="url(#myMask1)" fill="red" />

  <!-- The last rect is masked with a luminance mask -->
  <rect x="55" y="0" width="45" height="45" mask="url(#myMask2)" fill="red" />
</svg>
```

## See also

- CSS `mask-type` property
- CSS `mask-mode` property
- Introduction to CSS masking
