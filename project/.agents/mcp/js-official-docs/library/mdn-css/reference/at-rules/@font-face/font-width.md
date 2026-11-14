---
title: "`font-width` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-face/font-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-width` CSS at-rule descriptor

> **Note:**
> The `font-width` descriptor is the modern replacement for the `@font-face/font-stretch` descriptor, which is a legacy alias. While `font-width` is the specification's preferred name, `font-stretch` currently has broader browser support. Check the fallback example and browser compatibility table for details.

The **`font-width`** CSS descriptor allows authors to specify a normal, condensed, or expanded face for the fonts specified in the `@font-face` at-rule.

For a particular font family, authors can download various font faces corresponding to the different styles of the same font family, and then use the `font-width` descriptor to specify the font face's width explicitly. The available `font-width` descriptor values are the same as those of the corresponding `font-width` property.

## Syntax

```css
/* Single values */
font-width: ultra-condensed;
font-width: extra-condensed;
font-width: condensed;
font-width: semi-condensed;
font-width: normal;
font-width: semi-expanded;
font-width: expanded;
font-width: extra-expanded;
font-width: ultra-expanded;
font-width: 50%;
font-width: 100%;
font-width: 200%;

/* Multiple values */
font-width: 75% 125%;
font-width: condensed ultra-condensed;
```

The `font-width` descriptor can take a single value from the list below.

### Values

- `normal`
    Specifies a normally condensed font face.
- `semi-condensed`, `condensed`, `extra-condensed`, `ultra-condensed`
    Specifies a more condensed font face than normal, with ultra-condensed being the most condensed.
- `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`
    Specifies a more expanded font face than normal, with ultra-expanded being the most expanded.
- `<percentage>`
    A `<percentage>` value between 50% and 200% (inclusive). Negative values are not allowed for this descriptor.

In earlier versions of the `font-width` specification, the descriptor accepts only the nine keyword values. CSS Fonts Level 4 extends the syntax to accept a `<percentage>` value as well. This enables variable fonts to offer a continuous variation of character widths. For TrueType or OpenType variable fonts, the `wdth` variation is used to implement varying widths.

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

### Setting a percentage range for font-width

The following example uses the League Mono font. It synthesizes different font families from the same font file using the `font-width` descriptor with different keywords and percentages.

```html
<p>League Mono</p>
<p>League Mono</p>
<p>League Mono</p>
```

```css
@font-face {
  font-family: "League Mono Ultra Condensed";
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-width: ultra-condensed; /* same as 50% */
}

@font-face {
  font-family: "League Mono Normal";
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-width: 100%; /* same as normal */
}

@font-face {
  font-family: "League Mono Ultra Expanded";
  src: url("/shared-assets/fonts/LeagueMono-VF.ttf") format("truetype");
  font-width: ultra-expanded; /* same as 200% */
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

### Providing a font-stretch fallback

Because `font-width` does not yet have broad browser support, you may want to include the legacy `@font-face/font-stretch` descriptor as a fallback. Place `font-stretch` before `font-width` so that supporting browsers use the modern descriptor:

```css
@font-face {
  font-family: "MyFont";
  src: url("my-font.woff2") format("woff2");
  font-stretch: condensed; /* for browsers that don't support font-width */
  font-width: condensed;
}
```

> **Note:**
> You can automate this fallback pattern using the postcss-preset-env plugin for PostCSS, which includes the postcss-font-width-property transform to convert `font-width` declarations to `font-stretch` automatically.

## See also

- Legacy `@font-face/font-stretch` alias descriptor with better browser support
- `font-display` descriptor
- `font-family` descriptor
- `font-weight` descriptor
- `font-style` descriptor
- `font-feature-settings` property
- `font-variation-settings` descriptor
- `src` descriptor
- `unicode-range` descriptor
