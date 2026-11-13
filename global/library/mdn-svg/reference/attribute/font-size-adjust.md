---
title: "font-size-adjust"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/font-size-adjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# font-size-adjust

The `font-size-adjust` attribute allows authors to specify an aspect value for an element that will preserve the x-height of the first choice font in a substitute font.

> **Note:**
> As a presentation attribute, `font-size-adjust` also has a CSS property counterpart: `font-size-adjust`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  width="600"
  height="80"
  viewBox="0 0 500 80"
  xmlns="http://www.w3.org/2000/svg">
  <text y="20" font-family="Times, serif" font-size="10px">
    This text uses the Times font (10px), which is hard to read in small sizes.
  </text>
  <text y="40" font-family="Verdana, sans-serif" font-size="10px">
    This text uses the Verdana font (10px), which has relatively large lowercase
    letters.
  </text>
  <text
    y="60"
    font-family="Times, serif"
    font-size="10px"
    font-size-adjust="0.58">
    This is the 10px Times, but now adjusted to the same aspect ratio as the
    Verdana.
  </text>
</svg>
```

## Usage notes

       | Default value
       | `none`

       | Value
       | `none` | `number`

       | Animatable
       | Yes

- `none`
    Choose the size of the font based only on the `font-size` property.
- `<number>`
    Choose the size of the font so that its lowercase letters (as determined by the x-height of the font) are the specified number times the `font-size`.

    The number specified should generally be the aspect ratio (ratio of x-height to font size) of the first choice `font-family`. This means that the first-choice font, when available, will appear the same size in browsers, whether or not they support `font-size-adjust`.

    `0` yields text of zero height (hidden text).

## See also

- CSS `font-size-adjust` property
