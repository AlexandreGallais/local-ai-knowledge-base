---
title: "regexp/no-empty-alternative"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-empty-alternative.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-empty-alternative

⚠️ This rule _warns_ in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

💡 This rule is manually fixable by editor suggestions.

> disallow alternatives without elements

## :book: Rule Details

While (re-)writing long regular expressions, it can happen that one forgets to
remove the `|` character of a former alternative. This rule tries to point out
these potential mistakes by reporting all empty alternatives.

If the empty alternative is supposed to match the empty string, then use a
quantifier instead. For example, `a|` should be written as `a?`.

<eslint-code-block>

```js
/* eslint regexp/no-empty-alternative: "error" */

/* ✓ GOOD */
var foo = /(?:)/
var foo = /a+|b*/

/* ✗ BAD */
var foo = /a+|b+|/
var foo = /\|\||\|||\|\|\|/
var foo = /a(?:a|bc|def|h||ij|k)/
var foo = /[abc\q{def|}]/v
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :heart: Compatibility

This rule was taken from [eslint-plugin-clean-regex].\
This rule is compatible with [clean-regex/no-empty-alternative] rule.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.8.0

## :mag: Implementation

- Rule source
- Test source
