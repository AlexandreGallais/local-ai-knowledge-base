---
title: "jsonc/no-regexp-literals"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-regexp-literals.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-regexp-literals

> disallow RegExp literals

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule reports the use of RegExp literals.

JSON, JSONC and JSON5 do not allow RegExp literals.

<eslint-code-block>

```json5
/* eslint jsonc/no-regexp-literals: 'error' */
{
    /* ✗ BAD */
    "BAD": /foo/
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.2.0

## :mag: Implementation

- Rule source
- Test source
