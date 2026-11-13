---
title: "font-family-name-quotes"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/font-family-name-quotes/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# font-family-name-quotes

Require or disallow quotes for font family names.

```css
a { font-family: "Times New Roman", 'Ancient Runes', serif; }
/**              ↑               ↑  ↑             ↑
 *               These quotation marks and this one */
```

This rule checks the `font` and `font-family` properties.

This rule ignores `$sass`, `@less`, and `var(--custom-property)` variable syntaxes.

The `fix` option can automatically fix most of the problems reported by this rule.

This rule supports 1 message argument: the font family name.

## Options

_Please read the following to understand these options_:

- The `font` and `font-family` properties accept a short list of special **keywords**: `inherit`, `serif`, `sans-serif`, `cursive`, `fantasy`, `system-ui`, `monospace`, `ui-serif`, `ui-sans-serif`, `ui-monospace`, `ui-rounded`, `emoji`, `math` and `fangsong`. If you wrap these words in quotes, the browser will not interpret them as keywords, but will instead look for a font by that name (e.g. will look for a `"sans-serif"` font) -- which is almost _never_ what you want. Instead, you use these keywords to point to the built-in, generic fallbacks (right?). Therefore, _all of the options below enforce no quotes around these keywords_. (If you actually want to use a font named `"sans-serif"`, turn this rule off.)
- Quotes are **recommended** in the spec with "font family names that contain white space, digits, or punctuation characters other than hyphens".
- Quotes are **required** around font-family names when they are not valid CSS identifiers. For example, a font family name requires quotes around it if it contains `$`, `!` or `/`, but does not require quotes just because it contains spaces or a (non-initial) number or underscore. _You can probably bet that almost every font family name you use **will** be a valid CSS identifier_.
- Quotes should **never** be used around vendor prefixed system fonts such as `-apple-system` and `BlinkMacSystemFont`.

For more on these subtleties, read "Unquoted font family names in CSS", by Mathias Bynens.

> **Warning:**
> This rule does not currently understand escape sequences such as those described by Mathias. If you want to use the font family name "Hawaii 5-0" you will need to wrap it in quotes, instead of escaping it as `Hawaii \35 -0` or `Hawaii\ 5-0`.

### `"always-unless-keyword"`

Expect quotes around every font family name that is not a keyword.

```json
{
  "font-family-name-quotes": "always-unless-keyword"
}
```

The following patterns are considered problems:

```css
a { font-family: Arial, sans-serif; }
```

```css
a { font-family: Times New Roman, Times, serif; }
```

```css
a { font: 1em Arial, sans-serif; }
```

The following patterns are _not_ considered problems:

```css
a { font-family: 'Arial', sans-serif; }
```

```css
a { font-family: "Times New Roman", "Times", serif; }
```

```css
a { font: 1em 'Arial', sans-serif; }
```

### `"always-where-required"`

Expect quotes only when quotes are _required_ according to the criteria above, and disallow quotes in all other cases.

```json
{
  "font-family-name-quotes": "always-where-required"
}
```

The following patterns are considered problems:

```css
a { font-family: "Arial", sans-serif; }
```

```css
a { font-family: 'Times New Roman', Times, serif; }
```

```css
a { font: 1em "Arial", sans-serif; }
```

The following patterns are _not_ considered problems:

```css
a { font-family: Arial, sans-serif; }
```

```css
a { font-family: Times New Roman, Times, serif; }
```

```css
a { font-family: "Hawaii 5-0"; }
```

```css
a { font: 1em Arial, sans-serif; }
```

### `"always-where-recommended"`

Expect quotes only when quotes are _recommended_ according to the criteria above, and disallow quotes in all other cases. (This includes all cases where quotes are _required_, as well.)

```json
{
  "font-family-name-quotes": "always-where-recommended"
}
```

The following patterns are considered problems:

```css
a { font-family: Times New Roman, Times, serif; }
```

```css
a { font-family: MyFontVersion6, sake_case_font; }
```

```css
a { font-family: 'Arial', sans-serif; }
```

```css
a { font: 1em Times New Roman, Times, serif; }
```

The following patterns are _not_ considered problems:

```css
a { font-family: 'Times New Roman', Times, serif; }
```

```css
a { font-family: "MyFontVersion6", "sake_case_font"; }
```

```css
a { font-family: Arial, sans-serif; }
```

```css
a { font: 1em 'Times New Roman', Times, serif; }
```
