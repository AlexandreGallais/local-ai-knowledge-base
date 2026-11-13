---
title: "prefer-namespace-keyword"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-namespace-keyword

TypeScript historically allowed a form of code organization called "custom modules" (`module Example {}`), later renamed to "namespaces" (`namespace Example`).

Namespaces are an outdated way to organize TypeScript code.
ES2015 module syntax is now preferred (`import`/`export`).

For projects still using custom modules / namespaces, it's preferred to refer to them as namespaces.
This rule reports when the `module` keyword is used instead of `namespace`.

> This rule does not report on the use of TypeScript module declarations to describe external APIs (`declare module 'foo' {}`).

## Examples

**❌ Incorrect**

```ts
module Example {}
```

**✅ Correct**

```ts
namespace Example {}

declare module 'foo' {}
```

## When Not To Use It

If you are not using TypeScript's older `module`/`namespace` keywords, then you will not need this rule.

## Further Reading

- Modules
- Namespaces
- Namespaces and Modules
