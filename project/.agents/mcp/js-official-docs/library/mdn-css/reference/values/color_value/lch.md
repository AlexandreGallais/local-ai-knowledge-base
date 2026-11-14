---
title: "`lch()` CSS function (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/color_value/lch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `lch()` CSS function

The **`lch()`** functional notation expresses a given color using the LCH color space, which represents lightness, chroma, and hue. It uses the same `L` axis as the `lab()` color function of the CIELab color space, but it uses the polar coordinates `C` (Chroma) and `H` (Hue).

## Syntax

```css
/* Absolute values */
lch(29.2345% 44.2 27);
lch(52.2345% 72.2 56.2);
lch(52.2345% 72.2 56.2 / .5);

/* Relative values */
lch(from green l c h / 0.5)
lch(from #123456 calc(l + 10) c h)
lch(from hsl(180 100% 50%) calc(l - 10) c h)
lch(from var(--color-value) l c h / calc(alpha - 0.1))
```

### Values

Below are descriptions of the allowed values for both absolute and relative colors.

> **Note:**
> Usually when percentage values have a numeric equivalent in CSS, `100%` is equal to the number `1`.
> This is not the case for `lch()`. Here `100%` is equal to the number `100` for the `L` value and `150` for the `C` value.

#### Absolute value syntax

```plain
lch(L C H[ / A])
```

The parameters are as follows:

- `L`
    A `<number>` between `0` and `100`, a `<percentage>` between `0%` and `100%`, or the keyword `none` (equivalent to `0%`). The number `0` corresponds to `0%` (black), and the number `100` corresponds to `100%` (white). This value specifies the color's brightness in the CIELab color space.

    > **Note:**
    > The `L` in `lch()` is the perceived lightness, which refers to the "brightness" we visually perceive with our eyes. This is different from the `L` in `hsl()`, where it represents lightness as compared to other colors.

- `C`
    A `<number>`, a `<percentage>`, or the keyword `none` (equivalent to `0%` in this case). This value is a measure of the color's chroma (roughly representing the "amount of color"). Its minimum useful value is `0%`, or `0`, while its maximum is theoretically unbounded (but in practice does not exceed `230`), with `100%` being equivalent to `150`.

- `H`
    A `<number>`, an `angle`, or the keyword `none` (equivalent to `0deg`) representing the color's `hue` angle.

    > **Note:**
    > The angles corresponding to particular hues differ across the sRGB (used by `hsl()` and `hwb()`), CIELAB (used by `lch()`), and Oklab (used by `oklch()`) color spaces. See the hues in LCH example below and the `hue` reference page for more detail and examples.

- `A` (optional)
    An `<alpha-value>` representing the alpha channel value of the color, where the number `0` corresponds to `0%` (fully transparent) and `1` corresponds to `100%` (fully opaque). Additionally, the keyword `none` can be used to explicitly specify no alpha channel. If the `A` channel value is not explicitly specified, it defaults to 100%. If included, the value is preceded by a slash (`/`).

> **Note:**
> See Missing color components for more information on the effect of `none`.

#### Relative value syntax

```plain
lch(from <color> L C H[ / A])
```

The parameters are as follows:

- `from <color>`
    The keyword `from` is always included when defining a relative color, followed by a `<color>` value representing the **origin color**. This is the original color that the relative color is based on. The origin color can be _any_ valid `<color>` syntax, including another relative color.

- `L`
    A `<number>` between `0` and `100`, a `<percentage>` between `0%` and `100%`, or the keyword `none` (equivalent to `0%`). The number `0` corresponds to `0%` (black), and the number `100` corresponds to `100%` (white). This value specifies the color's brightness in the CIELab color space.

- `C`
    A `<number>`, a `<percentage>`, or the keyword `none` (equivalent to `0%` in this case). This value represents the output color's chroma value (roughly representing the "amount of color"). Its minimum useful value is `0%`, or `0`, while its maximum is theoretically unbounded (but in practice does not exceed `230`), with `100%` being equivalent to `150`.

- `H`
    A `<number>`, an `angle`, or the keyword `none` (equivalent to `0deg`) representing the output color's `hue` angle. See the hue example below.

