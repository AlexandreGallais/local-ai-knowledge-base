---
title: "regexp/no-misleading-unicode-character"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-misleading-unicode-character.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-misleading-unicode-character

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

> disallow multi-code-point characters in character classes and quantifiers

## :book: Rule Details

This rule reports misleading Unicode characters.

Some Unicode characters like '❇️', '🏴‍☠️', and '👨‍👩‍👦' consist of multiple code points. This causes problems in character classes and around quantifiers. E.g.

```js
> /^[❇️🏴‍☠️]$/.test("🏴‍☠️")
false
> /^👨‍👩‍👦{2,4}$/.test("👨‍👩‍👦👨‍👩‍👦")
false
```

This rule is inspired by the [no-misleading-character-class] rule.

<eslint-code-block fix>

```js
/* eslint regexp/no-misleading-unicode-character: "error" */

/* ✓ GOOD */
var foo = /👍+/u;
var foo = /👨‍👩‍👦/;

/* ✗ BAD */
var foo = /👍+/;
var foo = /[❇️🏴‍☠️👨‍👩‍👦]❤️/;
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/no-unused-capturing-group": ["error", {
    "fixable": true
  }]
}
```

- `fixable: true | false`

  This option controls whether the rule is fixable. Defaults to `false`.

  This rule is not fixable by default. Misleading Unicode characters can typically be fixed automatically by assuming that users want to treat one displayed character as one regex character. However, this assumption is not useful in all languages, so this rule provides suggestions instead of fixes by default.

## :books: Further reading

- [no-misleading-character-class]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.2.0

## :mag: Implementation

- Rule source
- Test source
