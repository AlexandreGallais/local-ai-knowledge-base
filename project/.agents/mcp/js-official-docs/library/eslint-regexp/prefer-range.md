---
title: "regexp/prefer-range"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-range.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-range

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using character class range

## :book: Rule Details

This rule is aimed to use ranges instead of multiple adjacent characters in character class.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-range: "error" */

/* ✓ GOOD */
var foo = /[0-9]/
var foo = /[a-f]/

/* ✗ BAD */
var foo = /[123456]/
var foo = /[a-cd-f]/
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/prefer-range": ["error",
    {
      "target": "alphanumeric" // or "all" or [...]
    }
  ]
}
```

This option can be used to override the [allowedCharacterRanges] setting.

It allows all values that the [allowedCharacterRanges] setting allows.

### `"target": "alphanumeric"`

<eslint-code-block fix>

```js
/* eslint regexp/prefer-range: ["error", { "target": "alphanumeric" }] */

/* ✓ GOOD */
var foo = /[0-9]/
var foo = /[a-f]/
var foo = /[!-$]/
var foo = /[!"#$]/
var foo = /[😀-😄]/u
var foo = /[😀😁😂😃😄]/u

/* ✗ BAD */
var foo = /[123456]/
var foo = /[a-cd-f]/
```

</eslint-code-block>

### `"target": "all"`

<eslint-code-block fix>

```js
/* eslint regexp/prefer-range: ["error", { "target": "all" }] */

/* ✓ GOOD */
var foo = /[0-9]/
var foo = /[a-f]/
var foo = /[!-$]/
var foo = /[😀-😄]/u

/* ✗ BAD */
var foo = /[123456]/
var foo = /[a-cd-f]/
var foo = /[!"#$]/
var foo = /[😀😁😂😃😄]/u
```

</eslint-code-block>

### `"target": [ "alphanumeric", "😀-😏" ]`

<eslint-code-block fix>

```js
/* eslint regexp/prefer-range: ["error", { "target": [ "alphanumeric", "😀-😏" ] }] */

/* ✓ GOOD */
var foo = /[0-9]/
var foo = /[a-f]/
var foo = /[!-$]/
var foo = /[!"#$]/
var foo = /[😀-😄]/u

/* ✗ BAD */
var foo = /[123456]/
var foo = /[a-cd-f]/
var foo = /[😀😁😂😃😄]/u
```

</eslint-code-block>

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.4.0

## :mag: Implementation

- Rule source
- Test source
