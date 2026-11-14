---
title: "regexp/no-empty-character-class"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-empty-character-class.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-empty-character-class

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow character classes that match no characters

## :book: Rule Details

This rule reports character classes that cannot match any characters.

Character classes that cannot match any characters are either empty or negated character classes of elements that contain all characters.

The reports for this rule include reports for the ESLint core [no-empty-character-class] rule. That is, if you use this rule, you can turn off the ESLint core [no-empty-character-class] rule.

<eslint-code-block>

```js
/* eslint regexp/no-empty-character-class: "error" */

/* ✓ GOOD */
var foo = /abc[d]/;
var foo = /abc[a-z]/;
var foo = /[^]/;
var foo = /[\s\S]/;

/* ✗ BAD */
var foo = /abc[]/;
var foo = /[^\s\S]/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further reading

- [no-empty-character-class]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.2.0

## :mag: Implementation

- Rule source
- Test source
