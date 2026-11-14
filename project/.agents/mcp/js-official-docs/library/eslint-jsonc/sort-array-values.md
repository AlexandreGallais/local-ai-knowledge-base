---
title: "jsonc/sort-array-values"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/sort-array-values.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/sort-array-values

> require array values to be sorted

- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule checks values of array and verifies that values are sorted alphabetically or specified order.

<eslint-code-block fix>

```json5
/* eslint jsonc/sort-array-values: ['error', { pathPattern: '.*', order: { type: 'asc' } }] */
{
    /* ✓ GOOD */
    "GOOD": ["a", "b", "c"],

    /* ✗ BAD */
    "BAD": ["c", "b", "a"]
}
```

</eslint-code-block>

## :wrench: Options

```json5
{
    "jsonc/sort-array-values": ["error", 
        {
            "pathPattern": "^files$",  // Hits the files property
            "order": { "type": "asc" }
        },
        {
            "pathPattern": "^keywords$", // Hits the keywords property
            "order": [
                "eslint",
                "eslintplugin",
                "eslint-plugin",
                {
                    // Fallback order
                    "order": { "type": "asc" }
                }
            ]
        },
        {
            "pathPattern": "^categories\\.\\w+$", // Hits arrays of objects
            // Sort each array of objects by its "name" property
            "order": { "type": "asc", "key": "name" }
        },
        {
            "pathPattern": "^items$",
            "order": [
                {
                    // Sort object elements by their "name" property
                    "order": { "type": "asc", "key": "name" }
                },
                {
                    // Sort any remaining values alphabetically
                    "order": { "type": "asc" }
                }
            ]
        }
    ]
}
```

The option receives multiple objects with the following properties:

- `pathPattern` (Required) ... Defines the regular expression pattern of paths to which you want to enforce the order. If you want to apply to the top level, define `"^$"`.
- `order` (Required) ... Defines how to enforce the order. You can use an object or an array.
  - Array ... Defines an array of values to enforce the order.
    - String ... Defines the value.
    - Object ... The object has the following properties:
      - `valuePattern` ... Defines a pattern to match the value, or the value at `order.key`, when defined. Default behavior matches the logic to all values.
      - `order` ... The object has the following properties:
        - `type`:
          - `"asc"` ... Enforce values to be in ascending order. This is default.
          - `"desc"` ... Enforce values to be in descending order.
        - `caseSensitive` ... If `true`, enforce values to be in case-sensitive order. Default is `true`.
        - `natural` ... If `true`, enforce values to be in natural order. Default is `false`.
        - `key` ... Sorts an array of objects by the value of this property. Elements that lack the property are left in place and not reordered. Default is to compare the element value itself.
  - Object ... The object has the following properties:
    - `type`:
      - `"asc"` ... Enforce values to be in ascending order. This is default.
      - `"desc"` ... Enforce values to be in descending order.
    - `caseSensitive` ... If `true`, enforce values to be in case-sensitive order. Default is `true`.
    - `natural` ... If `true`, enforce values to be in natural order. Default is `false`.
    - `key` ... Sorts an array of objects by the value of this property. Elements that lack the property are left in place and not reordered. Default is to compare the element value itself.
- `minValues` ... Specifies the minimum number of values that an array should have in order for the array's unsorted values to produce an error. Default is `2`, which means by default all arrays with unsorted values will result in lint errors.

## :couple: Related rules

- [jsonc/sort-keys]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v2.2.0

## :mag: Implementation

- Rule source
- Test source
