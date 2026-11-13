---
title: "regexp/control-character-escape"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/control-character-escape.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/control-character-escape

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce consistent escaping of control characters

## :book: Rule Details

This rule reports control characters that were not escaped using a control escape (`\0`, `\t`, `\n`, `\v`, `\f`, `\r`).

<eslint-code-block fix>

```js
/* eslint regexp/control-character-escape: "error" */

/* ✓ GOOD */
var foo = /[\n\r]/;
var foo = /\t/;
var foo = RegExp("\t+\n");

/* ✗ BAD */
var foo = /	/;
var foo = /\u0009/;
var foo = /\u{a}/u;
var foo = RegExp("\\u000a");
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
