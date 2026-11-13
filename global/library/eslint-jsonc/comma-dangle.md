---
title: "jsonc/comma-dangle"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/comma-dangle.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/comma-dangle

> require or disallow trailing commas

- :gear: This rule is included in `configs["recommended-with-json"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces consistent use of trailing commas in object and array literals.

<eslint-code-block fix>

```json5
/* eslint jsonc/comma-dangle: 'error' */
{
    /* ✓ GOOD */
    "GOOD": {
        "foo": "bar"
    },

    /* ✗ BAD */
    "BAD": {
        "foo": "bar",
    },
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/comma-dangle": ["error",
        "never"
    ],
    // or
    "jsonc/comma-dangle": ["error",
        {
            "arrays": "never",
            "objects": "never"
        }
    ]
}
```

Same as [comma-dangle] rule option. See here for details.

- `"never"` (default) ... disallows trailing commas
- `"always"` ... requires trailing commas
- `"always-multiline"` ... requires trailing commas when the last element or property is in a *different* line than the closing `]` or `}` and disallows trailing commas when the last element or property is on the *same* line as the closing `]` or `}`
- `"only-multiline"` ... allows (but does not require) trailing commas when the last element or property is in a *different* line than the closing `]` or `}` and disallows trailing commas when the last element or property is on the *same* line as the closing `]` or `}`

You can also use an object option to configure this rule for each type of syntax.

## :couple: Related rules

- [comma-dangle]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
