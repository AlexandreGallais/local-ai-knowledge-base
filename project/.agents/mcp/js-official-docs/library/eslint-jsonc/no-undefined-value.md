---
title: "jsonc/no-undefined-value"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-undefined-value.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-undefined-value

> disallow `undefined`

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule reports the use of `undefined`.

JSON, JSONC and JSON5 do not allow `undefined`.

<eslint-code-block>

```json5
/* eslint jsonc/no-undefined-value: 'error' */
{
    /* ✗ BAD */
    "BAD": undefined
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
