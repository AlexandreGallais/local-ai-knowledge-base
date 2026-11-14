---
title: "jsonc/no-irregular-whitespace"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-irregular-whitespace.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-irregular-whitespace

> disallow irregular whitespace

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule is aimed at catching invalid whitespace that is not a normal tab and space.

<eslint-code-block>

```json
/* eslint jsonc/no-irregular-whitespace: 'error' */
{
  /* ✓ GOOD */
  "GOOD": "",

  /* ✗ BAD */
  "BAD": "foo",
}
```

</eslint-code-block>

ESLint core [no-irregular-whitespace] rule don't work well in JSON. Turn off that rule in JSON files and use `jsonc/no-irregular-whitespace` rule.

## :wrench: Options

Nothing.

```json
{
  "overrides": [
    {
      "files": ["*.json", "*.json5"],
      "rules": {
        "no-irregular-whitespace": "off",
        "jsonc/no-irregular-whitespace": [
          "error",
          {
            "skipStrings": true,
            "skipComments": false,
            "skipRegExps": false,
            "skipTemplates": false
          }
        ]
      }
    }
  ]
}
```

Same as [no-irregular-whitespace] rule option. See here for details.

## :couple: Related rules

- [no-irregular-whitespace]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v2.5.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
