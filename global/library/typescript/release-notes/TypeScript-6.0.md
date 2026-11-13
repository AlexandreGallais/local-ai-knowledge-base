---
title: "TypeScript 6.0 (part 1 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 6.0.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 6.0

## Less Context-Sensitivity on `this`-less Functions

When parameters don't have explicit types written out, TypeScript can usually infer them based on an expected type, or even through other arguments in the same function call.

```ts
declare function callIt<T>(obj: {
    produce: (x: number) => T,
    consume: (y: T) => void,
}): void;

// Works, no issues.
callIt({
    produce: (x: number) => x * 2,
    consume: y => y.toFixed(),
});

// Works, no issues even though the order of the properties is flipped.
callIt({
    consume: y => y.toFixed(),
    produce: (x: number) => x * 2,
});
```

Here, TypeScript can infer the type of `y` in the `consume` function based on the inferred `T` from the `produce` function, regardless of the order of the properties.
But what about if these functions were written using *method syntax* instead of arrow function syntax?

```ts
declare function callIt<T>(obj: {
    produce: (x: number) => T,
    consume: (y: T) => void,
}): void;

// Works fine, `x` is inferred to be a number.
callIt({
    produce(x: number) { return x * 2; },
    consume(y) { return y.toFixed(); },
});

callIt({
    consume(y) { return y.toFixed(); },
    //                  ~
    // error: 'y' is of type 'unknown'.

    produce(x: number) { return x * 2; },
});
```

Strangely enough, the second call to `callIt` results in an error because TypeScript is not able to infer the type of `y` in the `consume` method.
What's happening here is that when TypeScript is trying to find candidates for `T`, it will first skip over functions whose parameters don't have explicit types.
It does this because certain functions may need the inferred type of `T` to be correctly checked - in our case, we need to know the type of `T` to analyze our `consume` function.

These functions are called *contextually sensitive functions* - basically, functions that have parameters without explicit types.
Eventually the type system will need to figure out types for these parameters - but this is a bit at odds with how inference works in generic functions because the two "pull" on types in different directions.

```ts
function callFunc<T>(callback: (x: T) => void, value: T) {
    return callback(value);
}

callFunc(x => x.toFixed(), 42);
//       ^
// We need to figure out the type of `x` here,
// but we also need to figure out the type of `T` to check the callback.
```

To solve this, TypeScript skips over contextually sensitive functions during type argument inference, and instead checks and infers from other arguments first.
If skipping over contextually sensitive functions doesn't work, inference just continues across any unchecked arguments, going left-to-right in the argument list.
In the example immediately above, TypeScript will skip over the callback during inference for `T`, but will then look at the second argument, `42`, and infer that `T` is `number`.
Then, when it comes back to check the callback, it will have a contextual type of `(x: number) => void`, which allows it to infer that `x` is a `number` as well.

So what's going on in our earlier examples?

```ts
// Arrow syntax - no errors.
callIt({
    consume: y => y.toFixed(),
    produce: (x: number) => x * 2,
});

// Method syntax - errors!
callIt({
    consume(y) { return y.toFixed(); },
    //                  ~
    // error: 'y' is of type 'unknown'.

    produce(x: number) { return x * 2; },
});
```

In both examples, `produce` is assigned a function with an explicitly-typed `x` parameter.
Shouldn't they be checked identically?

The issue is subtle: most functions (like the ones using method syntax) have an implicit `this` parameter, but arrow functions do not.
Any usage of `this` could require "pulling" on the type of `T` - for example, knowing the type of the containing object literal could in turn require the type of `consume`, which uses `T`.

But we're not using `this`!
Sure, the function might have a `this` value at runtime, but it's never used!

TypeScript 6.0 takes this into account when it decides if a function is contextually sensitive or not.
If `this` is never actually *used* in a function, then it is not considered contextually sensitive.
That means these functions will be seen as higher-priority when it comes to type inference, and all of our examples above now work!

This change was provided thanks to the work of Mateusz Burzyński.

## Subpath Imports Starting with `#/`

When Node.js added support for modules, it added a feature called "subpath imports".
This is basically a field called `imports` which allows packages to create internal aliases for modules within their package.

```json
{
    "name": "my-package",
    "type": "module",
    "imports": {
        "#root/*": "./dist/*"
    }
}
```

This allows modules in `my-package` to import from paths starting with `#root/`

```js
import * as utils from "#root/utils.js";
```

instead of using a relative path like the following.

