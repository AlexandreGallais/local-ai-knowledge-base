---
title: "`font-variant-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-variant-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-variant-position` CSS property

The **`font-variant-position`** CSS property controls the use of alternate, smaller glyphs that are positioned as superscript or subscript.

The glyphs are positioned relative to the baseline of the font, which remains unchanged. These glyphs are typically used in `` and `` elements.

When the usage of these alternate glyphs is activated, if one character in the run doesn't have such a typographically-enhanced glyph, the whole set of characters of the run is rendered using a fallback method, synthesizing these glyphs.

These alternate glyphs share the same em-box and the same baseline as the rest of the font. They are merely graphically enhanced, and have no effect on the line-height and other box characteristics.

## Syntax

```css
/* Keyword values */
font-variant-position: normal;
font-variant-position: sub;
font-variant-position: super;

/* Global values */
font-variant-position: inherit;
font-variant-position: initial;
font-variant-position: revert;
font-variant-position: revert-layer;
font-variant-position: unset;
```

### Values

This property is specified as one of the following keyword values:

- `normal`
    Deactivates alternate superscript and subscript glyphs.
- `sub`
    Activates subscript alternate glyphs. If, in a given run, one such glyph is not available for a character, all the characters in the run are rendered using synthesized glyphs.
- `super`
    Activates superscript alternate glyphs. If, in a given run, one such glyph is not available for a character, all the characters in the run are rendered using synthesized glyphs.

## Examples

### Setting superscript and subscript forms

#### HTML

```html
<p class="normal">Normal!</p>
<p class="super">Super!</p>
<p class="sub">Sub!</p>
```

#### CSS

```css
p {
  display: inline;
}

.normal {
  font-variant-position: normal;
}

.super {
  font-variant-position: super;
}

.sub {
  font-variant-position: sub;
}
```

#### Result

## See also

- `font-variant`
- `font-variant-alternates`
- `font-variant-caps`
- `font-variant-east-asian`
- `font-variant-emoji`
- `font-variant-ligatures`
- `font-variant-numeric`
