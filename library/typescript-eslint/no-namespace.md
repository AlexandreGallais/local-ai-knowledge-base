---
title: "no-namespace"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-namespace.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-namespace

TypeScript historically allowed a form of code organization called "custom modules" (`module Example {}`), later renamed to "namespaces" (`namespace Example`).
Namespaces are an outdated way to organize TypeScript code.
ES2015 module syntax is now preferred (`import`/`export`).

> This rule does not report on the use of TypeScript module declarations to describe external APIs (`declare module 'foo' {}`).

## Examples

Examples of code with the default options:

**❌ Incorrect**

```ts
module foo {}
namespace foo {}

declare module foo {}
declare namespace foo {}
```

**✅ Correct**

```ts
declare module 'foo' {}

// anything inside a d.ts file
```

## Options

### `allowDeclarations`

Examples of code with the `{ "allowDeclarations": true }` option:

**❌ Incorrect**

```ts
module foo {}
namespace foo {}
```

**✅ Correct**

```ts
declare module 'foo' {}
declare module foo {}
declare namespace foo {}

declare global {
  namespace foo {}
}

declare module foo {
  namespace foo {}
}
```

Examples of code for the `{ "allowDeclarations": false }` option:

**❌ Incorrect**

```ts
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

**✅ Correct**

```ts
declare module 'foo' {}
```

### `allowDefinitionFiles`

Examples of code for the `{ "allowDefinitionFiles": true }` option:

**❌ Incorrect**

```ts
// if outside a d.ts file
module foo {}
namespace foo {}

// if outside a d.ts file and allowDeclarations = false
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

**✅ Correct**

```ts
declare module 'foo' {}

// anything inside a d.ts file
```

## When Not To Use It

If your project uses TypeScript's CommonJS export syntax (`export = ...`), you may need to use namespaces in order to export types from your module.
You can learn more about this at:

- TypeScript#52203, the pull request introducing `verbatimModuleSyntax`
- TypeScript#60852, an issue requesting syntax to export types from a CommonJS module.

If your project uses this syntax, either because it was architected before modern modules and namespaces, or because a module option such as `verbatimModuleSyntax` requires it, it may be difficult to migrate off of namespaces.
In that case you may not be able to use this rule for parts of your project.

You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- FAQ: I get errors from the `@typescript-eslint/no-namespace` and/or `no-var` rules about declaring global variables
- FAQ: How should I handle reports that conflict with verbatimModuleSyntax?
- TypeScript handbook entry on Modules
- TypeScript handbook entry on Namespaces
- TypeScript handbook entry on Namespaces and Modules
