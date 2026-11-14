---
title: "jsonc/no-multi-str"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-multi-str.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-multi-str

> disallow multiline strings

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule is aimed at preventing the use of multiline strings.

<eslint-code-block>

```json5
/* eslint jsonc/no-multi-str: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "Line 1 \nLine 2",

    /* ✗ BAD */
    "BAD": "Line 1 \
Line 2",
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-multi-str]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
