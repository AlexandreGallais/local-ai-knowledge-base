---
title: "TypeScript 5.2 (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.2.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.2 (part 3 of 3)

## Breaking Changes and Correctness Fixes

TypeScript strives not to unnecessarily introduce breaks;
however, occasionally we must make corrections and improvements so that code can be better-analyzed.

### `lib.d.ts` Changes

Types generated for the DOM may have an impact on your codebase.
For more information, see the DOM updates for TypeScript 5.2.

### `labeledElementDeclarations` May Hold `undefined` Elements

In order to support a mixture of labeled and unlabeled elements, TypeScript's API has changed slightly.
The `labeledElementDeclarations` property of `TupleType` may hold `undefined` for at each position where an element is unlabeled.

```diff
  interface TupleType {
-     labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration)[];
+     labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration | undefined)[];
  }
```

### `module` and `moduleResolution` Must Match Under Recent Node.js settings

The `--module` and `--moduleResolution` options each support a `node16` and `nodenext` setting.
These are effectively "modern Node.js" settings that should be used on any recent Node.js project.
What we've found is that when these two options don't agree on whether they are using Node.js-related settings, projects are effectively misconfigured.

In TypeScript 5.2, when using `node16` or `nodenext` for either of the `--module` and `--moduleResolution` options, TypeScript now requires the other to have a similar Node.js-related setting.
In cases where the settings diverge, you'll likely get an error message like either

```
Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'.
```

or

```
Option 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.
```

So for example `--module esnext --moduleResolution node16` will be rejected — but you may be better off just using `--module nodenext` alone, or `--module esnext --moduleResolution bundler`.

For more information, see the change here.

### Consistent Export Checking for Merged Symbols

When two declarations merge, they must agree on whether they are both exported.
Due to a bug, TypeScript missed specific cases in ambient contexts, like in declaration files or `declare module` blocks.
For example, it would not issue an error on a case like the following, where `replaceInFile` is declared once as an exported function, and one as an un-exported namespace.

```ts
declare module 'replace-in-file' {
    export function replaceInFile(config: unknown): Promise<unknown[]>;
    export {};

    namespace replaceInFile {
        export function sync(config: unknown): unknown[];
  }
}
```

In an ambient module, adding an `export { ... }` or a similar construct like `export default ...` implicitly changes whether all declarations are automatically exported.
TypeScript now recognizes these unfortunately confusing semantics more consistently, and issues an error on the fact that all declarations of `replaceInFile` need to agree in their modifiers, and will issue the following error:

```
Individual declarations in merged declaration 'replaceInFile' must be all exported or all local.
```

For more information, see the change here.