- `A` (optional)
    An `<alpha-value>` representing the alpha channel value of the output color, where the number `0` corresponds to `0%` (fully transparent) and `1` corresponds to `100%` (fully opaque). Additionally, the keyword `none` can be used to explicitly specify no alpha channel. If the `A` channel value is not explicitly specified, it defaults to the alpha channel value of the origin color. If included, the value is preceded by a slash (`/`).

#### Defining relative color output channel components

When using relative color syntax inside an `lch()` function, the browser converts the origin color into an equivalent Lch color (if it is not already specified as such) The color is defined as three distinct color channel values — `l` (lightness), `c` (chroma), and `h` (hue) — plus an alpha channel value (`alpha`). These channel values are made available inside the function to be used when defining the output color channel values:

- The `l` channel value is resolved to a `<number>` between `0` and `100`, inclusive.
- The `c` channel value is resolved to a `<number>` between `0` and `150`, inclusive.
- The `h` channel value is resolved to a `<number>` between `0` and `360`, inclusive.
- The `alpha` channel is resolved to a `<number>` between `0` and `1`, inclusive.

When defining a relative color, the different channels of the output color can be expressed in several different ways. Below, we'll study some examples to illustrate these.

In the first two examples below, we are using relative color syntax. However, the first one outputs the same color as the origin color and the second one outputs a color not based on the origin color at all. They don't really create relative colors! You'd be unlikely to ever use these in a real codebase, and would probably just use an absolute color value instead. We included these examples as a starting point for learning about relative `lch()` syntax.

Let's start with an origin color of `hsl(0 100% 50%)` (equivalent to `red`). The following function outputs the same color as the origin color — it uses the origin color's `l`, `c`, and `h` channel values (`54.29`, `106.854`, and `40.856`) as the output channel values:

```css
lch(from hsl(0 100% 50%) l c h)
```

This function's output color is `lch(54.29 106.854 40.856)`.

The next function uses absolute values for the output color's channel values, outputting a completely different color not based on the origin color:

```css
lch(from hsl(0 100% 50%) 29.6871% 66.83 327.109)
```

In the above case, the output color is `lch(29.6871 66.83 327.109)`.

The following function creates a relative color based on the origin color:

```css
lch(from hsl(0 100% 50%) 70 150 h)
```

This example:

- Converts the `hsl()` origin color to an equivalent `lch()` color — `lch(54.29 106.854 40.856)`.
- Sets the `H` channel value for the output color to that of the origin `lch()` equivalent's `H` channel value — `40.856`.
- Sets the output color's `L` and `C` channel values to new values not based on the origin color: `70` and `150` respectively.

The final output color is `lch(70 150 40.856)`.

> **Note:**
> As mentioned above, if the output color is using a different color model to the origin color, the origin color is converted to the same model as the output color in the background so that it can be represented in a way that is compatible (i.e., using the same channels).

In the examples we've seen so far in this section, the alpha channels have not been explicitly specified for either the origin or output colors. When the output color alpha channel is not specified, it defaults to the same value as the origin color alpha channel. When the origin color alpha channel is not specified (and it is not a relative color), it defaults to `1`. Therefore, the origin and output alpha channel values are `1` for the above examples.

Let's look at some examples that specify origin and output alpha channel values. The first one specifies the output alpha channel value as being the same as the origin alpha channel value, whereas the second one specifies a different output alpha channel value, unrelated to the origin alpha channel value.

```css
lch(from hsl(0 100% 50% / 0.8) l c h / alpha)
/* Computed output color: lch(54.29 106.854 40.856 / 0.8) */

lch(from hsl(0 100% 50% / 0.8) l c h / 0.5)
/* Computed output color: lch(54.29 106.854 40.856 / 0.5) */
```

In the following example, the `hsl()` origin color is again converted to the `lch()` equivalent — `lch(54.29 106.854 40.856)`. `calc` calculations are applied to the `L`, `C`, `H`, and `A` values, resulting in an output color of `lch(74.29 86.8541 0.856018 / 0.9)`:

```css
lch(from hsl(0 100% 50%) calc(l + 20) calc(c - 20) calc(h - 40) / calc(alpha - 0.1))
```

> **Note:**
> Because the origin color channel values are resolved to `<number>` values, you have to add numbers to them when using them in calculations, even in cases where a channel would normally accept `<percentage>`, `<angle>`, or other value types. Adding a `<percentage>` to a `<number>`, for example, doesn't work.
