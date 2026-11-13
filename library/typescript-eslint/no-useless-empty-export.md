---
title: "no-useless-empty-export"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-useless-empty-export.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-useless-empty-export

An empty `export {}` statement is sometimes useful in TypeScript code to turn a file that would otherwise be a script file into a module file.
Per the TypeScript Handbook Modules page:

> In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.
> Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

However, an `export {}` statement does nothing if there are any other top-level import or export statements in a file.

This rule reports an `export {}` that doesn't do anything in a file already using ES modules.

## Examples

**❌ Incorrect**

```ts
export const value = 'Hello, world!';
export {};
```

```ts
import 'some-other-module';
export {};
```

**✅ Correct**

```ts
export const value = 'Hello, world!';
```

```ts
import 'some-other-module';
```

## When Not To Use It

If you don't mind an empty `export {}` at the bottom of files, you likely don't need this rule.
