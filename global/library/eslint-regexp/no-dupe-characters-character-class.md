---
title: "regexp/no-dupe-characters-character-class"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-dupe-characters-character-class.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-dupe-characters-character-class

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow duplicate characters in the RegExp character class

Because multiple same character classes in regular expressions only one is useful, they might be typing mistakes.

```js
var foo = /\\(\\)/;
```

## :book: Rule Details

This rule disallows duplicate characters in the RegExp character class.

<eslint-code-block fix>

```js
/* eslint regexp/no-dupe-characters-character-class: "error" */

/* ✓ GOOD */
var foo = /[\(\)]/;

var foo = /[a-z\s]/;

var foo = /[\w]/;

/* ✗ BAD */
var foo = /[\\(\\)]/;
//          ^^ ^^        "\\" are duplicated
var foo = /[a-z\\s]/;
//          ^^^  ^       "s" are duplicated
var foo = /[\w0-9]/;
//          ^^^^^        "0-9" are duplicated
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
