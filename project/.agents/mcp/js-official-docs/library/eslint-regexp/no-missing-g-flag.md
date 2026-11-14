---
title: "regexp/no-missing-g-flag"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-missing-g-flag.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-missing-g-flag

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow missing `g` flag in patterns used in `String#matchAll` and `String#replaceAll`

## :book: Rule Details

When calling [`String#matchAll()`] and [`String#replaceAll()`] with a `RegExp` missing the global (`g`) flag, it will be a runtime error.
This rule reports `RegExp`s missing the global (`g`) flag that cause these errors.

<eslint-code-block fix>

```js
/* eslint regexp/no-missing-g-flag: "error" */
const games = 'table football, foosball'
const text = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

/* ✓ GOOD */
var m = games.matchAll(/foo/g);
var newText = text.replaceAll(/Dog/ig, 'cat');

/* ✗ BAD */
var m = games.matchAll(/foo/);
var newText = text.replaceAll(/Dog/i, 'cat');

```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/no-missing-g-flag": ["error",
    {
      "strictTypes": true
    }
  ]
}
```

- `strictTypes` ... If `true`, strictly check the type of object to determine if the regex instance was used in `matchAll()` and `replaceAll()`. Default is `true`.\
  This option is always on when using TypeScript.

## :books: Further reading

- MDN Web Docs - String.prototype.matchAll()
- MDN Web Docs - String.prototype.replaceAll()

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.10.0

## :mag: Implementation

- Rule source
- Test source
