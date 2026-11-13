---
title: "regexp/prefer-named-replacement"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-named-replacement.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-named-replacement

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using named replacement

## :book: Rule Details

This rule reports and fixes `$n` parameter in replacement string that do not use the name of their referenced capturing group.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-named-replacement: "error" */

/* ✓ GOOD */
"abc".replace(/a(?<foo>b)c/, '$<foo>');
"abc".replace(/a(b)c/, '$1');

/* ✗ BAD */
"abc".replace(/a(?<foo>b)c/, '$1');
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/prefer-named-replacement": ["error", {
      "strictTypes": true
  }]
}
```

- `strictTypes` ... If `true`, strictly check the type of object to determine if the string instance was used in `replace()` and `replaceAll()`. Default is `true`.\
  This option is always on when using TypeScript.

## :couple: Related rules

- [regexp/prefer-named-backreference]
- [regexp/prefer-named-capture-group]
- [regexp/prefer-result-array-groups]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.4.0

## :mag: Implementation

- Rule source
- Test source
