---
title: "import-x/avoid-barrel-files"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/avoid-barrel-files.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/avoid-barrel-files

This rule disallows _authoring_ barrel files in your project.

## Rule Details

Examples of **incorrect** code for this rule:

```js
export { foo } from 'foo'
export { bar } from 'bar'
export { baz } from 'baz'
export { qux } from 'qux'
```

## Options

This rule has the following options, with these defaults:

```js
"import-x/avoid-barrel-files": ["error", {
  "amountOfExportsToConsiderModuleAsBarrel": 3
}]
```

### `amountOfExportsToConsiderModuleAsBarrel`

This option sets the number of exports a module may have before it is
considered a barrel file. A module is reported only when it exports **more
than** this many names _and_ exports more names than it declares. Type-only
exports are ignored, since they are erased at runtime; type declarations still
count as the module's own declarations.
