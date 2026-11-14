---
title: "regexp/no-legacy-features"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-legacy-features.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-legacy-features

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow legacy RegExp features

## :book: Rule Details

This rule disallow legacy RegExp features.

<eslint-code-block>

```js
/* eslint regexp/no-legacy-features: "error" */

/* ✗ BAD */
RegExp.input
RegExp.$_
RegExp.lastMatch
RegExp["$&"]
RegExp.lastParen
RegExp["$+"]
RegExp.leftContext
RegExp["$`"]
RegExp.rightContext
RegExp["$'"]
RegExp.$1
RegExp.$2
RegExp.$3
RegExp.$4
RegExp.$5
RegExp.$6
RegExp.$7
RegExp.$8
RegExp.$9

const regexObj = new RegExp('foo', 'gi');
regexObj.compile('new foo', 'g');
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/no-legacy-features": ["error", {
    "staticProperties": [
      "input", "$_",
      "lastMatch", "$&",
      "lastParen", "$+",
      "leftContext", "$`",
      "rightContext", "$'",
      "$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9"
    ],
    "prototypeMethods": ["compile"]
  }]
}
```

- `staticProperties` ... An array of legacy static properties to forbid.
- `prototypeMethods` ... An array of legacy prototype methods to forbid.

## :books: Further reading

- Legacy RegExp features in JavaScript

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.6.0

## :mag: Implementation

- Rule source
- Test source
