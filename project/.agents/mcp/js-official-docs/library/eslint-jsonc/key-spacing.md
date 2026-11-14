---
title: "jsonc/key-spacing"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/key-spacing.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/key-spacing

> enforce consistent spacing between keys and values in object literal properties

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces consistent spacing between keys and values in object literal properties. In the case of long lines, it is acceptable to add a new line wherever whitespace is allowed.

<eslint-code-block fix>

```json5
/* eslint jsonc/key-spacing: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "foo",

    /* ✗ BAD */
    "BAD" :"bar"
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/key-spacing": ["error",
        {
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict"
        }
    ]
}
```

Same as [key-spacing] rule option. See here for details.

## :couple: Related rules

- [key-spacing]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
