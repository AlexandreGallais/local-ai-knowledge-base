---
title: "Available Rules"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/index.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# Available Rules

The `--fix` option on the command line automatically fixes problems reported by rules which have a wrench :wrench: below.
The rules with the following star :star: are included in the `configs["recommended-*"]` config.

## JSONC Rules

| Rule ID | Description | Fixable | JSON | JSONC | JSON5 |
|:--------|:------------|:-------:|:----:|:-----:|:-----:|
| jsonc/auto | apply jsonc rules similar to your configured ESLint core rules | :wrench: |  |  |  |
| jsonc/key-name-casing | enforce naming convention to property key names |  |  |  |  |
| jsonc/no-bigint-literals | disallow BigInt literals |  | :star: | :star: | :star: |
| jsonc/no-binary-expression | disallow binary expression | :wrench: | :star: | :star: | :star: |
| jsonc/no-binary-numeric-literals | disallow binary numeric literals | :wrench: | :star: | :star: | :star: |
| jsonc/no-comments | disallow comments |  | :star: |  |  |
| jsonc/no-escape-sequence-in-identifier | disallow escape sequences in identifiers. | :wrench: | :star: | :star: | :star: |
| jsonc/no-hexadecimal-numeric-literals | disallow hexadecimal numeric literals | :wrench: | :star: | :star: |  |
| jsonc/no-infinity | disallow Infinity |  | :star: | :star: |  |
| jsonc/no-nan | disallow NaN |  | :star: | :star: |  |
| jsonc/no-number-props | disallow number property keys | :wrench: | :star: | :star: | :star: |
| jsonc/no-numeric-separators | disallow numeric separators | :wrench: | :star: | :star: | :star: |
| jsonc/no-octal-numeric-literals | disallow octal numeric literals | :wrench: | :star: | :star: | :star: |
| jsonc/no-parenthesized | disallow parentheses around the expression | :wrench: | :star: | :star: | :star: |
| jsonc/no-plus-sign | disallow plus sign | :wrench: | :star: | :star: |  |
| jsonc/no-regexp-literals | disallow RegExp literals |  | :star: | :star: | :star: |
| jsonc/no-template-literals | disallow template literals | :wrench: | :star: | :star: | :star: |
| jsonc/no-undefined-value | disallow `undefined` |  | :star: | :star: | :star: |
| jsonc/no-unicode-codepoint-escapes | disallow Unicode code point escape sequences. | :wrench: | :star: | :star: | :star: |
| jsonc/sort-array-values | require array values to be sorted | :wrench: |  |  |  |
| jsonc/sort-keys | require object keys to be sorted | :wrench: |  |  |  |
| jsonc/valid-json-number | disallow invalid number for JSON | :wrench: | :star: | :star: |  |
| jsonc/vue-custom-block/no-parsing-error | disallow parsing errors in Vue custom blocks |  | :star: | :star: | :star: |

## Extension Rules

| Rule ID | Description | Fixable | JSON | JSONC | JSON5 |
|:--------|:------------|:-------:|:----:|:-----:|:-----:|
| jsonc/array-bracket-newline | enforce line breaks after opening and before closing array brackets | :wrench: |  |  |  |
| jsonc/array-bracket-spacing | disallow or enforce spaces inside of brackets | :wrench: |  |  |  |
| jsonc/array-element-newline | enforce line breaks between array elements | :wrench: |  |  |  |
| jsonc/comma-dangle | require or disallow trailing commas | :wrench: | :star: |  |  |
| jsonc/comma-style | enforce consistent comma style | :wrench: |  |  |  |
| jsonc/indent | enforce consistent indentation | :wrench: |  |  |  |
| jsonc/key-spacing | enforce consistent spacing between keys and values in object literal properties | :wrench: |  |  |  |
| jsonc/no-dupe-keys | disallow duplicate keys in object literals |  | :star: | :star: | :star: |
| jsonc/no-floating-decimal | disallow leading or trailing decimal points in numeric literals | :wrench: | :star: | :star: |  |
| jsonc/no-irregular-whitespace | disallow irregular whitespace |  | :star: | :star: | :star: |
| jsonc/no-multi-str | disallow multiline strings |  | :star: | :star: |  |
| jsonc/no-octal-escape | disallow octal escape sequences in string literals |  |  |  |  |
| jsonc/no-octal | disallow legacy octal literals |  | :star: | :star: | :star: |
| jsonc/no-sparse-arrays | disallow sparse arrays |  | :star: | :star: | :star: |
| jsonc/no-useless-escape | disallow unnecessary escape usage |  | :star: | :star: | :star: |
| jsonc/object-curly-newline | enforce consistent line breaks inside braces | :wrench: |  |  |  |
| jsonc/object-curly-spacing | enforce consistent spacing inside braces | :wrench: |  |  |  |
| jsonc/object-property-newline | enforce placing object properties on separate lines | :wrench: |  |  |  |
| jsonc/quote-props | require quotes around object literal property names | :wrench: | :star: | :star: |  |
| jsonc/quotes | enforce use of double or single quotes | :wrench: | :star: | :star: |  |
| jsonc/space-unary-ops | disallow spaces after unary operators | :wrench: | :star: | :star: | :star: |
