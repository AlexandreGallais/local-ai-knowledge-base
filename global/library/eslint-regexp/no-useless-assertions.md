---
title: "regexp/no-useless-assertions"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-assertions.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-assertions

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

💡 This rule is manually fixable by editor suggestions.

> disallow assertions that are known to always accept (or reject)

## :book: Rule Details

Some assertions are unnecessary because the rest of the pattern forces them to
always be accept (or reject).

<eslint-code-block>

```js
/* eslint regexp/no-useless-assertions: "error" */

/* ✓ GOOD */
var foo = /\bfoo\b/;

/* ✗ BAD */
var foo = /#\bfoo/;    // \b will always accept
var foo = /foo\bbar/;  // \b will always reject
var foo = /$foo/;      // $ will always reject
var foo = /(?=\w)\d+/; // (?=\w) will always accept
```

</eslint-code-block>

### Limitations

Right now, this rule is implemented by only looking a single character ahead and
behind. This is enough to determine whether the builtin assertions (`\b`, `\B`,
`^`, `$`) trivially reject or accept but it is not enough for all lookarounds.
The algorithm determining the characters ahead and behind is very conservative
which can lead to false negatives.

## :wrench: Options

Nothing.

## :heart: Compatibility

This rule was taken from [eslint-plugin-clean-regex].\
This rule is compatible with [clean-regex/no-unnecessary-assertions] rule.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
