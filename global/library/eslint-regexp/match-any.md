---
title: "regexp/match-any"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/match-any.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/match-any

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce match any character style

## :book: Rule Details

This rule enforces the regular expression notation to match any character.\
e.g. `[\s\S]`, `[^]`, `/./s` (dotAll) and more.

<eslint-code-block fix>

```js
/* eslint regexp/match-any: "error" */

/* ✓ GOOD */
var foo = /[\s\S]/;
var foo = /./s;

/* ✗ BAD */
var foo = /[\S\s]/;
var foo = /[^]/;
var foo = /[\d\D]/;
var foo = /[\w\W]/;
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/match-any": ["error", {
    "allows": ["[\\s\\S]", "dotAll"]
  }]
}
```

- `"allows"` ... An array of notations that any characters that are allowed.\
  `"[\\s\\S]"`, `"[\\S\\s]"`, `"[^]"` and `"dotAll"` can be set.

### `{ "allows": ["[^]"] }`

<eslint-code-block fix>

```js
/* eslint regexp/match-any: ["error", { "allows": ["[^]"] }] */

/* ✓ GOOD */
var foo = /[^]/;

/* ✗ BAD */
var foo = /[\s\S]/;
var foo = /[\S\s]/;
var foo = /./s;
var foo = /[\d\D]/;
var foo = /[\w\W]/;
```

</eslint-code-block>

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