```js
import * as utils from "../../utils.js";
```

One minor annoyance with this feature has been that developers always had to write *something* after the `#` when specifying a subpath import.
Here, we used `root`, but it is a bit useless since there is no directory we're mapping over other than `./dist/`

Developers who have used bundlers are also accustomed to using path-mapping to avoid long relative paths.
A familiar convention with bundlers has been to use a simple `@/` as the prefix.
Unfortunately, subpath imports could not start with `#/` at all, leading to a lot of confusion for developers trying to adopt them in their projects.

But more recently, Node.js added support for subpath imports starting with `#/`.
This allows packages to use a simple `#/` prefix for their subpath imports without needing to add an extra segment.

```json
{
    "name": "my-package",
    "type": "module",
    "imports": {
        "#/*": "./dist/*"
    }
}
```

This is supported in newer Node.js 20 releases, and so TypeScript now supports it under the options `nodenext` and `bundler` for the `--moduleResolution` setting.

This work was done thanks to magic-akari, and the implementing pull request can be found here.

## Combining `--moduleResolution bundler` with `--module commonjs`

TypeScript's `--moduleResolution bundler` setting was previously only allowed to be used with `--module esnext` or `--module preserve`;
however, with the deprecation of `--moduleResolution node` (a.k.a. `--moduleResolution node10`), this new combination is often the most suitable upgrade path for many projects.

Projects will often want to instead plan out a migration towards either

* `--module preserve` and `--moduleResolution bundler`
* `--module nodenext`

depending on your project type (e.g. bundled web app, Bun app, or Node.js app).

More information can be found at this implementing pull request.

## The `--stableTypeOrdering` Flag

As part of our ongoing work on TypeScript's native port, we've introduced a new flag called `--stableTypeOrdering` intended to assist with 6.0-to-7.0 migrations.

Today, TypeScript assigns type IDs (internal tracking numbers) to types in the order they are encountered, and uses these IDs to sort union types in a consistent manner.
A similar process occurs for properties.
As a result, the order in which things are declared in a program can have possibly surprising effects on things like declaration emit.

For example, consider the declaration emit from this file:
```ts
// Input: some-file.ts
export function foo(condition: boolean) {
    return condition ? 100 : 500;
}

// Output: some-file.d.ts
export declare function foo(condition: boolean): 100 | 500;
//                                               ^^^^^^^^^
//             Note the order of this union: 100, then 500.
```

If we add an unrelated `const` *above* `foo`, the declaration emit changes:

```ts
// Input: some-file.ts
const x = 500;
export function foo(condition: boolean) {
    return condition ? 100 : 500;
}

// Output: some-file.d.ts
export declare function foo(condition: boolean): 500 | 100;
//                                               ^^^^^^^^^
//                           Note the change in order here.
```

This happens because the literal type `500` gets a lower type ID than `100` because it was processed first when analyzing the `const x` declaration.
In very rare cases this change in ordering can even cause errors to appear or disappear based on program processing order, but in general, the main place you might notice this ordering is in the emitted declaration files, or in the way types are displayed in your editor.

One of the major architectural improvements in TypeScript 7 is parallel type checking, which dramatically improves overall check time.
However, parallelism introduces a challenge: when different type-checkers visit nodes, types, and symbols in different orders, the internal IDs assigned to these constructs become non-deterministic.
This in turn leads to confusing non-deterministic output, where two files with identical contents in the same program can produce different declaration files, or even calculate different errors when analyzing the same file.
To fix this, TypeScript 7.0 sorts its internal objects (e.g. types and symbols) according to a deterministic algorithm based on the content of the object.
This ensures that all checkers encounter the same object order regardless of how and when they were created.
As a consequence, in the given example, TypeScript 7 will *always* print `100 | 500`, removing the ordering instability entirely.

This means that TypeScript 6 and 7 can and do sometimes display different ordering.
While these ordering changes are almost always benign, if you're comparing compiler outputs between runs (for example, checking emitted declaration files in 6.0 vs 7.0), these different orderings can produce a lot of noise that makes it difficult to assess correctness.
Occasionally though, you may witness a change in ordering that causes a type error to appear or disappear, which can be even more confusing.

To help with this situation, in 6.0, you can specify the new `--stableTypeOrdering` flag.
This makes 6.0's type ordering behavior match 7.0's, reducing the number of differences between the two codebases.
Note that we don't necessarily encourage using this flag all the time as it can add a substantial slowdown to type-checking (up to 25% depending on codebase).

