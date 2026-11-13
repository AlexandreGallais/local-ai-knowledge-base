---
title: "TypeScript 5.5 (part 3 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.5.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.5 (part 3 of 4)

## Editor and Watch-Mode Reliability Improvements

TypeScript has either added some new functionality or fixed existing logic that makes `--watch` mode and TypeScript's editor integration feel more reliable.
That should hopefully translate to fewer TSServer/editor restarts.

### Correctly Refresh Editor Errors in Configuration Files

TypeScript can generate errors for `tsconfig.json` files;
however, those errors are actually generated from loading a project, and editors typically don't directly request those errors for `tsconfig.json` files.
While this sounds like a technical detail, it means that when all errors issued in a `tsconfig.json` are fixed, TypeScript doesn't issue a new fresh empty set of errors, and users are left with stale errors unless they reload their editor.

TypeScript 5.5 now intentionally issues an event to clear these out.
See more here.

### Better Handling for Deletes Followed by Immediate Writes

Instead of overwriting files, some tools will opt to delete them and then create new files from scratch.
This is the case when running `npm ci`, for instance.

While this can be efficient for those tools, it can be problematic for TypeScript's editor scenarios where deleting a watched might dispose of it and all of its transitive dependencies.
Deleting and creating a file in quick succession could lead to TypeScript tearing down an entire project and then rebuilding it from scratch.

TypeScript 5.5 now has a more nuanced approach by keeping parts of a deleted project around until it picks up on a new creation event.
This should make operations like `npm ci` work a lot better with TypeScript.
See more information on the approach here.

### Symlinks are Tracked in Failed Resolutions

When TypeScript fails to resolve a module, it will still need to watch for any failed lookup paths in case the module is added later.
Previously this was not done for symlinked directories, which could cause reliability issues in monorepo-like scenarios when a build occurred in one project but was not witnessed in the other.
This should be fixed in TypeScript 5.5, and means you won't need to restart your editor as often.

See more information here.

### Project References Contribute to Auto-Imports

Auto-imports no longer requires at least one explicit import to dependent projects in a project reference setup.
Instead, auto-import completions should just work across anything you've listed in the `references` field of your `tsconfig.json`.

See more on the implementing pull request.

## Performance and Size Optimizations

### Monomorphized Objects in Language Service and Public API

In TypeScript 5.0, we ensured that our `Node` and `Symbol` objects had a consistent set of properties with a consistent initialization order.
Doing so helps reduce polymorphism in different operations, which allows runtimes to fetch properties more quickly.

By making this change, we witnessed impressive speed wins in the compiler;
however, most of these changes were performed on internal allocators for our data structures.
The language service, along with TypeScript's public API, uses a different set of allocators for certain objects.
This allowed the TypeScript compiler to be a bit leaner, as data used only for the language service would never be used in the compiler.

In TypeScript 5.5, the same monomorphization work has been done for the language service and public API.
What this means is that your editor experience, and any build tools that use the TypeScript API, will get a decent amount faster.
In fact, in our benchmarks, we've seen a **5-8% speedup in build times** when using the public TypeScript API's allocators, and **language service operations getting 10-20% faster**.
While this does imply an increase in memory, we believe that tradeoff is worth it and hope to find ways to reduce that memory overhead.
Things should feel a lot snappier now.

For more information, see the change here.

### Monomorphized Control Flow Nodes

In TypeScript 5.5, nodes of the control flow graph have been monomorphized so that they always hold a consistent shape.
By doing so, check times will often be reduced by about 1%.

See this change here.

### Optimizations on our Control Flow Graph

In many cases, control flow analysis will traverse nodes that don't provide any new information.
We observed that in the absence of any early termination or effects in the antecedents (or "dominators") of certain nodes meant that those nodes could always be skipped over.
As such, TypeScript now constructs its control flow graphs to take advantage of this by linking to an earlier node that *does* provide interesting information for control flow analysis.
This yields a flatter control flow graph, which can be more efficient to traverse.
This optimization has yielded modest gains, but with up to 2% reductions in build time on certain codebases.

You can read more here.

### Skipped Checking in `transpileModule` and `transpileDeclaration`

