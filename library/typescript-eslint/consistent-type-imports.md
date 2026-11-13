---
title: "consistent-type-imports"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/consistent-type-imports.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# consistent-type-imports

TypeScript allows specifying a `type` keyword on imports to indicate that the export exists only in the type system, not at runtime.
This allows transpilers to drop imports without knowing the types of the dependencies.

> See Blog > Consistent Type Exports and Imports: Why and How for more details.

## Options

### `prefer`

Valid values for `prefer` are:

- `type-imports` will enforce that you always use `import type Foo from '...'` except referenced by metadata of decorators. It is the default.
- `no-type-imports` will enforce that you always use `import Foo from '...'`.

Examples of **correct** code with `{prefer: 'type-imports'}`, and **incorrect** code with `{prefer: 'no-type-imports'}`.

```ts
import type { Foo } from 'Foo';
import type Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

Examples of **incorrect** code with `{prefer: 'type-imports'}`, and **correct** code with `{prefer: 'no-type-imports'}`.

```ts
import { Foo } from 'Foo';
import Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

### `fixStyle`

Valid values for `fixStyle` are:

- `separate-type-imports` will add the type keyword after the import keyword `import type { A } from '...'`. It is the default.
- `inline-type-imports` will inline the type keyword `import { type A } from '...'` and is only available in TypeScript 4.5 and onwards. See documentation here.

**❌ Incorrect**

```ts
import { Foo } from 'Foo';
import Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

**✅ With `separate-type-imports`**

```ts
import type { Foo } from 'Foo';
import type Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

**✅ With `inline-type-imports`**

```ts
import { type Foo } from 'Foo';
import type Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

### `disallowTypeAnnotations`

Examples of **incorrect** code with `{disallowTypeAnnotations: true}`:

```ts
type T = import('Foo').Foo;
const x: import('Bar') = 1;
```

## Caveat: `@decorators` + `experimentalDecorators: true` + `emitDecoratorMetadata: true`

**Note:**
If you are using `experimentalDecorators: false` (eg TypeScript v5.0's stable decorators) then the rule will always report errors as expected.
This caveat **only** applies to `experimentalDecorators: true`

The rule will **_not_** report any errors in files _that contain decorators_ when **both** `experimentalDecorators` and `emitDecoratorMetadata` are turned on.

> See Blog > Changes to consistent-type-imports when used with legacy decorators and decorator metadata for more details.

If you are using type-aware linting then we will automatically infer your setup from your tsconfig and you should not need to configure anything.
Otherwise you can explicitly tell our tooling to analyze your code as if the compiler option was turned on by setting both `parserOptions.emitDecoratorMetadata = true` and `parserOptions.experimentalDecorators = true`.

## Comparison with `importsNotUsedAsValues` / `verbatimModuleSyntax`

`verbatimModuleSyntax` was introduced in TypeScript v5.0 (as a replacement for `importsNotUsedAsValues`).
This rule and `verbatimModuleSyntax` overlap in some situations, but there are a few behavior differences:
| Situation | `consistent-type-imports` (ESLint) | `verbatimModuleSyntax` (TypeScript) |
| -------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| Unused imports | Ignored (consider using `@typescript-eslint/no-unused-vars`) | Type error |
| Usage with `emitDecoratorMetadata` & `experimentalDecorators` | Ignores files that contain decorators | Reports on files that contain decorators |
| Failures detected | Does not fail `tsc` build; can be auto-fixed with `--fix` | Fails `tsc` build; cannot be auto-fixed on the command-line |
| `import { type T } from 'T';` | TypeScript will emit nothing (it "elides" the import) | TypeScript emits `import {} from 'T'` |

Because they have slightly different goals, using both this rule and `verbatimModuleSyntax` at the same time can lead to conflicting and/or duplicate reports on the same import.
For example, TypeScript may report that a type must be imported using `import type`, and this rule may also report that the import should use your configured style.
If you want ESLint autofixes and style enforcement for explicit `import type`, keep this rule enabled.
If TypeScript's diagnostics are sufficient for your project, you can disable this rule to avoid duplicate reports.

## When Not To Use It

If you specifically want to use both import kinds for stylistic reasons, or don't wish to enforce one style over the other, you can avoid this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.

## Related To

- `no-import-type-side-effects`
- `import/consistent-type-specifier-style`
- `import/no-duplicates` with `{"prefer-inline": true}`
