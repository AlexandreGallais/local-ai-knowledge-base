---
title: "jsonc/indent"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/indent.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/indent

> enforce consistent indentation

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces a consistent indentation style. The default style is `4 spaces`.

<eslint-code-block fix>

```json5
/* eslint jsonc/indent: 'error' */
{
    /* ✓ GOOD */
    "GOOD": {
        "GOOD": "foo"
    },

    /* ✗ BAD */
  "BAD": {
          "BAD": "bar"
     }
}
```

</eslint-code-block>

## :wrench: Options

```json
{
    "jsonc/indent": ["error",
        4,
        {}
    ]
}
```

Same as [indent] rule option. See here for details.

- First option ... Sets the indentation style. default `4`
  Set to `2` if you prefer 2 spaces indentation.
  Set to `"tab"` if you prefer tab indentation.
- Second option ... You can set the object to customize it further.

## :couple: Related rules

- [indent]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
