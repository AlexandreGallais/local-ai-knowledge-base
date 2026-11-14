---
title: "jsonc/quote-props"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/quote-props.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/quote-props

> require quotes around object literal property names

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule requires quotes around object literal property names.

<eslint-code-block fix>

```json5
/* eslint jsonc/quote-props: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "foo",

    /* ✗ BAD */
    BAD: "bar"
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/quote-props": ["error",
        "always",
        {}
    ]
}
```

Same as [quote-props] rule option. See here for details.

This rule has two options, a string option and an object option.

String option:

- `"always"` (default) ... requires quotes around all object literal property names
- `"as-needed"` ... disallows quotes around object literal property names that are not strictly required
- `"consistent"` ... enforces a consistent quote style; in a given object, either all of the properties should be quoted, or none of the properties should be quoted
- `"consistent-as-needed"` ... requires quotes around all object literal property names if any name strictly requires quotes, otherwise disallows quotes around object property names

Object option:

See here for details.

## :couple: Related rules

- [quote-props]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
