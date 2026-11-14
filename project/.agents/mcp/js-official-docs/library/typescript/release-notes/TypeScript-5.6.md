---
title: "TypeScript 5.6 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 5.6.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 5.6

## Disallowed Nullish and Truthy Checks

Maybe you've written a regex and forgotten to call `.test(...)` on it:

```ts
if (/0x[0-9a-f]/) {
    // Oops! This block always runs.
    // ...
}
```

or maybe you've accidentally written `=>` (which creates an arrow function) instead of `>=` (the greater-than-or-equal-to operator):

```ts
if (x => 0) {
    // Oops! This block always runs.
    // ...
}
```

or maybe you've tried to use a default value with `??`, but mixed up the precedence of `??` and a comparison operator like `<`:

```ts
function isValid(value: string | number, options: any, strictness: "strict" | "loose") {
    if (strictness === "loose") {
        value = +value
    }
    return value < options.max ?? 100;
    // Oops! This is parsed as (value < options.max) ?? 100
}

```

or maybe you've misplaced a parenthesis in a complex expression:

```ts
if (
    isValid(primaryValue, "strict") || isValid(secondaryValue, "strict") ||
    isValid(primaryValue, "loose" || isValid(secondaryValue, "loose"))
) {
    //                           ^^^^ 👀 Did we forget a closing ')'?
}
```

None of these examples do what the author intended, but they're all valid JavaScript code.
Previously TypeScript also quietly accepted these examples.

But with a little bit of experimentation, we found that many *many* bugs could be caught from flagging down suspicious examples like above.
In TypeScript 5.6, the compiler now errors when it can syntactically determine a truthy or nullish check will always evaluate in a specific way.
So in the above examples, you'll start to see errors:

```ts
if (/0x[0-9a-f]/) {
//  ~~~~~~~~~~~~
// error: This kind of expression is always truthy.
}

if (x => 0) {
//  ~~~~~~
// error: This kind of expression is always truthy.
}

function isValid(value: string | number, options: any, strictness: "strict" | "loose") {
    if (strictness === "loose") {
        value = +value
    }
    return value < options.max ?? 100;
    //     ~~~~~~~~~~~~~~~~~~~
    // error: Right operand of ?? is unreachable because the left operand is never nullish.
}

if (
    isValid(primaryValue, "strict") || isValid(secondaryValue, "strict") ||
    isValid(primaryValue, "loose" || isValid(secondaryValue, "loose"))
) {
    //                    ~~~~~~~
    // error: This kind of expression is always truthy.
}
```

Similar results can be achieved by enabling the ESLint `no-constant-binary-expression` rule, and you can see some of the results they achieved in their blog post;
but the new checks TypeScript performs does not have perfect overlap with the ESLint rule, and we also believe there is a lot of value in having these checks built into TypeScript itself.

Note that certain expressions are still allowed, even if they are always truthy or nullish.
Specifically, `true`, `false`, `0`, and `1` are all still allowed despite always being truthy or falsy, since code like the following:

```ts
while (true) {
    doStuff();

    if (something()) {
        break;
    }

    doOtherStuff();
}
```

is still idiomatic and useful, and code like the following:

```ts
if (true || inDebuggingOrDevelopmentEnvironment()) {
    // ...
}
```

is useful while iterating/debugging code.

If you're curious about the implementation or the sorts of bugs it catches, take a look at the pull request that implemented this feature.

## Iterator Helper Methods

JavaScript has a notion of *iterables* (things which we can iterate over by calling a `Symbol.iterator` and getting an iterator) and *iterators* (things which have a `next()` method which we can call to try to get the next value as we iterate).
By and large, you don't typically have to think about these things when you toss them into a `for`/`of` loop, or `[...spread]` them into a new array.
But TypeScript does model these with the types `Iterable` and `Iterator` (and even `IterableIterator` which acts as both!), and these types describe the minimal set of members you need for constructs like `for`/`of` to work on them.

`Iterable`s (and `IterableIterator`s) are nice because they can be used in all sorts of places in JavaScript - but a lot of people found themselves missing methods on `Array`s like `map`, `filter`, and for some reason `reduce`.
That's why a recent proposal was brought forward in ECMAScript to add many methods (and more) from `Array` onto most of the `IterableIterator`s that are produced in JavaScript.

