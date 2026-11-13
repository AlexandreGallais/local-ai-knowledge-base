---
title: "no-irregular-whitespace"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-irregular-whitespace/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# no-irregular-whitespace

Disallow irregular whitespaces.

```css
    .firstClass .secondClass {}
/**            ↑
 * Irregular whitespace. Selector would fail to match '.firstClass' */
```

Use this rule to avoid names that browsers misread. A space-like character, e.g. a no-break space, isn't whitespace and joins the name beside it.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "no-irregular-whitespace": true
}
```

The following patterns are considered problems:

```css
.firstClass .secondClass {}
```

The following patterns are _not_ considered problems:

```css
.firstClass .secondClass { /* Writing comments with irregular whitespaces */ }
```

## Unicode reference of irregular whitespaces

```
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u00A0 - No-Break Space - <NBSP>
\u0085 - Next Line
\u1680 - Ogham Space Mark
\u180E - Mongolian Vowel Separator - <MVS>
\uFEFF - Zero Width No-Break Space - <BOM>
\u2000 - En Quad
\u2001 - Em Quad
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Tree-Per-Em
\u2005 - Four-Per-Em
\u2006 - Six-Per-Em
\u2007 - Figure Space
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space
\u200A - Hair Space
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator
\u2029 - Paragraph Separator
\u202F - Narrow No-Break Space
\u205F - Medium Mathematical Space
\u3000 - Ideographic Space
```
