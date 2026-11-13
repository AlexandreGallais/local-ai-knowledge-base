---
title: "jsonc/no-comments"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-comments.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-comments

> disallow comments

- :gear: This rule is included in `configs["recommended-with-json"]`.

## :book: Rule Details

This rule reports comments.

Cannot use comments when in JSON.

<eslint-code-block>

```json5
/* eslint jsonc/no-comments: 'error' */
{
    /* ✗ BAD */
    // ✗ BAD
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source
