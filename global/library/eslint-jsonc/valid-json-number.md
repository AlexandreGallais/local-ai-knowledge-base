---
title: "jsonc/valid-json-number"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/valid-json-number.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/valid-json-number

> disallow invalid number for JSON

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports numbers that cannot be parsed with JSON.

<eslint-code-block fix>

```json5
/* eslint jsonc/valid-json-number: 'error' */
{
    /* ✓ GOOD */
    "GOOD": [123, 0.4, -42],

    /* ✗ BAD */
    "BAD": [123., .4, +42, Infinity, NaN]
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [jsonc/no-binary-numeric-literals]
- [jsonc/no-floating-decimal]
- [jsonc/no-hexadecimal-numeric-literals]
- [jsonc/no-infinity]
- [jsonc/no-nan]
- [jsonc/no-numeric-separators]
- [jsonc/no-octal-numeric-literals]
- [jsonc/no-octal]
- [jsonc/no-plus-sign]
- [jsonc/space-unary-ops]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source
