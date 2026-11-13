---
title: "jsonc/array-bracket-newline"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/array-bracket-newline.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/array-bracket-newline

> enforce line breaks after opening and before closing array brackets

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces line breaks after opening and before closing array brackets.

<eslint-code-block fix>

```json5
/* eslint jsonc/array-bracket-newline: 'error' */
{
    /* ✓ GOOD */
    "GOOD": [1, 2, 3],
    "GOOD": [
        1,
        2,
        3
    ],

    /* ✗ BAD */
    "BAD": [
        1, 2, 3
    ],
    "BAD": [1,
        2, 3]
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/array-bracket-newline": ["error",
        {
            "multiline": true,
            "minItems": null
        }
    ]
}
```

Same as [array-bracket-newline] rule option. See here for details.

## :couple: Related rules

- [array-bracket-newline]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
