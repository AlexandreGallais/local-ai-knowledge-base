---
title: "jsonc/no-escape-sequence-in-identifier"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-escape-sequence-in-identifier.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-escape-sequence-in-identifier

> disallow escape sequences in identifiers.

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports disallow escape sequences in identifiers.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-escape-sequence-in-identifier: 'error' */
{
    /* ✓ GOOD */
    GOOD: "GOOD",

    /* ✗ BAD */
    \u0042\u{41}\u{44}: "BAD"
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v1.1.0

## :mag: Implementation

- Rule source
- Test source
