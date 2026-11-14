---
title: "regexp/prefer-quantifier"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-quantifier.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-quantifier

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using quantifier

## :book: Rule Details

This rule is aimed to use quantifiers instead of consecutive characters in regular expressions.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-quantifier: "error" */

/* ✓ GOOD */
var foo = /\d{4}-\d{2}-\d{2}/;

/* ✗ BAD */
var foo = /\d\d\d\d-\d\d-\d\d/;
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/prefer-quantifier": ["error", {
    "allows": ["www", "\\d\\d"]
  }]
}
```

- `"allows"` ... Array of allowed patterns.

### `{ "allows": ["www", "\\d\\d"] }`

<eslint-code-block fix>

```js
/* eslint regexp/prefer-quantifier: ["error", { "allows": ["www", "\\d\\d"] }] */

/* ✓ GOOD */
var foo = /(?:www\.)?(.*)/;
var foo = /\d\d:\d\d/;

/* ✗ BAD */
var foo = /wwww/;
var foo = /\d\d\d\d/;
```

</eslint-code-block>

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.2.0

## :mag: Implementation

- Rule source
- Test source
