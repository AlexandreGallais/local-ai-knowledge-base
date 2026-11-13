---
title: "TypeScript 5.7 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.7.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.7 (part 2 of 2)

## Support for V8 Compile Caching in Node.js

Node.js 22 supports a new API called `module.enableCompileCache()`.
This API allows the runtime to reuse some of the parsing and compilation work done after the first run of a tool.

TypeScript 5.7 now leverages the API so that it can start doing useful work sooner.
In some of our own testing, we've witnessed about a 2.5x speed-up in running `tsc --version`.

```
Benchmark 1: node ./built/local/_tsc.js --version (*without* caching)
  Time (mean ± σ):     122.2 ms ±   1.5 ms    [User: 101.7 ms, System: 13.0 ms]
  Range (min … max):   119.3 ms … 132.3 ms    200 runs
 
Benchmark 2: node ./built/local/tsc.js --version  (*with* caching)
  Time (mean ± σ):      48.4 ms ±   1.0 ms    [User: 34.0 ms, System: 11.1 ms]
  Range (min … max):    45.7 ms …  52.8 ms    200 runs
 
Summary
  node ./built/local/tsc.js --version ran
    2.52 ± 0.06 times faster than node ./built/local/_tsc.js --version
```

For more information, see the pull request here.

## Notable Behavioral Changes

This section highlights a set of noteworthy changes that should be acknowledged and understood as part of any upgrade.
Sometimes it will highlight deprecations, removals, and new restrictions.
It can also contain bug fixes that are functionally improvements, but which can also affect an existing build by introducing new errors.

### `lib.d.ts`

Types generated for the DOM may have an impact on type-checking your codebase.
For more information, see linked issues related to DOM and `lib.d.ts` updates for this version of TypeScript.

### `TypedArray`s Are Now Generic Over `ArrayBufferLike`

In ECMAScript 2024, `SharedArrayBuffer` and `ArrayBuffer` have types that slightly diverge.
To bridge the gap and preserve the underlying buffer type, all `TypedArrays` (like `Uint8Array` and others) are now also generic.

```ts
interface Uint8Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike> {
    // ...
}
```

Each `TypedArray` now contains a type parameter named `TArrayBuffer`, though that type parameter has a default type argument so that users can continue to refer to `Int32Array` without explicitly writing out `Int32Array<ArrayBufferLike>`.

If you encounter any issues as part of this update, such as

```
error TS2322: Type 'Buffer' is not assignable to type 'Uint8Array<ArrayBufferLike>'.
error TS2345: Argument of type 'Buffer' is not assignable to parameter of type 'Uint8Array<ArrayBufferLike>'.
error TS2345: Argument of type 'ArrayBufferLike' is not assignable to parameter of type 'ArrayBuffer'.
error TS2345: Argument of type 'Buffer' is not assignable to parameter of type 'string | ArrayBufferView | Stream | Iterable<string | ArrayBufferView> | AsyncIterable<string | ArrayBufferView>'.
```

then you may need to update `@types/node`.

You can read the specifics about this change on GitHub.

### Creating Index Signatures from Non-Literal Method Names in Classes

TypeScript now has a more consistent behavior for methods in classes when they are declared with non-literal computed property names.
For example, in the following:

```ts
declare const symbolMethodName: symbol;

export class A {
    [symbolMethodName]() { return 1 };
}
```

Previously TypeScript just viewed the class in a way like the following:

```ts
export class A {
}
```

In other words, from the type system's perspective, `[symbolMethodName]` contributed nothing to the type of `A`

TypeScript 5.7 now views the method `symbolMethodName {}` more meaningfully, and generates an index signature.
As a result, the code above is interpreted as something like the following code:

```ts
export class A {
    [x: symbol]: () => number;
}
```

This provides behavior that is consistent with properties and methods in object literals.

Read up more on this change here.

### More Implicit `any` Errors on Functions Returning `null` and `undefined`

When a function expression is contextually typed by a signature returning a generic type, TypeScript now appropriately provides an implicit `any` error under `noImplicitAny`, but outside of `strictNullChecks`.

```ts
declare var p: Promise<number>;
const p2 = p.catch(() => null);
//                 ~~~~~~~~~~
// error TS7011: Function expression, which lacks return-type annotation, implicitly has an 'any' return type.
```

See this change for more details.
