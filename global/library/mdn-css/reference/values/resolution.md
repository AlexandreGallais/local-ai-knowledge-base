---
title: "`<resolution>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/resolution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<resolution>` CSS type

The **`<resolution>`** CSS data type, used for describing resolutions in media queries, denotes the pixel density of an output device, i.e., its resolution.

On screens, the units are related to _CSS_ inches, centimeters, or pixels, not physical values.

## Syntax

The `<resolution>` data type consists of a strictly positive `<number>` followed by one of the units listed below. As with all CSS dimensions, there is no space between the unit literal and the number.

### Units

- `dpi`
    Represents the number of dots per inch. Screens typically contains 72 or 96 dots per inch, but the dpi for printed documents is usually much greater. As 1 inch is 2.54 cm, `1dpi ≈ 0.39dpcm`.
- `dpcm`
    Represents the number of dots per centimeter. As 1 inch is 2.54 cm, `1dpcm ≈ 2.54dpi`.
- `dppx`
    Represents the number of dots per `px` unit. Due to the 1:96 fixed ratio of CSS `in` to CSS `px`, `1dppx` is equivalent to `96dpi`, which corresponds to the default resolution of images displayed in CSS as defined by `image-resolution`.
- `x`
    Alias for `dppx`.

> **Note:**
> Although the number `0` is always the same regardless of unit, the unit may not be omitted. In other words, `0` is invalid and does not represent `0dpi`, `0dpcm`, or `0dppx`.

## Examples

### Use in a media query

```css
@media print and (resolution >= 300dpi) {
  /* … */
}

@media (resolution: 120dpcm) {
  /* … */
}

@media (resolution >= 2dppx) {
  /* … */
}

@media (resolution: 1x) {
  /* … */
}
```

### Valid resolutions

```plain
96dpi
50.82dpcm
3dppx
```

### Invalid resolutions

```plain
72 dpi     Spaces are not allowed between the number and the unit.
ten dpi    The number must use digits only.
0          The unit is required.
```

## See also

- resolution media feature
- The `image-resolution` property
- Using @media queries
