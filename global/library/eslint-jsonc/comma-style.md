---
title: "jsonc/comma-style"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/comma-style.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/comma-style

> enforce consistent comma style

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforce consistent comma style in array literals and object literals.

<eslint-code-block fix>

```json5
/* eslint jsonc/comma-style: 'error' */
{
    /* ✓ GOOD */
    "GOOD": ["apples",
        "oranges"],
    "GOOD": {
        "a": 1,
        "b": 2
    },

    /* ✗ BAD */
    "BAD": ["apples"
        , "oranges"]
    ,"BAD": {
        "a": 1
        , "b": 2
    }
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/comma-style": ["error",
        "last"
    ]
}
```

Same as [comma-style] rule option. See here for details.

## :couple: Related rules

- [comma-style]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
