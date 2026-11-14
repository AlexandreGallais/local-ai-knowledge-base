---
title: "colorsys --- Conversions between color systems"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/colorsys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `colorsys` --- Conversions between color systems

Module `colorsys`.

**Source code:** Lib/colorsys.py

The `colorsys` module defines bidirectional conversions of color values
between colors expressed in the RGB (Red Green Blue) color space used in
computer monitors and three other coordinate systems: YIQ, HLS (Hue Lightness
Saturation) and HSV (Hue Saturation Value).  Coordinates in all of these color
spaces are floating-point values.  In the YIQ space, the Y coordinate is between
0 and 1, but the I and Q coordinates can be positive or negative.  In all other
spaces, the coordinates are all between 0 and 1.

> **See also:** More information about color spaces can be found at
> https://www.poynton.ca/pdf/ColourFAQ.pdf and
> https://www.cambridgeincolour.com/tutorials/color-spaces.htm.

The `colorsys` module defines the following functions:

### `rgb_to_yiq(r, g, b)`

Convert the color from RGB coordinates to YIQ coordinates.

### `yiq_to_rgb(y, i, q)`

Convert the color from YIQ coordinates to RGB coordinates.

### `rgb_to_hls(r, g, b)`

Convert the color from RGB coordinates to HLS coordinates.

### `hls_to_rgb(h, l, s)`

Convert the color from HLS coordinates to RGB coordinates.

### `rgb_to_hsv(r, g, b)`

Convert the color from RGB coordinates to HSV coordinates.

### `hsv_to_rgb(h, s, v)`

Convert the color from HSV coordinates to RGB coordinates.

Example:

```
>>> import colorsys
>>> colorsys.rgb_to_hsv(0.2, 0.4, 0.4)
(0.5, 0.5, 0.4)
>>> colorsys.hsv_to_rgb(0.5, 0.5, 0.4)
(0.2, 0.4, 0.4)
```
