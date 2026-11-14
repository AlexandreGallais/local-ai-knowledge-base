---
title: "`color-gamut` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/color-gamut/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color-gamut` CSS media feature

The **`color-gamut`** CSS media feature is used to apply CSS styles based on the approximate range of color gamut supported by the user agent and the output device.

## Syntax

The `color-gamut` feature is specified as one of the following color spaces as keyword values:

- `srgb`
    The user agent and the output device can support approximately the sRGB gamut or more. This includes the vast majority of color displays.
- `p3`
    The user agent and the output device can support approximately the gamut specified by the Display P3 color space or more. The P3 gamut is larger than and includes the sRGB gamut.
- `rec2020`
    The user agent and the output device can support approximately the gamut specified by the ITU-R Recommendation BT.2020 color space or more. The REC. 2020 gamut is larger than and includes the P3 gamut.

## Examples

### HTML

```html
<p>This is a test.</p>
```

### CSS

```css
p {
  padding: 10px;
  border: solid;
}

@media (color-gamut: srgb) {
  p {
    background: #f4ae8a;
  }
}
```

## See also

- `color()` function to specify colors in a defined colorspace.
- CSS colors module
- `@media` at-rule that is used to specify the color-gamut expression.
- Using media queries to understand when and how to use a media query.
- CSS media queries module
- sRGB on Wikipedia
