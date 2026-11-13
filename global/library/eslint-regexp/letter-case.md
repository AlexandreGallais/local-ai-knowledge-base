---
title: "regexp/letter-case"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/letter-case.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/letter-case

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce into your favorite case

## :book: Rule Details

This rule is aimed to unify the case of letters.

<eslint-code-block fix>

```js
/* eslint regexp/letter-case: ["error", { hexadecimalEscape: 'lowercase', controlEscape: 'uppercase' }] */

/* ✓ GOOD */
var foo = /a/i
var foo = /\u000a/
var foo = /\x0a/
var foo = /\cA/

/* ✗ BAD */
var foo = /A/i
var foo = /\u000A/
var foo = /\x0A/
var foo = /\ca/
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/letter-case": ["error", {
    "caseInsensitive": "lowercase", // or "uppercase" or "ignore"
    "unicodeEscape": "lowercase", // or "uppercase" or "ignore"
    "hexadecimalEscape": "lowercase", // or "uppercase" or "ignore"
    "controlEscape": "uppercase", // or "lowercase" or "ignore"
  }]
}
```

- String options
  - `"lowercase"` ... Enforce lowercase letters.
  - `"uppercase"` ... Enforce uppercase letters.
  - `"ignore"` ... Does not force case.
- Properties
  - `caseInsensitive` ... Specifies the letter case when the `i` flag is present. Default is `"lowercase"`.
  - `unicodeEscape` ... Specifies the letter case when the unicode escapes. Default is `"lowercase"`.
  - `hexadecimalEscape` ... Specifies the letter case when the hexadecimal escapes. Default is `"lowercase"`.
  - `controlEscape` ... Specifies the letter case when the control escapes (e.g. `\cX`). Default is `"uppercase"`.

### Compatibility with `unicorn/escape-case`

The default `"lowercase"` values for `unicodeEscape` and `hexadecimalEscape`
conflict with the default `"uppercase"` style of
`unicorn/escape-case`.
To use both rules with Unicorn's default, configure both properties as `"uppercase"`:

```json5
{
  "unicorn/escape-case": "error",
  "regexp/letter-case": ["error", {
    "unicodeEscape": "uppercase",
    "hexadecimalEscape": "uppercase",
  }],
}
```

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.3.0

## :mag: Implementation

- Rule source
- Test source
