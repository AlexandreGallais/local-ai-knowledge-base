---
title: "TypeScript 5.5 (part 4 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.5.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.5 (part 4 of 4)

## Notable Behavioral Changes

This section highlights a set of noteworthy changes that should be acknowledged and understood as part of any upgrade.
Sometimes it will highlight deprecations, removals, and new restrictions.
It can also contain bug fixes that are functionally improvements, but which can also affect an existing build by introducing new errors.

### Disabling Features Deprecated in TypeScript 5.0

TypeScript 5.0 deprecated the following options and behaviors:

* `charset`
* `target: ES3`
* `importsNotUsedAsValues`
* `noImplicitUseStrict`
* `noStrictGenericChecks`
* `keyofStringsOnly`
* `suppressExcessPropertyErrors`
* `suppressImplicitAnyIndexErrors`
* `out`
* `preserveValueImports`
* `prepend` in project references
* implicitly OS-specific `newLine`

To continue using the deprecated options above, developers using TypeScript 5.0 and other more recent versions have had to specify a new option called `ignoreDeprecations` with the value `"5.0"`.

In TypeScript 5.5, these options no longer have any effect.
To help with a smooth upgrade path, you may still specify them in your tsconfig, but these will be an error to specify in TypeScript 6.0.
See also the Flag Deprecation Plan which outlines our deprecation strategy.

More information around these deprecation plans is available on GitHub, which contains suggestions in how to best adapt your codebase.

### `lib.d.ts` Changes

Types generated for the DOM may have an impact on type-checking your codebase.
For more information, see the DOM updates for TypeScript 5.5.

### Stricter Parsing for Decorators

Since TypeScript originally introduced support for decorators, the specified grammar for the proposal has been tightened up.
TypeScript is now stricter about what forms it allows.
While rare, existing decorators may need to be parenthesized to avoid errors.

```ts
class DecoratorProvider {
    decorate(...args: any[]) { }
}

class D extends DecoratorProvider {
    m() {
        class C {
            @super.decorate // ❌ error
            method1() { }

            @(super.decorate) // ✅ okay
            method2() { }
        }
    }
}
```

See more information on the change here.

### `undefined` is No Longer a Definable Type Name

TypeScript has always disallowed type alias names that conflict with built-in types:

```ts
// Illegal
type null = any;
// Illegal
type number = any;
// Illegal
type object = any;
// Illegal
type any = any;
```

Due to a bug, this logic didn't also apply to the built-in type `undefined`.
In 5.5, this is now correctly identified as an error:

```ts
// Now also illegal
type undefined = any;
```

Bare references to type aliases named `undefined` never actually worked in the first place.
You could define them, but you couldn't use them as an unqualified type name.

```ts
export type undefined = string;
export const m: undefined = "";
//           ^
// Errors in 5.4 and earlier - the local definition of 'undefined' was not even consulted.
```

For more information, see the change here.

### Simplified Reference Directive Declaration Emit

When producing a declaration file, TypeScript would synthesize a reference directive when it believed one was required.
For example, all Node.js modules are declared ambiently, so cannot be loaded by module resolution alone.
A file like:

```tsx
import path from "path";
export const myPath = path.parse(__filename);
```

Would emit a declaration file like:

```tsx
/// <reference types="node" />
import path from "path";
export declare const myPath: path.ParsedPath;
```

Even though the reference directive never appeared in the original source.

Similarly, TypeScript also *removed* reference directives that it did not believe needed to be a part of the output.
For example, let's imagine we had a reference directive to `jest`;
however, imagine the reference directive isn't necessary to generate the declaration file.
TypeScript would simply drop it.
So in the following example:

```tsx
/// <reference types="jest" />
import path from "path";
export const myPath = path.parse(__filename);
```

TypeScript would still emit:

```tsx
/// <reference types="node" />
import path from "path";
export declare const myPath: path.ParsedPath;
```

In the course of working on `isolatedDeclarations`, we realized that this logic was untenable for anyone attempting to implement a declaration emitter without type checking or using more than a single file's context.
This behavior is also hard to understand from a user's perspective; whether or not a reference directive appeared in the emitted file seems inconsistent and difficult to predict unless you understand exactly what's going on during typechecking.
To prevent declaration emit from being different when `isolatedDeclarations` was enabled, we knew that our emit needed to change.

Through experimentation, we found that nearly all cases where TypeScript synthesized reference directives were just to pull in `node` or `react`.
These are cases where the expectation is that a downstream user already references those types through tsconfig.json `"types"` or library imports, so no longer synthesizing these reference directives would be unlikely to break anyone.
It's worth noting that this is already how it works for `lib.d.ts`; TypeScript doesn't synthesize a reference to `lib="es2015"` when a module exports a `WeakMap`, instead assuming that a downstream user will have included that as part of their environment.

For reference directives that had been written by library authors (not synthesized), further experimentation showed that nearly all were removed, never showing up in the output.
Most reference directives that were preserved were broken and likely not intended to be preserved.

Given those results, we decided to greatly simplfy reference directives in declaration emit in TypeScript 5.5.
A more consistent strategy will help library authors and consumers have better control of their declaration files.

Reference directives are no longer synthesized.
User-written reference directives are no longer preserved, unless annotated with a new `preserve="true"` attribute.
Concretely, an input file like:

```tsx
/// <reference types="some-lib" preserve="true" />
/// <reference types="jest" />
import path from "path";
export const myPath = path.parse(__filename);
```

will emit:

```tsx
/// <reference types="some-lib" preserve="true" />
import path from "path";
export declare const myPath: path.ParsedPath;
```

Adding `preserve="true"` is backwards compatible with older versions of TypeScript as unknown attributes are ignored.

This change also improved performance; in our benchmarks, the emit stage saw a 1-4% improvement in projects with declaration emit enabled.
