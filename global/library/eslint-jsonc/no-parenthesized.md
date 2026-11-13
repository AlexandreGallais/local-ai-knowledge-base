---
title: "jsonc/no-parenthesized"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-parenthesized.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-parenthesized

> disallow parentheses around the expression

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule always disallow parentheses around the expression.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-parenthesized: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "foo",

    /* ✗ BAD */
    "BAD": ("bar")
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v2.0.0

## :mag: Implementation

- Rule source
- Test source
