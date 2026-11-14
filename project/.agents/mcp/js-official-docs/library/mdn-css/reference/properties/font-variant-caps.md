---
title: "`font-variant-caps` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-variant-caps/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-variant-caps` CSS property

The **`font-variant-caps`** CSS property controls the use of alternate glyphs used for small or petite capitals or for titling.

```css
font-variant-caps: normal;
```

```css
font-variant-caps: small-caps;
```

```css
font-variant-caps: all-small-caps;
```

```html
<section id="default-example">
  <div id="example-element">
    <p>Difficult waffles</p>
  </div>
</section>
```

```css
@font-face {
  font-family: "Fira Sans";
  src:
    local("FiraSans-Regular"),
    url("/shared-assets/fonts/FiraSans-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

section {
  font-family: "Fira Sans", sans-serif;
  margin-top: 10px;
  font-size: 1.5em;
}
```

## Syntax

```css
/* Keyword values */
font-variant-caps: normal;
font-variant-caps: small-caps;
font-variant-caps: all-small-caps;
font-variant-caps: petite-caps;
font-variant-caps: all-petite-caps;
font-variant-caps: unicase;
font-variant-caps: titling-caps;

/* Global values */
font-variant-caps: inherit;
font-variant-caps: initial;
font-variant-caps: revert;
font-variant-caps: revert-layer;
font-variant-caps: unset;
```

### Values

This property is specified as one of the following keyword values:

- `normal`
    Deactivates of the use of alternate glyphs.
- `small-caps`
    Enables display of small capitals (OpenType feature: `smcp`). Small-caps glyphs typically use the form of uppercase letters but are displayed using the same size as lowercase letters.
- `all-small-caps`
    Enables display of small capitals for both upper and lowercase letters (OpenType features: `c2sc`, `smcp`).
- `petite-caps`
    Enables display of petite capitals (OpenType feature: `pcap`).
- `all-petite-caps`
    Enables display of petite capitals for both upper and lowercase letters (OpenType features: `c2pc`, `pcap`).
- `unicase`
    Enables display of mixture of small capitals for uppercase letters with normal lowercase letters (OpenType feature: `unic`).
- `titling-caps`
    Enables display of titling capitals (OpenType feature: `titl`). Uppercase letter glyphs are often designed for use with lowercase letters. When used in all uppercase titling sequences they can appear too strong. Titling capitals are designed specifically for this situation.

## Description

The `font-variant-caps` property controls the use of alternate glyphs used for small or petite capitals or for titling.

When a given font includes capital letter glyphs of multiple different sizes, this property selects the most appropriate ones. If petite capital glyphs are not available, they are rendered using small capital glyphs. If these are not present, the browser synthesizes them from the uppercase glyphs.

The value is a single keyword. For each value, if the font doesn't support the OpenType value, then it synthesizes the glyphs. Fonts sometimes include special glyphs for various caseless characters (such as punctuation marks) to better match the capitalized characters around them. However, small capital glyphs are never synthesized for caseless characters.

### Language-specific rules

This property accounts for language-specific case mapping rules. For example:

- In Turkic languages, such as Turkish (tr), Azerbaijani (az), Crimean Tatar (crh), Volga Tatar (tt), and Bashkir (ba), there are two kinds of `i` (one with the dot, one without) and two case pairings: `i`/`İ` and `ı`/`I`.
- In German (de), the `ß` may become `ẞ` (U+1E9E) in uppercase.
- In Greek (el), vowels lose their accent when the whole word is in uppercase (`ά`/`Α`), except for the disjunctive eta (`ή`/`Ή`). Also, diphthongs with an accent on the first vowel lose the accent and gain a diacritic on the second vowel (`άι`/`ΑΪ`).

## Accessibility

Large sections of text set with a `font-variant` value of `all-small-caps` or `all-petite-caps` may be difficult for people with cognitive concerns such as Dyslexia to read.

- MDN Understanding WCAG, Guideline 1.4 explanations
- W3C Understanding WCAG 2.2

## Examples

### Setting the small-caps font variant

#### HTML

```html
<p class="small-caps">Firefox rocks, small caps!</p>
<p class="normal">Firefox rocks, normal caps!</p>
```

#### CSS

```css
.small-caps {
  font-variant-caps: small-caps;
  font-style: italic;
}
.normal {
  font-variant-caps: normal;
  font-style: italic;
}
```

#### Result

## See also

- `font-variant`
- `font-variant-alternates`
- `font-variant-east-asian`
- `font-variant-emoji`
- `font-variant-ligatures`
- `font-variant-numeric`
- `font-variant-position`