For example, every generator now produces an object that also has a `map` method and a `take` method.

```ts
function* positiveIntegers() {
    let i = 1;
    while (true) {
        yield i;
        i++;
    }
}

const evenNumbers = positiveIntegers().map(x => x * 2);

// Output:
//    2
//    4
//    6
//    8
//   10
for (const value of evenNumbers.take(5)) {
    console.log(value);
}
```

The same is true for methods like `keys()`, `values()`, and `entries()` on `Map`s and `Set`s.

```ts
function invertKeysAndValues<K, V>(map: Map<K, V>): Map<V, K> {
    return new Map(
        map.entries().map(([k, v]) => [v, k])
    );
}
```

You can also extend the new `Iterator` object:

```ts
/**
 * Provides an endless stream of `0`s.
 */
class Zeroes extends Iterator<number> {
    next() {
        return { value: 0, done: false } as const;
    }
}

const zeroes = new Zeroes();

// Transform into an endless stream of `1`s.
const ones = zeroes.map(x => x + 1);
```

And you can adapt any existing `Iterable`s or `Iterator`s into this new type with `Iterator.from`:

```ts
Iterator.from(...).filter(someFunction);
```

Now, we have to talk about naming.

Earlier we mentioned that TypeScript has types for `Iterable` and `Iterator`;
however, like we mentioned, these act sort of like "protocols" to ensure certain operations work.
*That means that not every value that is declared `Iterable` or `Iterator` in TypeScript will have those methods we mentioned above.*

But there is still a new **runtime value** called `Iterator`.
You can reference `Iterator`, as well as `Iterator.prototype`, as actual values in JavaScript.
This is a bit awkward since TypeScript already defines its own thing called `Iterator` purely for type-checking.
So due to this unfortunate name clash, TypeScript needs to introduce a separate type to describe these native/built-in iterable iterators.

TypeScript 5.6 introduces a new type called `IteratorObject`.
It is defined as follows:

```ts
interface IteratorObject<T, TReturn = unknown, TNext = unknown> extends Iterator<T, TReturn, TNext> {
    [Symbol.iterator](): IteratorObject<T, TReturn, TNext>;
}
```

Lots of built-in collections and methods produce subtypes of `IteratorObject`s (like `ArrayIterator`, `SetIterator`, `MapIterator`, and more), and both the core JavaScript and DOM types in `lib.d.ts`, along with `@types/node`, have been updated to use this new type.

Similarly, there is a `AsyncIteratorObject` type for parity.
`AsyncIterator` does not yet exist as a runtime value in JavaScript that brings the same methods for `AsyncIterable`s, but it is an active proposal and this new type prepares for it.

We'd like to thank Kevin Gibbons who contributed the changes for these types, and who is one of the co-authors of the proposal.

## Strict Builtin Iterator Checks (and `--strictBuiltinIteratorReturn`)

When you call the `next()` method on an `Iterator<T, TReturn>`, it returns an object with a `value` and a `done` property.
This is modeled with the type `IteratorResult`.

```ts
type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}

interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}
```

The naming here is inspired by the way a generator function works.
Generator functions can `yield` values, and then `return` a final value - but the types between the two can be unrelated.

```ts
function abc123() {
    yield "a";
    yield "b";
    yield "c";
    return 123;
}

const iter = abc123();

iter.next(); // { value: "a", done: false }
iter.next(); // { value: "b", done: false }
iter.next(); // { value: "c", done: false }
iter.next(); // { value: 123, done: true }
```

With the new `IteratorObject` type, we discovered some difficulties in allowing safe implementations of `IteratorObject`s.
At the same time, there's been a long standing unsafety with `IteratorResult` in cases where `TReturn` was `any` (the default!).
For example, let's say we have an `IteratorResult<string, any>`.
If we end up reaching for the `value` of this type, we'll end up with `string | any`, which is just `any`.

```ts
function* uppercase(iter: Iterator<string, any>) {
    while (true) {
        const { value, done } = iter.next();
        yield value.toUppercase(); // oops! forgot to check for `done` first and misspelled `toUpperCase`

        if (done) {
            return;
        }
    }
}
```

It would be hard to fix this on every `Iterator` today without introducing a lot of breaks, but we can at least fix it with most `IteratorObject`s that get created.

