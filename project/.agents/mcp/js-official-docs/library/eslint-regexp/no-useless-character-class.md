---
title: "regexp/no-useless-character-class"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-character-class.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-character-class

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow character class with one character

## :book: Rule Details

This rule reports character classes that defines only one character.

Character classes that define only one character have the same effect even if you remove the brackets.

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-character-class: "error" */

/* ✓ GOOD */
var foo = /abc/;

/* ✗ BAD */
var foo = /a[b]c/;
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/no-useless-character-class": ["error", {
    "ignores": ["="]
  }]
}
```

- `"ignores"` ... An array of characters and character classes to ignores. Default `["="]`.

The default value is `"="` to prevent conflicts with the [no-div-regex] rule. Note that if you do not specify `"="`, there may be conflicts with the [no-div-regex] rule.

### `"ignores": ["a"]`

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-character-class: ["error", { "ignores": ["a"] }] */

/* ✓ GOOD */
var foo = /[a]bc/;

/* ✗ BAD */
var foo = /a[b]c/;
```

</eslint-code-block>

## :couple: Related rules

- [no-empty-character-class]
- [no-div-regex]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.3.0

## :mag: Implementation

- Rule source
- Test source
