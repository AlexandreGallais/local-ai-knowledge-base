---
title: "regexp/grapheme-string-literal"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/grapheme-string-literal.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/grapheme-string-literal

> enforce single grapheme in string literal

## :book: Rule Details

This rule is aimed to clarify the difference between using a string literal and normal disjunctions by not using string literals for purposes other than expressing a single grapheme.

<eslint-code-block>

```js
/* eslint regexp/grapheme-string-literal: "error" */

/* ✓ GOOD */
var foo = /[\p{RGI_Emoji}--\q{🇦🇨|🇦🇩|🇦🇪|🇦🇫|🇦🇬|🇦🇮|🇦🇱|🇦🇲|🇦🇴|🇦🇶|🇦🇷|🇦🇸|🇦🇹|🇦🇺|🇦🇼|🇦🇽|🇦🇿|🇧🇦|🇧🇧|🇧🇩|🇧🇪|🇧🇫|🇧🇬|🇧🇭|🇧🇮|🇧🇯}]/v
var foo = /[\q{a|b|c}]/v

/* ✗ BAD */
var foo = /[\q{abc|def}]/v
```

</eslint-code-block>

This rule does not report empty string literals. Use [regexp/no-empty-string-literal] and [regexp/no-empty-alternative] if you want to check them.

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/no-empty-string-literal]
- [regexp/no-empty-alternative]
- [regexp/no-useless-string-literal]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.13

## :mag: Implementation

- Rule source
- Test source