TypeScript 5.6 introduces a new intrinsic type called `BuiltinIteratorReturn` and a new `--strict`-mode flag called `--strictBuiltinIteratorReturn`.
Whenever `IteratorObject`s are used in places like `lib.d.ts`, they are always written with `BuiltinIteratorReturn` type for `TReturn` (though you'll see the more-specific `MapIterator`, `ArrayIterator`, `SetIterator` more often).

```ts
interface MapIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): MapIterator<T>;
}

// ...

interface Map<K, V> {
    // ...

    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): MapIterator<[K, V]>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): MapIterator<K>;

    /**
     * Returns an iterable of values in the map
     */
    values(): MapIterator<V>;
}
```

By default, `BuiltinIteratorReturn` is `any`, but when `--strictBuiltinIteratorReturn` is enabled (possibly via `--strict`), it is `undefined`.
Under this new mode, if we use `BuiltinIteratorReturn`, our earlier example now correctly errors:

```ts
function* uppercase(iter: Iterator<string, BuiltinIteratorReturn>) {
    while (true) {
        const { value, done } = iter.next();
        yield value.toUppercase();
        //    ~~~~~ ~~~~~~~~~~~
        // error! ┃      ┃
        //        ┃      ┗━ Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
        //        ┃
        //        ┗━ 'value' is possibly 'undefined'.

        if (done) {
            return;
        }
    }
}
```

You'll typically see `BuiltinIteratorReturn` paired up with `IteratorObject` throughout `lib.d.ts`.
In general, we recommend being more explicit around the `TReturn` in your own code when possible.

For more information, you can read up on the feature here.

## Support for Arbitrary Module Identifiers

JavaScript allows modules to export bindings with invalid identifier names as string literals:

```ts
const banana = "🍌";

export { banana as "🍌" };
```

Likewise, it allows modules to grab imports with these arbitrary names and bind them to valid identifiers:

```ts
import { "🍌" as banana } from "./foo"

/**
 * om nom nom
 */
function eat(food: string) {
    console.log("Eating", food);
};

eat(banana);
```

This seems like a cute party trick (if you're as fun as we are at parties), but it has its uses for interoperability with other languages (typically via JavaScript/WebAssembly boundaries), since other languages may have different rules for what constitutes a valid identifier.
It can also be useful for tools that generate code, like esbuild with its `inject` feature.

TypeScript 5.6 now allows you to use these arbitrary module identifiers in your code!
We'd like to thank Evan Wallace who contributed this change to TypeScript!

## The `--noUncheckedSideEffectImports` Option

In JavaScript it's possible to `import` a module without actually importing any values from it.

```ts
import "some-module";
```

These imports are often called *side effect imports* because the only useful behavior they can provide is by executing some side effect (like registering a global variable, or adding a polyfill to a prototype).

In TypeScript, this syntax has had a pretty strange quirk: if the `import` could be resolved to a valid source file, then TypeScript would load and check the file.
On the other hand, if no source file could be found, TypeScript would silently ignore the `import`!

This is surprising behavior, but it partially stems from modeling patterns in the JavaScript ecosystem.
For example, this syntax has also been used with special loaders in bundlers to load CSS or other assets.
Your bundler might be configured in such a way where you can include specific `.css` files by writing something like the following:

```tsx
import "./button-component.css";

export function Button() {
    // ...
}
```

Still, this masks potential typos on side effect imports.
That's why TypeScript 5.6 introduces a new compiler option called `--noUncheckedSideEffectImports`, to catch these cases.
When `--noUncheckedSideEffectImports` is enabled, TypeScript will now error if it can't find a source file for a side effect import.

```ts
import "oops-this-module-does-not-exist";
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// error: Cannot find module 'oops-this-module-does-not-exist' or its corresponding type declarations.
```

When enabling this option, some working code may now receive an error, like in the CSS example above.
To work around this, users who want to just write side effect `import`s for assets might be better served by writing what's called an *ambient module declaration* with a wildcard specifier.
It would go in a global file and look something like the following:

```ts
// ./src/globals.d.ts

// Recognize all CSS files as module imports.
declare module "*.css" {}
```

In fact, you might already have a file like this in your project!
For example, running something like `vite init` might create a similar `vite-env.d.ts`.

While this option is currently off by default, we encourage users to give it a try!

For more information, check out the implementation here.
