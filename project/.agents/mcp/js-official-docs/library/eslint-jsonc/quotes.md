---
title: "jsonc/quotes"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/quotes.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/quotes

> enforce use of double or single quotes

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces the use of double or single quotes.

JSON5 allows you to define a string in one of two ways: double quotes or single quotes.
However, JSON and JSONC can only use double quotes.

<eslint-code-block fix>

```json5
/* eslint jsonc/quotes: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "foo",

    /* ✗ BAD */
    'BAD': 'bar'
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/quotes": ["error",
        "double",
        {"avoidEscape": false}
    ]
}
```

This rule has two options, a string option and an object option.

String option:

- `"double"` (default) ... requires the use of double quotes wherever possible
- `"single"` ... requires the use of single quotes wherever possible

Object option:

- `"avoidEscape"` ... if `true`, allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise. default `false`

See here for details.

## :couple: Related rules

- [quotes]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
