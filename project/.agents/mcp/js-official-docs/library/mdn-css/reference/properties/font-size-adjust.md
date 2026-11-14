---
title: "`font-size-adjust` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-size-adjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-size-adjust` CSS property

The **`font-size-adjust`** CSS property adjusts the size of a font to match a chosen font metric, such as the height of lowercase letters, to a specified proportion of the `font-size`. This property is intended for adjusting fallback fonts to have similar metrics as the first-choice font.

Legibility can become an issue when the first-choice `font-family` is unavailable and its replacement fallback font has a significantly different aspect value (height of lowercase letters divided by font size). Legibility of fonts, especially at small font sizes, is determined more by the size of lowercase letters than by the size of uppercase letters. The `font-size-adjust` property is useful for adjusting the font size of fallback fonts to keep the aspect value across fonts consistent, ensuring that the text appears similar regardless of the font used.

## Syntax

```css
/* Keyword value */
font-size-adjust: none;

/* One value: <number> or from-font */
font-size-adjust: 0.5;
font-size-adjust: from-font;

/* Two values */
font-size-adjust: ex-height 0.5;
font-size-adjust: ch-width from-font;

/* Global values */
font-size-adjust: inherit;
font-size-adjust: initial;
font-size-adjust: revert;
font-size-adjust: revert-layer;
font-size-adjust: unset;
```

### Values

This property is specified as the keyword `none`, or one (`<number>` or `from-font`) or two (`` and either `<number>` or `from-font`) values.

- `none`
    No font size adjustment is applied.
- `` (optional)
    Defines the font metric to use for adjusting the font size. Defaulting to `ex-height`, this parameter is specified as one of the following keywords:
    - `ex-height`
        Uses the ratio of x-height (height of lowercase "x" in a font) to font size (aspect value) to adjust the font size. This keyword value is used to normalize lowercase letters across fonts.
    - `cap-height`
        Uses the ratio of cap-height (height of uppercase letters) to font size to adjust the font size. This keyword value is used to normalize uppercase letters across fonts.
    - `ch-width`
        Uses the ratio of the advance width (horizontal space taken up by a character in a font) of the character "0" (ZERO, U+0030) to font size. This keyword value is used to normalize horizontal narrow pitch of fonts.
    - `ic-width`
        Uses the ratio of the advance width of the character "水" (CJK water ideograph, U+6C34) to font size. This keyword value is used to normalize horizontal wide pitch of fonts, particularly those that include CJK (Chinese, Japanese, Korean) characters.
    - `ic-height`
        Uses the ratio of the advance height (vertical space taken up by a character in a font) of the character "水" (CJK water ideograph, U+6C34) to font size. This keyword value is used to normalize vertical wide pitch of fonts, particularly those that include CJK characters.

- `<number>`
    The proportion to adjust the font size used, depending on the specified ``.

    When a `` value is specified, the `<number>` value adjusts the font size as per the chosen `` to maintain a consistent appearance for the specified font metric across different fonts.

    The `<number>` value accepts any number from `0` to infinity. `0` yields text of zero height (that is, the text is hidden). Negative values are invalid.

- `from-font`
    Uses the `<number>` value for the specified `` from the first available font.

## Description

The `font-size-adjust` property adjusts the size of a font to match a chosen font metric, such as the height of lowercase letters, to a specified proportion of the `font-size`. The adjustment is applied to each font used to render text, not only to fallback fonts.

Setting a `<number>` adjusts the font size based on the default or stated ``. For example, when set to `ex-height`, the `<number>` value adjusts the selected font size so the height of its `x` glyph is the specified multiple of the font size. This value should generally match the aspect value (ratio of x-height to font size) of the first-choice font. This means that the first-choice font, when available, will display consistently across browsers. Selecting a different value also scales the first-choice font, but in this case, you should prefer to change the `font-size` instead.

> **Note:**
> If the specified `` has been overridden in `@font-face`, e.g., by using the `size-adjust` descriptor, then the overridden metric will be used in the `font-size-adjust` calculation. This means that when `font-size-adjust` and `size-adjust` are applied together, `size-adjust` does not have any effect.

> **Note:**
> Font metrics like x-height and cap height can vary between font faces (such as bold or italic variants) within the same `font-family`. When `font-size-adjust` uses `from-font` or a fixed value, the metrics of each font face are adjusted independently, regardless of the relative differences between font faces in the same font family.

The adjusted font size is calculated using the formula `u  =  ( m / m′ ) s`, where:

