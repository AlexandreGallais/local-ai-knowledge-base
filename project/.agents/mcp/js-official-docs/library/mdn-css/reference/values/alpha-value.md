---
title: "`<alpha-value>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/alpha-value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<alpha-value>` CSS type

The **`<alpha-value>`** CSS data type represents a value that can be either a `<number>` or a `<percentage>`, specifying the **alpha channel** or **transparency** of a color.

## Syntax

The value of an `<alpha-value>` is given as either a `number` or a `percentage`.

If given as a number, the useful range is 0 (fully transparent) to 1.0 (fully opaque), with decimal values in between; that is, 0.5 indicates that half of the foreground color is used and half of the background color is used. Values outside the range of 0 to 1 are permitted, but are clamped to lie within the range 0 to 1.

If the alpha value is given as a percentage, 0% corresponds to fully transparent while 100% indicates fully opaque.

## Interpolation

When animated, values of the `<alpha-value>` CSS data type are interpolated as real, floating-point numbers. The speed of the interpolation is determined by the easing function associated with the animation.

## Examples

### Setting text color opacity

The `rgb()` function accepts a fourth optional value to specify an alpha value.
The following example shows how to apply a color with 60% opacity using the alpha value:

```css
/* <rgb()> */
color: rgb(34 12 64 / 60%);
```

### Setting shape image threshold

Here an alpha value is used to determine which parts of an image are considered part of a shape:

```css
/* shape-image-threshold */
shape-image-threshold: 70%;
shape-image-threshold: 0.7;
```

## See also

- Learn: Fundamental text and font styling
- CSS data types
- CSS Color
- `<color>`
