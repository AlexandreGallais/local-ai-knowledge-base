---
id: typescript-typescript-changes
title: "TypeScript 5.0 to 7.0: what changed"
topic: typescript
summary: Syntax added from 5.0 to 5.9, new defaults and removed options of 6.0, and what 7.0 changes. TypeScript 6.0.
tool: typescript
version: "6.0"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base; facts summarized from the TypeScript release notes (CC BY 4.0)
variant: files
---

# TypeScript 5.0 to 7.0: what changed

Contents: 1. Version rule · 2. Syntax from 5.0 to 5.9 · 3. TypeScript 6.0 · 4. TypeScript 7.0 · Sources

## 1. Version rule (TypeScript versions)

Read the version of `typescript` in `package.json`. Use a syntax only when that version is equal to or higher than the version that added it. [S1]

In an Angular 22 project, `typescript` stays at 6.0: Angular 22 and typescript-eslint 8 accept `>=6.0.0 <6.1.0`. Never move it to 7 when you update dependencies. [S2] [S4]

## 2. Syntax added from 5.0 to 5.9 (TypeScript 5)

| Version | Use | Breaking change to know |
| --- | --- | --- |
| 5.0 | Standard decorators; `const` type parameters; `extends` with an array in `tsconfig`; `moduleResolution: bundler`; `verbatimModuleSyntax`; `export type *` | `target: ES3`, `out`, `importsNotUsedAsValues` deprecated |
| 5.2 | `using` and `await using` for disposable resources | `module` and `moduleResolution` must match for `node16` and `nodenext` |
| 5.3 | Import attributes: `import data from './a.json' with { type: 'json' }` | `super.x` on an instance field is an error |
| 5.4 | `NoInfer<T>`; narrowing kept in closures; `Object.groupBy`; `module: preserve` | Stricter assignment between enums |
| 5.5 | Inferred type predicates: `values.filter((v) => v !== undefined)` narrows the type | Options deprecated in 5.0 have no effect |
| 5.6 | Conditions always true or always false are errors; iterator helper methods | `.tsbuildinfo` always written |
| 5.8 | `erasableSyntaxOnly`: only syntax that Node.js can strip | `assert` in an import is refused under `nodenext` |
| 5.9 | `import defer`; `module: node20` | `ArrayBuffer` is no longer a supertype of `Buffer` |

[S1]

## 3. TypeScript 6.0 (released 2026-03-23)

New defaults: `strict: true`, `module: esnext`, `target` the latest ECMAScript (`es2025`), `types: []`, `rootDir` the folder of `tsconfig.json`, `noUncheckedSideEffectImports: true`. [S3]

| Old option or syntax | State in 6.0 | Write instead |
| --- | --- | --- |
| `"moduleResolution": "node"` or `"node10"` | Deprecated | `bundler` or `nodenext` |
| `"moduleResolution": "classic"`, `"outFile"` | Removed | `bundler`; ES modules |
| `"baseUrl"` | Deprecated | Full paths in `paths` |
| `"target": "es5"`, `"downlevelIteration"` | Deprecated | ES2015 at least |
| `"module": "amd"`, `"umd"`, `"systemjs"`, `"none"` | Not supported | ES modules |
| `module Foo { }` | Error | `namespace Foo { }` |
| `import x from './a.json' assert { type: 'json' }` | Error | `with { type: 'json' }` |

- To silence the deprecations while you migrate: `"ignoreDeprecations": "6.0"`. Remove it once done. [S3]
- New types: `Temporal`, `Map.prototype.getOrInsert`, `RegExp.escape`. [S3]

## 4. TypeScript 7.0 (released 2026-07-08)

- The compiler is native: builds are 7 to 12 times faster. `npm install -D typescript` installs it. [S4]
- It has no programming API before 7.1: Angular and typescript-eslint cannot use it yet. [S4]
- The options deprecated in 6.0 are errors. [S4]
- The 6.0 compiler stays available as `@typescript/typescript6`, command `tsc6`. [S4]

## Sources

- [S1] Microsoft, "TypeScript 5.0" to "TypeScript 5.9" release notes, <https://www.typescriptlang.org/docs/handbook/release-notes/overview.html>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Angular Team, "Version compatibility", v22, <https://angular.dev/reference/versions>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "Announcing TypeScript 6.0", 2026-03-23, <https://devblogs.microsoft.com/typescript/>, read 2026-11-12, summarized.
- [S4] Microsoft, "Announcing TypeScript 7.0", 2026-07-08, <https://devblogs.microsoft.com/typescript/>, read 2026-11-12, summarized.
