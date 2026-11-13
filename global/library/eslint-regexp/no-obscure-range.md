---
title: "regexp/no-obscure-range"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-obscure-range.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-obscure-range

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow obscure character ranges

## :book: Rule Details

The character range operator (the `-` inside character classes) can easily be misused (mostly unintentionally) to construct non-obvious character class. This rule will disallow all non-obvious uses of the character range operator.

<eslint-code-block>

```js
/* eslint regexp/no-obscure-range: "error" */

/* ✓ GOOD */
var foo = /[a-z]/;
var foo = /[J-O]/;
var foo = /[1-9]/;
var foo = /[\x00-\x40]/;
var foo = /[\0-\uFFFF]/;
var foo = /[\0-\u{10FFFF}]/u;
var foo = /[\1-\5]/;
var foo = /[\cA-\cZ]/;

/* ✗ BAD */
var foo = /[A-\x43]/;
var foo = /[\41-\x45]/;
var foo = /[!-$]/;
var foo = /[😀-😄]/u;
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/no-obscure-range": ["error",
    {
      "allowed": "alphanumeric" // or "all" or [...]
    }
  ]
}
```

This option can be used to override the [allowedCharacterRanges] setting.

It allows all values that the [allowedCharacterRanges] setting allows.

### `"allowed": "alphanumeric"`

<eslint-code-block>

```js
/* eslint regexp/no-obscure-range: ["error", { "allowed": "alphanumeric" }] */

/* ✓ GOOD */
var foo = /[a-z]/;
var foo = /[J-O]/;
var foo = /[1-9]/;

/* ✗ BAD */
var foo = /[A-\x43]/;
var foo = /[\41-\x45]/;
var foo = /[!-$]/;
var foo = /[😀-😄]/u;
```

</eslint-code-block>

### `"allowed": "all"`

<eslint-code-block>

```js
/* eslint regexp/no-obscure-range: ["error", { "allowed": "all" }] */

/* ✓ GOOD */
var foo = /[a-z]/;
var foo = /[J-O]/;
var foo = /[1-9]/;
var foo = /[!-$]/;
var foo = /[😀-😄]/u;

/* ✗ BAD */
var foo = /[A-\x43]/;
var foo = /[\41-\x45]/;
```

</eslint-code-block>

### `"allowed": [ "alphanumeric", "😀-😏" ]`

<eslint-code-block>

```js
/* eslint regexp/no-obscure-range: ["error", { "allowed": [ "alphanumeric", "😀-😏" ] }] */

/* ✓ GOOD */
var foo = /[a-z]/;
var foo = /[J-O]/;
var foo = /[1-9]/;
var foo = /[😀-😄]/u;

/* ✗ BAD */
var foo = /[A-\x43]/;
var foo = /[\41-\x45]/;
var foo = /[!-$]/;
```

</eslint-code-block>

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