- `m` is the desired ratio specified by `<number>` or obtained using `from-font`.
- `m′` is the ratio of the chosen metric to the font size in the font being adjusted.
- `s` is the value of the `font-size` property.
- `u` is the new, adjusted font size.

Consider this example to see how the adjusted font size is calculated. A first-choice font has a `font-size` of `12px` (`s`), and the ratio of `cap-height` to font size is `0.20` (`m`). The `cap-height` to font size ratio in the fallback font is `0.15` (`m′`). The `font-size-adjust` value has been specified as `cap-height 0.20`. If the primary font is unavailable, the adjusted font size of the fallback font will be calculated to be `16px` (`(0.20 / 0.15) * 12`). This will ensure that the `cap-height` of the fallback font is similar to that of the first-choice font when displayed.

## Examples

### Normalizing font size by lowercase and uppercase letters

This example demonstrates how the `font-size-adjust` property can be used to retain the same aspect value across fonts. The Verdana font has a relatively high aspect value of `0.545`, which means that the lowercase letters are relatively tall compared to uppercase letters. This makes the text in small font sizes appear legible. However, the Times font has a lower aspect value of `0.447`, so the text is less legible at small sizes. If Verdana is the first-choice font and Times is the fallback font, specifying the `font-size-adjust` property can help to retain the same aspect value in Times. So if the font falls back to Times, the text will maintain a similar level of legibility as it would have with Verdana.

Similarly, the cap-height to font size ratio in Verdana is `0.73` and that in Times is `0.66`. When `font-size-adjust` property is applied to Times to adjust its uppercase letters to match the ratio in Verdana, the Times font displays in adjusted font size ((0.73 / 0.66) \* 14) `15.48px`.

```html
<p class="verdana">
  A: This text uses the Verdana font (14px), which has relatively large
  lowercase letters.
</p>
<p class="times">
  B: This text uses the Times font (14px), which is hard to read in small sizes.
</p>
<p class="times adj-times-ex-height">
  C: This text in 14px Times font is adjusted to the same aspect value as the
  Verdana font, so lowercase letters are normalized across the two fonts.
</p>
<p class="times adj-times-cap-height">
  D: This text in 14px Times font is adjusted to the same cap-height to font
  size ratio as the Verdana font, so uppercase letters are normalized across the
  two fonts.
</p>
```

```css
.times {
  font-family: "Times", serif;
  font-size: 14px;
}

.verdana {
  font-family: "Verdana", sans-serif;
  font-size: 14px;
}

.adj-times-ex-height {
  font-size-adjust: 0.545;
}

.adj-times-cap-height {
  font-size-adjust: cap-height 0.73;
}
```

Without `font-size-adjust` in `B`, the switch from Verdana font to Times font could result in a noticeable decrease in legibility due to its lower aspect value.
In `C`, notice that only one value is specified for the `font-size-adjust` property, so the default `` value `ex-height` is used. `D` shows how the font would look compared to `A` if its uppercase letter height is adjusted.

### Determining the aspect value of a font

For a given font, the same content in two side-by-side `` elements can be used to determine the font's aspect value. If the same font size is used for content in both spans, the spans will match when the `font-size-adjust` value in one span is accurate for the given font.

In the example below, there are three pairs of side-by-side `` elements, each containing the letter "b". The goal is to adjust the `font-size-adjust` property for the right `` in each pair until the borders around the two letters align. The resulting `font-size-adjust` value can be considered the aspect value for the font.

Starting at `0.6` in the first pair and adjusting to `0.5` in the second, we continue adjusting the `font-size-adjust` property value until the borders around the "b" letters align perfectly in the third pair. In this example, the aspect value is determined to be `0.482`.

```html
<div>
  <p><span>b</span><span class="adjust1">b</span></p>
  0.6
</div>

<div>
  <p><span>b</span><span class="adjust2">b</span></p>
  0.5
</div>

<div>
  <p><span>b</span><span class="adjust3">b</span></p>
  0.482
</div>
```

```css
body {
  display: flex;
}

div {
  text-align: center;
}

p {
  margin: 0 30px 10px 30px;
}
```

```css
body {
  display: flex;
}

div {
  text-align: center;
}

p {
  font-family: "Futura", sans-serif;
  font-size: 50px;
}

span {
  border: solid 1px red;
}

.adjust1 {
  font-size-adjust: 0.6;
}

.adjust2 {
  font-size-adjust: 0.5;
}

.adjust3 {
  font-size-adjust: 0.482;
}
```

## See also

- `font-size`
- `font-weight`
- `size-adjust` `@font-face` descriptor
- SVG `font-size-adjust` attribute
- Learn: Fundamental text and font styling
