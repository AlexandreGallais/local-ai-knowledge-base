---
title: "jsonc/object-curly-newline"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/object-curly-newline.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/object-curly-newline

> enforce consistent line breaks inside braces

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces consistent line breaks inside braces of object literals.

<eslint-code-block fix>

```json5
/* eslint jsonc/object-curly-newline: 'error' */
{
    /* ✓ GOOD */
    "GOOD": {"foo": "bar"},
    "GOOD": {
        "foo": "bar"
    },

    /* ✗ BAD */
    "BAD": {"foo": "bar"
    },
    "BAD": {
      "foo": "bar"}
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/object-curly-newline": ["error",
        {
            "consistent": true
        }
    ]
}
```

Same as [object-curly-newline] rule option. See here for details.

## :couple: Related rules

- [object-curly-newline]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
