---
title: "`font-variant-alternates` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-variant-alternates/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-variant-alternates` CSS property

The **`font-variant-alternates`** CSS property controls the usage of alternate glyphs. These alternate glyphs may be referenced by alternative names defined in `@font-feature-values`.

The `@font-feature-values` at-rule can be used to associate, for a given font face, a human-readable name with a numeric index that controls a particular OpenType font feature. For features that select alternative glyphs (`stylistic`, `styleset`, `character-variant`, `swash`, `ornament` or `annotation`), the `font-variant-alternates` property can then reference the human-readable name in order to apply the associated feature.

This allows CSS rules to enable alternative glyphs without needing to know the specific index values that a particular font uses to control them.

## Syntax

```css
/* Keyword values */
font-variant-alternates: normal;
font-variant-alternates: historical-forms;

/* Functional notation values */
font-variant-alternates: stylistic(user-defined-ident);
font-variant-alternates: styleset(user-defined-ident);
font-variant-alternates: character-variant(user-defined-ident);
font-variant-alternates: swash(user-defined-ident);
font-variant-alternates: ornaments(user-defined-ident);
font-variant-alternates: annotation(user-defined-ident);
font-variant-alternates: swash(ident1) annotation(ident2);

/* Global values */
font-variant-alternates: inherit;
font-variant-alternates: initial;
font-variant-alternates: revert;
font-variant-alternates: revert-layer;
font-variant-alternates: unset;
```

### Values

This property is specified as `normal` or as a space-separated list of the following values:

- `normal`
    This keyword deactivates alternate glyphs.
- `historical-forms`
    This keyword enables historical forms — glyphs that were common in the past but not today. It corresponds to the OpenType value `hist`.
- `stylistic()`
    This function enables stylistic alternates for individual characters. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `salt`, like `salt 2`.
- `styleset()`
    This function enables stylistic alternatives for sets of characters. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `ssXY`, like `ss02`.
- `character-variant()`
    This function enables specific stylistic alternatives for characters. It is similar to `styleset()`, but doesn't create coherent glyphs for a set of characters; individual characters will have independent and not necessarily coherent styles. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `cvXY`, like `cv02`.
- `swash()`
    This function enables swash glyphs. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType values `swsh` and `cswh`, like `swsh 2` and `cswh 2`.
- `ornaments()`
    This function enables ornaments, like fleurons and other dingbat glyphs. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `ornm`, like `ornm 2`.

    > **Note:**
    > In order to preserve text semantics, font designers should include ornaments that don't match Unicode dingbat characters as ornamental variants of the bullet character (U+2022). Be aware that some existing fonts don't follow this advice.

- `annotation()`
    This function enables annotations, like circled digits or inverted characters. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `nalt`, like `nalt 2`.

## Examples

### Enabling swash glyphs

In this example, we use the `@font-feature-values` at-rule to define a name for the `swash` feature of the MonteCarlo font. The rule maps the name `"fancy"` to the index value `1`.

We can then use that name inside `font-variant-alternates` to switch on swashes for that font. This is the equivalent of a line like `font-feature-settings: "swsh" 1`, except that the CSS applying the feature does not need to include, or even know, the index value needed for this particular font.

#### HTML

```html
<p>A Fancy Swash</p>
<p class="variant">A Fancy Swash</p>
```

#### CSS

```css
@font-face {
  font-family: "MonteCarlo";
  src: url("/shared-assets/fonts/monte-carlo/monte-carlo-regular.woff2");
}

@font-feature-values "MonteCarlo" {
  @swash {
    fancy: 1;
  }
}

p {
  font-family: "MonteCarlo", cursive;
  font-size: 3rem;
  margin: 0.7rem 3rem;
}

.variant {
  font-variant-alternates: swash(fancy);
}
```

#### Result

## See also

- `font-variant`
- `font-variant-caps`
- `font-variant-east-asian`
- `font-variant-emoji`
- `font-variant-ligatures`
- `font-variant-numeric`
- `font-variant-position`
- `@font-feature-values`
- `font-feature-settings`