If you encounter a type error using `--stableTypeOrdering`, this is typically due to inference differences.
The previous inference without `--stableTypeOrdering` *happened* to work based on the current ordering of types in your program.
To help with this, you'll often benefit from providing an explicit type somewhere.
Often, this will be a type argument

```diff
- someFunctionCall(/*...*/);
+ someFunctionCall<SomeExplicitType>(/*...*/);
```

or a variable annotation for an argument you intend to pass into a call.

```diff
- const someVariable = { /*... some complex object ...*/ };
+ const someVariable: SomeExplicitType = { /*... some complex object ...*/ };

someFunctionCall(someVariable);
```

**Note that this flag is only intended to help diagnose differences between 6.0 and 7.0 - it is not intended to be used as a long-term feature**

See more at this pull-request.

## `es2025` option for `target` and `lib`

TypeScript 6.0 adds support for the `es2025` option for both `target` and `lib`.
While there are no new JavaScript language features in ES2025, this new target adds new types for built-in APIs (e.g. `RegExp.escape`), and moves a few declarations from `esnext` into `es2025` (e.g. `Promise.try`, `Iterator` methods, and `Set` methods).
Work to enable the new target was contributed thanks to Kenta Moriuchi.

## New Types for `Temporal`

The long-awaited Temporal proposal has reached stage 4 and will be part of a future ECMAScript standard.
TypeScript 6.0 now includes built-in types for the Temporal API, so you can start using it in your TypeScript code today via `--target esnext` or `"lib": ["esnext"]` (or the more-granular `esnext.temporal`).

```ts
let yesterday = Temporal.Now.instant().subtract({
    hours: 24,
});

let tomorrow = Temporal.Now.instant().add({
    hours: 24,
});

console.log(`Yesterday: ${yesterday}`);
console.log(`Tomorrow: ${tomorrow}`);
```

Temporal is already usable in several runtimes, and with stage 4 status it is now officially part of the JavaScript language.
Documentation on the Temporal APIs is available on MDN.

This work was contributed thanks to GitHub user Renegade334.

## New Types for "upsert" Methods (a.k.a. `getOrInsert`)

A common pattern with `Map`s is to check if a key <example-value>, and if not, set and fetch a default value.

```ts
function processOptions(compilerOptions: Map<string, unknown>) {
    let strictValue: unknown;
    if (compilerOptions.has("strict")) {
        strictValue = compilerOptions.get("strict");
    }
    else {
        strictValue = true;
        compilerOptions.set("strict", strictValue);
    }
    // ...
}
```

This pattern can be tedious.
ECMAScript's "upsert" proposal recently reached stage 4, and introduces 2 new methods on `Map` and `WeakMap`:

- `getOrInsert`
- `getOrInsertComputed`

These methods have been added to the `esnext` lib so that you can start using them immediately in TypeScript 6.0.

With `getOrInsert`, we can replace our code above with the following:

```ts
function processOptions(compilerOptions: Map<string, unknown>) {
    let strictValue = compilerOptions.getOrInsert("strict", true);
    // ...
}
```

`getOrInsertComputed` works similarly, but is for cases where the default value may be expensive to compute (e.g. requires lots of computations, allocations, or does long-running synchronous I/O).
Instead, it takes a callback that will only be called if the key is not already present.

```ts
someMap.getOrInsertComputed("someKey", () => {
    return computeSomeExpensiveValue(/*...*/);
});
```

This callback is also given the key as an argument, which can be useful for cases where the default value is based on the key.

```ts
someMap.getOrInsertComputed(someKey, computeSomeExpensiveDefaultValue);

function computeSomeExpensiveValue(key: <example-value>) {
    // ...
}
```

This update was contributed thanks to GitHub user Renegade334.

## `RegExp.escape`

When constructing some literal string to match within a regular expression, it is important to escape special regular expression characters like `*`, `+`, `?`, `(`, `)`, etc.
The RegExp Escaping ECMAScript proposal has reached stage 4, and introduces a new `RegExp.escape` function that takes care of this for you.

```ts
function matchWholeWord(word: string, text: string) {
    const escapedWord = RegExp.escape(word);
    const regex = new RegExp(`\\b${escapedWord}\\b`, "g");
    return text.match(regex);
}
```

`RegExp.escape` is available in the `es2025` lib, so you can start using it in TypeScript 6.0 today.

This work was contributed thanks Kenta Moriuchi.
