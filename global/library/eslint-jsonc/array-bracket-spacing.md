---
title: "jsonc/array-bracket-spacing"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/array-bracket-spacing.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/array-bracket-spacing

> disallow or enforce spaces inside of brackets

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces consistent spacing inside array brackets.

<eslint-code-block fix>

```json5
/* eslint jsonc/array-bracket-spacing: 'error' */
{
    /* ✓ GOOD */
    "GOOD": [1, 2, 3],

    /* ✗ BAD */
    "BAD": [ 1, 2, 3 ]
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/array-bracket-spacing": ["error",
        "never"
    ]
}
```

Same as [array-bracket-spacing] rule option. See here for details.

## :couple: Related rules

- [array-bracket-spacing]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
