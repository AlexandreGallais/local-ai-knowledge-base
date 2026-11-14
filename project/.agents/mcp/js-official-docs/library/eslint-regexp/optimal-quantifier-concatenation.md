---
title: "regexp/optimal-quantifier-concatenation"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/optimal-quantifier-concatenation.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/optimal-quantifier-concatenation

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> require optimal quantifiers for concatenated quantifiers

## :book: Rule Details

If two quantified characters, character classes, or characters are concatenated, the quantifiers can be optimized if either of the characters elements is a subset of the other.

Let's take `\d+\w+` as an example.
This can be optimized to the equivalent pattern `\d\w+`. Not only is the optimized pattern simpler, it is also faster because the first pattern might take up to _O(n^2)_ steps to fail while the optimized pattern will fail after at most _O(n)_ steps. Generally, the optimized pattern will take less backtracking steps to fail.

Choosing optimal quantifiers does not only make your patterns simpler but also faster and most robust against ReDoS attacks.

<eslint-code-block fix>

```js
/* eslint regexp/optimal-quantifier-concatenation: "error" */

/* ✓ GOOD */
var foo = /\w+\d{4}/;
var foo = /\w{3,5}\d*/;
var foo = /a+b+c+d+[abc]+/;
var foo = /a\w*/;

/* ✗ BAD */
var foo = /\w+\d+/;
var foo = /\w+\d?/;
var foo = /[ab]*(?:a|b)/;
var foo = /\w+(?:(a)|b)*/;
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/optimal-quantifier-concatenation": [
    "error",
    {
        "capturingGroups": "report"
    }
  ]
}
```

### `capturingGroups`

The type of concatenation this rule reports might be intentional around capturing groups. This option allows you to turn off false unfixable reports around capturing groups.

- `capturingGroups: "report"` (_default_)

  Concatenations around quantifiers will be reported.

- `capturingGroups: "ignore"`

  Concatenations around quantifiers will not be reported.

  If this option is used, it is recommended to have the [regexp/no-super-linear-backtracking] rule enabled to protect against ReDoS.

## :books: Further reading

- [regexp/no-super-linear-backtracking]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.11.0

## :mag: Implementation

- Rule source
- Test source
