---
title: "import-x/no-deprecated"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-deprecated.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-deprecated

Reports use of a deprecated name, as indicated by a JSDoc block with a `@deprecated`
tag or TomDoc `Deprecated:` comment.

using a JSDoc `@deprecated` tag:

```js
// @file: ./answer.js

/**
 * This is what you get when you trust a mouse talk show
 *
 * @deprecated Need to restart the experiment
 * @returns {Number} Nonsense
 */
export function multiply(six, nine) {
  return 42
}
```

will report as such:

```js
import { multiply } from './answer' // Deprecated: need to restart the experiment

function whatever(y, z) {
  return multiply(y, z) // Deprecated: need to restart the experiment
}
```

or using the TomDoc equivalent:

```js
// Deprecated: This is what you get when you trust a mouse talk show, need to
// restart the experiment.
//
// Returns a Number nonsense
export function multiply(six, nine) {
  return 42
}
```

Only JSDoc is enabled by default. Other documentation styles can be enabled with
the `import-x/docstyle` setting.

```yaml
# .eslintrc.yml
settings:
  import-x/docstyle: ['jsdoc', 'tomdoc']
```

## When Not To Use It

TypeScript supports multiple function signatures
where only some of signatures can be deprecated. This rule does not support this
configuration. Consider using `@typescript-eslint/no-deprecated`
instead.

## Worklist

- [x] report explicit imports on the import node
- [x] support namespaces
  - [x] should bubble up through deep namespaces (#157)
- [x] report explicit imports at reference time (at the identifier) similar to namespace
- [x] mark module deprecated if file JSDoc has a @deprecated tag?
- [ ] don't flag redeclaration of imported, deprecated names
- [ ] flag destructuring
