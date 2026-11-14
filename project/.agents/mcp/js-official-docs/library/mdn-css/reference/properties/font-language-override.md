---
title: "`font-language-override` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-language-override/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-language-override` CSS property

The **`font-language-override`** CSS property controls the use of language-specific glyphs in a typeface.

By default, HTML's `lang` attribute tells browsers to display glyphs designed specifically for that language. For example, a lot of fonts have a special character for the digraph `fi` that merge the dot on the "i" with the "f." However, if the language is set to Turkish the typeface will likely know not to use the merged glyph; Turkish has two versions of the "i," one with a dot (`i`) and one without (`ı`), and using the ligature would incorrectly transform a dotted "i" into a dotless "i."

The `font-language-override` property lets you override the typeface behavior for a specific language. This is useful, for example, when the typeface you're using lacks proper support for the language. For instance, if a typeface doesn't have proper rules for the Azeri language, you can force the font to use Turkish glyphs, which follow similar rules.

## Syntax

```css
/* Keyword value */
font-language-override: normal;

/* <string> values */
font-language-override: "ENG"; /* Use English glyphs */
font-language-override: "TRK"; /* Use Turkish glyphs */

/* Global values */
font-language-override: inherit;
font-language-override: initial;
font-language-override: revert;
font-language-override: revert-layer;
font-language-override: unset;
```

### Values

This property is specified as a single value from the following list:

- `normal`
    Tells the browser to use font glyphs that are appropriate for the language specified by the `lang` attribute. This is the default value.
- `string`
    Tells the browser to use font glyphs that are appropriate for the language specified by the string. The string must match a language tag found in the OpenType language system. For example, "ENG" is English, and "KOR" is Korean.

## Examples

### Using Danish glyphs

#### HTML

```html
<p class="para1">Default language setting.</p>
<p class="para2">
  This is a string with the <code>font-language-override</code> set to Danish.
</p>
```

#### CSS

```css
p.para1 {
  font-language-override: normal;
}

p.para2 {
  font-language-override: "DAN";
}
```

#### Result

## See also

- `font-variant`, `font-variant-position`, `font-variant-east-asian`, `font-variant-caps`, `font-variant-ligatures`, `font-variant-numeric`, `font-variant-alternates`, `font-synthesis`, `font-kerning`.