TypeScript's `transpileModule` API can be used for compiling a single TypeScript file's contents into JavaScript.
Similarly, the `transpileDeclaration` API (see below) can be used to generate a declaration file for a single TypeScript file.
One of the issues with these APIs is that TypeScript internally would perform a full type-checking pass over the entire contents of the file before emitting the output.
This was necessary to collect certain information which would later be used for the emit phase.

In TypeScript 5.5, we've found a way to avoid performing a full check, only lazily collecting this information as necessary, and `transpileModule` and `transpileDeclaration` both enable this functionality by default.
As a result, tools that integrate with these APIs, like ts-loader with `transpileOnly` and ts-jest, should see a noticeable speedup.
In our testing, we generally witness around a 2x speed-up in build time using `transpileModule`.

### TypeScript Package Size Reduction

Further leveraging our transition to modules in 5.0, we've significantly reduced TypeScript's overall package size by making `tsserver.js` and `typingsInstaller.js` import from a common API library instead of having each of them produce standalone bundles.

This reduces TypeScript's size on disk from 30.2 MB to 20.4 MB, and reduces its packed size from 5.5 MB to 3.7 MB!

### Node Reuse in Declaration Emit

As part of the work to enable `isolatedDeclarations`, we've substantially improved how often TypeScript can directly copy your input source code when producing declaration files.

For example, let's say you wrote

```ts
export const strBool: string | boolean = "hello";
export const boolStr: boolean | string = "world";
```

Note that the union types are equivalent, but the order of the union is different.
When emitting the declaration file, TypeScript has two equivalent output possibilities.

The first is to use a consistent canonical representation for each type:

```ts
export const strBool: string | boolean;
export const boolStr: string | boolean;
```

The second is to re-use the type annotations exactly as written:

```ts
export const strBool: string | boolean;
export const boolStr: boolean | string;
```

The second approach is generally preferable for a few reasons:

* Many equivalent representations still encode some level of intent that is better to preserve in the declaration file
* Producing a fresh representation of a type can be somewhat expensive, so avoiding is better
* User-written types are usually shorter than generated type representations

In 5.5, we've greatly improved the number of places where TypeScript can correctly identify places where it's safe and correct to print back types exactly as they were written in the input file.
Many of these cases are invisible performance improvements - TypeScript would generate fresh sets of syntax nodes and serialize them into a string.
Instead, TypeScript can now operate over the original syntax nodes directly, which is much cheaper and faster.

### Caching Contextual Types from Discriminated Unions

When TypeScript asks for the contextual type of an expression like an object literal, it will often encounter a union type.
In those cases, TypeScript tries to filter out members of the union based on known properties with well known values (i.e. discriminant properties).
This work can be fairly expensive, especially if you end up with an object consisting of many many properties.
In TypeScript 5.5, much of the computation is cached once so that TypeScript doesn't need to recompute it for every property in the object literal.
Performing this optimization shaved 250ms off of compiling the TypeScript compiler itself.

## Easier API Consumption from ECMAScript Modules

Previously, if you were writing an ECMAScript module in Node.js, named imports were not available from the `typescript` package.

```ts
import { createSourceFile } from "typescript"; // ❌ error

import * as ts from "typescript";
ts.createSourceFile // ❌ undefined???

ts.default.createSourceFile // ✅ works - but ugh!
```

This is because cjs-module-lexer did not recognize the pattern of TypeScript's generated CommonJS code.
This has been fixed, and users can now use named imports from the TypeScript npm package with ECMAScript modules in Node.js.

```ts
import { createSourceFile } from "typescript"; // ✅ works now!

import * as ts from "typescript";
ts.createSourceFile // ✅ works now!
```

For more information, see the change here.

## The `transpileDeclaration` API

TypeScript's API exposes a function called `transpileModule`.
It's intended to make it easy to compile a single file of TypeScript code.
Because it doesn't have access to an entire *program*, the caveat is that it may not produce the right output if the code violates any errors under the `isolatedModules` option.

In TypeScript 5.5, we've added a new similar API called `transpileDeclaration`.
This API is similar to `transpileModule`, but it's specifically designed to generate a single *declaration file* based on some input source text.
Just like `transpileModule`, it doesn't have access to a full program, and a similar caveat applies: it only generates an accurate declaration file if the input code is free of errors under the new `isolatedDeclarations` option.

If desired, this function can be used to parallelize declaration emit across all files under `isolatedDeclarations` mode.

For more information, see the implementation here.
