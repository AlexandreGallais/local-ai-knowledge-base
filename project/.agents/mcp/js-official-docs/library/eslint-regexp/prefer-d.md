---
title: "regexp/prefer-d"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-d.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-d

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using `\d`

## :book: Rule Details

This rule is aimed at using `\d` instead of `[0-9]` in regular expressions.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-d: "error" */

/* ✓ GOOD */
var foo = /\d/;
var foo = /\D/;

/* ✗ BAD */
var foo = /[0-9]/;
var foo = /[^0-9]/;
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/prefer-d": [
    "error",
    {
        "insideCharacterClass": "d"
    }
  ]
}
```

### `insideCharacterClass`

This option control how character class element equivalent to `\d` will be treated.

*Note:* This option does not affect character classes equivalent to `\d`. E.g. `[\d]`, `[0-9]`, and `[0123456789]` are unaffected.
It also does not affect expression non-nested operands equivalent to `\d`. E.g. `[\d&&x]`, and `[\d--x]` are unaffected.

- `insideCharacterClass: "d"`

  Character class element equivalent to `\d` will be reported and replaced with `\d`.

  <eslint-code-block fix>

  ```js
  /* eslint regexp/prefer-d: ["error", { insideCharacterClass: "d" }] */

  /* ✓ GOOD */
  var foo = /[\da-z]/;

  /* ✗ BAD */
  var foo = /[0-9a-z]/;
  var foo = /[0-9]/;
  ```

  </eslint-code-block>

- `insideCharacterClass: "range"`

  Character class element equivalent to `\d` will be reported and replaced with the range `0-9`.

  <eslint-code-block fix>

  ```js
  /* eslint regexp/prefer-d: ["error", { insideCharacterClass: "range" }] */

  /* ✓ GOOD */
  var foo = /[0-9a-z]/;

  /* ✗ BAD */
  var foo = /[\da-z]/;
  var foo = /[0-9]/;

  /* Ignore */
  var foo = /[\d--0]/v;
  /* ✗ BAD */
  var foo = /[[\da-z]--0]/v;
  ```

  </eslint-code-block>

- `insideCharacterClass: "ignore"` (*default*)

  Character class element will not be reported.

  <eslint-code-block fix>

  ```js
  /* eslint regexp/prefer-d: ["error", { insideCharacterClass: "ignore" }] */

  /* ✓ GOOD */
  var foo = /[\da-z]/;
  var foo = /[0-9a-z]/;

  /* ✗ BAD */
  var foo = /[0-9]/;
  var foo = /[[0-9a-z]--0]/v;
  ```

  </eslint-code-block>

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
