---
title: "jsonc/no-dupe-keys"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-dupe-keys.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-dupe-keys

> disallow duplicate keys in object literals

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule disallows duplicate keys in object literals.

<eslint-code-block>

```json5
/* eslint jsonc/no-dupe-keys: 'error' */
{
    /* ✓ GOOD */
    "GOOD": {
        "foo": "val",
        "bar": "val"
    },

    /* ✗ BAD */
    "BAD": {
        "foo": "val",
        "foo": "val"
    }
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-dupe-keys]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
