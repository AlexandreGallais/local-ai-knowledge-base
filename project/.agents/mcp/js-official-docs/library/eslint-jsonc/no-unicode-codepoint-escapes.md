---
title: "jsonc/no-unicode-codepoint-escapes"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-unicode-codepoint-escapes.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-unicode-codepoint-escapes

> disallow Unicode code point escape sequences.

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule disallow Unicode code point escape sequences.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-unicode-codepoint-escapes: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "\u0041",

    /* ✗ BAD */
    "BAD": "\u{41}"
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v1.1.0

## :mag: Implementation

- Rule source
- Test source
