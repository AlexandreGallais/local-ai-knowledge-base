---
title: "TypeScript 4.9 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.9.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.9 (part 2 of 2)

## Performance Improvements

TypeScript has a few small, but notable, performance improvements.

First, TypeScript's `forEachChild` function has been rewritten to use a function table lookup instead of a `switch` statement across all syntax nodes.
`forEachChild` is a workhorse for traversing syntax nodes in the compiler, and is used heavily in the binding stage of our compiler, along with parts of the language service.
The refactoring of `forEachChild` yielded up to a 20% reduction of time spent in our binding phase and across language service operations.

Once we discovered this performance win for `forEachChild`, we tried it out on `visitEachChild`, a function we use for transforming nodes in the compiler and language service.
The same refactoring yielded up to a 3% reduction in time spent in generating project output.

The initial exploration in `forEachChild` was inspired by a blog post by Artemis Everfree.
While we have some reason to believe the root cause of our speed-up might have more to do with function size/complexity than the issues described in the blog post, we're grateful that we were able to learn from the experience and try out a relatively quick refactoring that made TypeScript faster.

Finally, the way TypeScript preserves the information about a type in the true branch of a conditional type has been optimized.
In a type like

```ts
interface Zoo<T extends Animal> {
    // ...
}

type MakeZoo<A> = A extends Animal ? Zoo<A> : never;
```

TypeScript has to "remember" that `A` must also be an `Animal` when checking if `Zoo` is valid.
This is basically done by creating a special type that used to hold the intersection of `A` with `Animal`;
however, TypeScript previously did this eagerly which isn't always necessary.
Furthermore, some faulty code in our type-checker prevented these special types from being simplified.
TypeScript now defers intersecting these types until it's necessary.
For codebases with heavy use of conditional types, you might witness significant speed-ups with TypeScript, but in our performance testing suite, we saw a more modest 3% reduction in type-checking time.

You can read up more on these optimizations on their respective pull requests:

* `forEachChild` as a jump-table
* `visitEachChild` as a jump-table
* Optimize substitition types

## Correctness Fixes and Breaking Changes

### `lib.d.ts` Updates

While TypeScript strives to avoid major breaks, even small changes in the built-in libraries can cause issues.
We don't expect major breaks as a result of DOM and `lib.d.ts` updates, but there may be some small ones.

### Better Types for `Promise.resolve`

`Promise.resolve` now uses the `Awaited` type to unwrap Promise-like types passed to it.
This means that it more often returns the right `Promise` type, but that improved type can break existing code if it was expecting `any` or `unknown` instead of a `Promise`.
For more information, see the original change.

### JavaScript Emit No Longer Elides Imports

When TypeScript first supported type-checking and compilation for JavaScript, it accidentally supported a feature called import elision.
In short, if an import is not used as a value, or the compiler can detect that the import doesn't refer to a value at runtime, the compiler will drop the import during emit.

This behavior was questionable, especially the detection of whether the import doesn't refer to a value, since it means that TypeScript has to trust sometimes-inaccurate declaration files.
In turn, TypeScript now preserves imports in JavaScript files.

```js
// Input:
import { someValue, SomeClass } from "some-module";

/** @type {SomeClass} */
let val = someValue;

// Previous Output:
import { someValue } from "some-module";

/** @type {SomeClass} */
let val = someValue;

// Current Output:
import { someValue, SomeClass } from "some-module";

/** @type {SomeClass} */
let val = someValue;
```

More information is available at the implementing change.

### `exports` is Prioritized Over `typesVersions`

Previously, TypeScript incorrectly prioritized the `typesVersions` field over the `exports` field when resolving through a `package.json` under `--moduleResolution node16`.
If this change impacts your library, you may need to add `types@` version selectors in your `package.json`'s `exports` field.

```diff
  {
      "type": "module",
      "main": "./dist/main.js"
      "typesVersions": {
          "<4.8": { ".": ["4.8-types/main.d.ts"] },
          "*": { ".": ["modern-types/main.d.ts"] }
      },
      "exports": {
          ".": {
+             "types@<4.8": "./4.8-types/main.d.ts",
+             "types": "./modern-types/main.d.ts",
              "import": "./dist/main.js"
          }
      }
  }
```

For more information, see this pull request.

## `substitute` Replaced With `constraint` on `SubstitutionType`s

As part of an optimization on substitution types, `SubstitutionType` objects no longer contain the `substitute` property representing the effective substitution (usually an intersection of the base type and the implicit constraint) - instead, they just contain the `constraint` property.

For more details, read more on the original pull request.
