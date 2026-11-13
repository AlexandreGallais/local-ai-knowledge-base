---
title: "import-x/avoid-re-export-all"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/avoid-re-export-all.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/avoid-re-export-all

This rule forbids exporting `*` from a module as it can lead to unused imports and prevent treeshaking.

## Rule Details

Examples of **incorrect** code for this rule:

```js
export * from 'foo'
export * as foo from 'foo'
```

## Notes

Type-only re-exports — `export type * from 'foo'` and
`export type * as foo from 'foo'` — are erased at runtime and are not reported.
