---
title: "Scaling SVG backgrounds (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/backgrounds_and_borders/scaling_svg_backgrounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scaling SVG backgrounds

Given the flexibility of SVG images, there's a lot to keep in mind when using them as background images with the `background-image` property, and even more to keep in mind when scaling them using the `background-size` property. This article describes how scaling of SVG images is handled when using these properties.

## The background sizing algorithm

The algorithm used to determine the background size of a background image can, for the most part, be summarized by these four rules. There are some edge cases that aren't covered by these rules, but this covers the majority of cases.

1. If `background-size` specifies a fixed dimension (that is, percentages and relative units are fixed by their context), that dimension wins.
2. If the image has an intrinsic ratio (that is, its width:height ratio is constant, such as 16:9, 4:3, 2.39:1, 1:1, and so forth), the rendered size preserves that ratio.
3. If the image specifies a size, and the size isn't modified by `constrain` or `cover`, that specified size wins.
4. If none of the above cases are met, the image is rendered at the same size as the background area.

It's worth noting that the background sizing algorithm only cares about the image's dimensions and proportions, or lack thereof. An SVG image with fixed dimensions will be treated just like a raster image of the same size.

> **Note:**
> If you are trying to stretch your SVG to a different aspect ratio with CSS—for example in order to stretch it over the page background—make sure your SVG includes `preserveAspectRatio="none"`. Find out more about `preserveAspectRatio`.

## Source image examples

Before diving in to look at the results of using different kinds of SVG source images and seeing how they look when used with `background-size`, it will be helpful to look at a few example source images that have different dimensions and sizing settings, which we will later use as our `background-image` values in our examples. The browser renders `` images as `300px` wide and `150px` tall by default.

### Dimensionless and proportionless

This SVG gradient image is both dimensionless and proportionless. It doesn't care what size it is, nor does it care about remaining at a particular aspect ratio. This would make a good gradient desktop background that would work regardless of your screen size and its aspect ratio.

```html
<svg>
  <title>Corner-to-corner gradient</title>
  <defs>
    <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
      <stop stop-color="pink" offset="0" />
      <stop stop-color="goldenrod" offset="1" />
    </linearGradient>
  </defs>
  <rect fill="url('#g')" width="100%" height="100%" />
</svg>
```

### One specified dimension and proportionless

This image specifies a width of 100 pixels but no height or intrinsic ratio. This is, basically, a thin strip of wallpaper that could be stretched across the entire height of a block.

```html
<svg width="100">
  <title>Vertical gradient, with a fixed width</title>
  <defs>
    <linearGradient id="g" x1="0%" x2="0%" y1="0%" y2="100%">
      <stop stop-color="purple" offset="0" />
      <stop stop-color="lime" offset="1" />
    </linearGradient>
  </defs>
  <rect fill="url('#g')" width="100%" height="100%" />
</svg>
```

### One specified dimension with intrinsic ratio

This image specifies a 100 pixel height but no width. It also specifies an intrinsic aspect ratio of 3:4. This ensures that its width:height ratio is always 3:4, unless it's deliberately scaled to a disproportionate size (that is, by explicitly specifying both width and height that aren't of that ratio).

This is very much like specifying a specific width and height; since once you have one dimension and a ratio, the other dimension is implied.

```html
<svg height="100" viewBox="0 0 3 4" preserveAspectRatio="none">
  <title>Vertical gradient, with a fixed height and intrinsic ratio</title>
  <defs>
    <linearGradient id="g" x1="0%" x2="0%" y1="0%" y2="100%">
      <stop stop-color="teal" offset="0" />
      <stop stop-color="orange" offset="1" />
    </linearGradient>
  </defs>
  <rect fill="url('#g')" width="100%" height="100%" />
</svg>
```

### No width or height with intrinsic ratio

This image doesn't specify either a width or a height; instead, it specifies an intrinsic ratio of 1:1. It's always square, and is usable at any size, such as 32x32, 128x128, or 512x512, for example.

```html
<svg viewBox="0 0 1 1" preserveAspectRatio="none">
  <title>Intrinsic ratio</title>
  <defs>
    <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="0%">
      <stop stop-color="navy" offset="0" />
      <stop stop-color="maroon" offset="1" />
    </linearGradient>
  </defs>
  <rect fill="url('#g')" width="100%" height="100%" />
</svg>
```
