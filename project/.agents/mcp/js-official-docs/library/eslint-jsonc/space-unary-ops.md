---
title: "jsonc/space-unary-ops"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/space-unary-ops.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/space-unary-ops

> disallow spaces after unary operators

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports the space after the sign operator.

JSON, JSONC and JSON5 do not allow spaces after the sign.

<eslint-code-block fix>

```json5
/* eslint jsonc/space-unary-ops: 'error' */
{
    /* ✓ GOOD */
    "GOOD": -42,

    /* ✗ BAD */
    "BAD": -  42
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [space-unary-ops]
- [jsonc/valid-json-number]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.2.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
