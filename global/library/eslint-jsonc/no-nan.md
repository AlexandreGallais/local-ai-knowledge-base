---
title: "jsonc/no-nan"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-nan.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-nan

> disallow NaN

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule reports the use of NaN.

Cannot use NaN when in JSON and JSONC.

<eslint-code-block>

```json5
/* eslint jsonc/no-nan: 'error' */
{
    /* ✓ GOOD */
    "GOOD": 42,

    /* ✗ BAD */
    "BAD": NaN
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [jsonc/valid-json-number]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v1.1.0

## :mag: Implementation

- Rule source
- Test source
