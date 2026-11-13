---
title: "jsonc/no-sparse-arrays"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-sparse-arrays.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-sparse-arrays

> disallow sparse arrays

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule disallows sparse array literals which have "holes" where commas are not preceded by elements. It does not apply to a trailing comma following the last element.

JSON, JSONC and JSON5 do not allow arrays contain empty slots.

<eslint-code-block>

```json5
/* eslint jsonc/no-sparse-arrays: 'error' */
{
    /* ✓ GOOD */
    "GOOD": [1, 2, 3, 4],
    "GOOD": [1, 2, 3, 4,],

    /* ✗ BAD */
    "BAD": [1, , , 4],
    "BAD": [, 2, 3, 4]
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-sparse-arrays]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.2.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
