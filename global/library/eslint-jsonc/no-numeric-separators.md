---
title: "jsonc/no-numeric-separators"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-numeric-separators.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-numeric-separators

> disallow numeric separators

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports the use of numeric separators.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-numeric-separators: 'error' */
{
    /* ✓ GOOD */
    "GOOD": 1234567890,

    /* ✗ BAD */
    "BAD": 1_234_567_890
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [jsonc/valid-json-number]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.6.0

## :mag: Implementation

- Rule source
- Test source
