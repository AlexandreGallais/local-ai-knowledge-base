---
title: "import-x/avoid-importing-barrel-files"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/avoid-importing-barrel-files.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/avoid-importing-barrel-files

This rule aims to avoid importing barrel files that lead to loading large module graphs. It is different from the `avoid-barrel-files` rule, which lints against _authoring_ barrel files; this rule lints against _importing_ them.

## Rule Details

Examples of **incorrect** code for this rule:

```js
// `foo` is a barrel file whose module graph is larger than the configured limit
import { foo } from 'foo'
```

## Options

This rule has the following options, with these defaults:

```js
"import-x/avoid-importing-barrel-files": ["error", {
  allowList: [],
  maxModuleGraphSizeAllowed: 20,
  amountOfExportsToConsiderModuleAsBarrel: 3,
}]
```

### `allowList`

List of module specifiers from which importing barrel files is allowed.

### `maxModuleGraphSizeAllowed`

Maximum allowed module graph size. When a barrel file would pull in more
modules than this, importing it is reported. The walk stops as soon as the
limit is exceeded, so the module count in the report is a lower bound.

### `amountOfExportsToConsiderModuleAsBarrel`

Number of exports after which a module is considered a barrel file. Type-only
exports do not count, since they are erased at runtime; type declarations still
count as the module's own declarations.

## Notes

Every runtime way of referencing a module is checked: static imports,
re-exports (`export … from`, `export * from`, `export * as ns from`), dynamic
`import()` and CommonJS `require()`.

Type-only statements — `import type`, Flow's `import typeof`, inline
`import { type A }` and `export { type A }` specifiers, and `export type *` —
are erased at runtime and are not checked.

## Resolution

Modules are resolved and parsed with the plugin's own resolver and the parser
configured for the file, so resolution options (`exportConditions`,
`mainFields`, `extensions`, `tsconfig`, `alias`, ...) come from the plugin
settings and the ESLint configuration rather than
from this rule's options.
