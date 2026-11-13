---
title: "`font-stretch` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-face/font-stretch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-stretch` CSS at-rule descriptor

> **Note:**
> The `font-stretch` descriptor was renamed to `@font-face/font-width` in the CSS Fonts specification. To preserve compatibility, the specification retains `font-stretch` as a legacy alias for the `font-width` descriptor.

The **`font-stretch`** CSS descriptor allows authors to specify a normal, condensed, or expanded face for the fonts specified in the `@font-face` at-rule.

For a particular font family, authors can download various font faces corresponding to the different styles of the same font family, and then use the `font-stretch` descriptor to specify the font face's stretch explicitly.

## Syntax

```css
/* Single values */
font-stretch: ultra-condensed;
font-stretch: extra-condensed;
font-stretch: condensed;
font-stretch: semi-condensed;
font-stretch: normal;
font-stretch: semi-expanded;
font-stretch: expanded;
font-stretch: extra-expanded;
font-stretch: ultra-expanded;
font-stretch: 50%;
font-stretch: 100%;
font-stretch: 200%;

/* Multiple values */
font-stretch: 75% 125%;
font-stretch: condensed ultra-condensed;
```

The `font-stretch` descriptor can take a single value from the list below.

### Values

- `normal`
    Specifies a normally condensed font face.
- `semi-condensed`, `condensed`, `extra-condensed`, `ultra-condensed`
    Specifies a more condensed font face than normal, with ultra-condensed being the most condensed.
- `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`
    Specifies a more expanded font face than normal, with ultra-expanded being the most expanded.
- `<percentage>`
    A `<percentage>` value between 50% and 200% (inclusive). Negative values are not allowed for this descriptor.

In earlier versions of the `font-stretch` specification, the descriptor accepts only the nine keyword values. CSS Fonts Level 4 extends the syntax to accept a `<percentage>` value as well. This enables variable fonts to offer a continuous variation of character widths. For TrueType or OpenType variable fonts, the `wdth` variation is used to implement varying widths.

If the font does not provide a face that exactly matches the given value, then values less than `100%` map to a condensed face, and values greater than or equal to `100%` map to an expanded face.

### Keyword to numeric mapping

The table below shows the mapping between keyword values and numeric percentages:

       | Keyword
       | Percentage

       | `ultra-condensed`
       | 50%

       | `extra-condensed`
       | 62.5%

       | `condensed`
       | 75%

       | `semi-condensed`
       | 87.5%

       | `normal`
       | 100%

       | `semi-expanded`
       | 112.5%

       | `expanded`
       | 125%

       | `extra-expanded`
       | 150%

       | `ultra-expanded`
       | 200%

### Variable fonts

Most fonts have a particular width that corresponds to one of the keyterm values. However, variable fonts can support a range of widths with fine granularity, giving the designer a greater degree of control over the chosen weight. For this, percentage ranges are useful.

For TrueType or OpenType variable fonts, the `wdth` variation is used to implement varying glyph widths.

## Accessibility

People with dyslexia and other cognitive conditions may have difficulty reading fonts that are too condensed, especially if the font has a low color contrast ratio.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.8 | W3C Understanding WCAG 2.0

## Examples

### Setting a percentage range for font-stretch

The following example uses the League Mono font. It synthesizes different font families from the same font file using the `font-stretch` descriptor with different keywords and percentages.

```html
<p>League Mono</p>
<p>League Mono</p>
<p>League Mono</p>
```

```css
@font-face {
  font-family: "League Mono Ultra Condensed";
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-stretch: ultra-condensed; /* same as 50% */
}

@font-face {
  font-family: "League Mono Normal";
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-stretch: 100%; /* same as normal */
}

@font-face {
  font-family: "League Mono Ultra Expanded";
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-stretch: ultra-expanded; /* same as 200% */
}

p:nth-child(1) {
  font-family: "League Mono Ultra Condensed", sans-serif;
}

p:nth-child(2) {
  font-family: "League Mono Normal", sans-serif;
}

p:nth-child(3) {
  font-family: "League Mono Ultra Expanded", sans-serif;
}
```

## See also

- Modern `@font-face/font-width` descriptor, replacing `font-stretch`
- `@font-face/font-display` descriptor
- `@font-face/font-family` descriptor
- `@font-face/font-weight` descriptor
- `@font-face/font-style` descriptor
- `font-feature-settings` descriptor
- `@font-face/font-variation-settings` descriptor
- `@font-face/src` descriptor
- `unicode-range` descriptor
