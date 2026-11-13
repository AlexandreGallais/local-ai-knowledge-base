---
title: "jsonc/object-property-newline"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/object-property-newline.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/object-property-newline

> enforce placing object properties on separate lines

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule permits you to restrict the locations of property specifications in object literals. You may prohibit any part of any property specification from appearing on the same line as any part of any other property specification. You may make this prohibition absolute, or, by invoking an object option, you may allow an exception, permitting an object literal to have all parts of all of its property specifications on a single line.

<eslint-code-block fix>

```json5
/* eslint jsonc/object-property-newline: 'error' */
{
    /* ✓ GOOD */
    "GOOD": {
        "foo": "foo",
        "bar": "bar",
        "baz": "baz"
    },

    /* ✗ BAD */
    "BAD": {
        "foo": "foo", "bar": "bar", "baz": "baz"
    }
}
```

</eslint-code-block>

## :wrench: Options

Same as [object-property-newline] rule option. See here for details.

## :couple: Related rules

- [object-property-newline]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
