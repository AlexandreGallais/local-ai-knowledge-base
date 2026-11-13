---
title: "regexp/sort-alternatives"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/sort-alternatives.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/sort-alternatives

🔧 This rule is automatically fixable by the `--fix` CLI option.

> sort alternatives if order doesn't matter

## :book: Rule Details

This rule will sort alternatives to improve readability and maintainability.

The primary target of this rule are lists of words and/or numbers. These lists are somewhat common, and sorting them makes it easy for readers to check whether a particular word or number is included.

This rule will only sort alternatives if reordering the alternatives doesn't affect the pattern.\
However, character classes containing strings are ensured to match the longest string, so they can always be sorted.

<eslint-code-block fix>

```js
/* eslint regexp/sort-alternatives: "error" */

/* ✓ GOOD */
var foo = /\b(1|2|3)\b/;
var foo = /\b(alpha|beta|gamma)\b/;
var foo = /[\q{blue|green|red}]/v;

/* ✗ BAD */
var foo = /\b(2|1|3)\b/;
var foo = /__(?:Foo|Bar)__/;
var foo = /\((?:TM|R|C)\)/;
var foo = /[\q{red|green|blue}]/v;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.12.0

## :mag: Implementation

- Rule source
- Test source
