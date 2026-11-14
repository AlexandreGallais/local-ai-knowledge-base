---
title: "`device-cmyk()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/color_value/device-cmyk/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `device-cmyk()` CSS function

The **`device-cmyk()`** functional notation is used to express CMYK colors in a device dependent way, specifying the cyan, magenta, yellow, and black components.

This approach to color is useful when creating material to be output to a particular printer, when the output for particular ink combinations is known. CSS processors may attempt to approximate the color for other media; however, the end result is likely to be different from the printed result without knowing the precise output colorimetry. A `@color-profile` declaration for `device-cmyk` can specify the exact color profile for conversion.

## Syntax

```css
device-cmyk(0 81% 81% 30%);
device-cmyk(none 0.81 0.81 0.3);
device-cmyk(0 81% 81% 30% / .5);
```

### Values

Functional notation: `device-cmyk(C M Y K[ / A])`

- `C`, `M`, `Y`, `K`
    Each a `number` between `0` and `1`, a `percentage` between `0%` and `100%`, or the keyword `none` providing the cyan, magenta, yellow, and black components of CMYK color.
    > **Note:**
    > See Missing color components for more information on the effect of `none`.

- `A` (optional)
    An `<alpha-value>` representing the alpha channel value of the color, where the number `0` corresponds to `0%` (fully transparent) and `1` corresponds to `100%` (fully opaque). Additionally, the keyword `none` can be used to explicitly specify no alpha channel.

## Browser compatibility

Currently, no browsers support this feature.

## See also

- CSS colors module
- `@page`
