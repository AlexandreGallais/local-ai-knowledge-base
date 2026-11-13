---
title: "import-x/avoid-namespace-import"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/avoid-namespace-import.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/avoid-namespace-import

This rule forbids the use of namespace imports as they can lead to unused imports and prevent treeshaking. Unlike `no-namespace`, which enforces the same style with an autofix and supports glob `ignore` patterns, this rule belongs to the performance category and uses an exact `allowList`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import * as foo from 'foo'
```

## Options

This rule has the following options, with these defaults:

```js
"import-x/avoid-namespace-import": ["error", {
  allowList: []
}]
```

### `allowList`

A list of module specifiers whose namespace imports are allowed.
