---
title: "TypeScript 5.4 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.4.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.4

## Preserved Narrowing in Closures Following Last Assignments

TypeScript can usually figure out a more specific type for a variable based on checks that you might perform.
This process is called narrowing.

```ts
function uppercaseStrings(x: string | number) {
    if (typeof x === "string") {
        // TypeScript knows 'x' is a 'string' here.
        return x.toUpperCase();
    }
}
```

One common pain point was that these narrowed types weren't always preserved within function closures.

```ts
function getUrls(url: string | URL, names: string[]) {
    if (typeof url === "string") {
        url = new URL(url);
    }

    return names.map(name => {
        url.searchParams.set("name", name)
        //  ~~~~~~~~~~~~
        // error!
        // Property 'searchParams' does not exist on type 'string | URL'.

        return url.toString();
    });
}
```

Here, TypeScript decided that it wasn't "safe" to assume that `url` was *actually* a `URL` object in our callback function because it was mutated elsewhere;
however, in this instance, that arrow function is *always* created after that assignment to `url`, and it's also the *last* assignment to `url`.

TypeScript 5.4 takes advantage of this to make narrowing a little smarter.
When parameters and `let` variables are used in non-hoisted functions, the type-checker will look for a last assignment point.
If one is found, TypeScript can safely narrow from outside the containing function.
What that means is the above example just works now.

Note that narrowing analysis doesn't kick in if the variable is assigned anywhere in a nested function.
This is because there's no way to know for sure whether the function will be called later.

```ts
function printValueLater(value: string | undefined) {
    if (value === undefined) {
        value = "missing!";
    }

    setTimeout(() => {
        // Modifying 'value', even in a way that shouldn't affect
        // its type, will invalidate type refinements in closures.
        value = value;
    }, 500);

    setTimeout(() => {
        console.log(value.toUpperCase());
        //          ~~~~~
        // error! 'value' is possibly 'undefined'.
    }, 1000);
}
```

This should make lots of typical JavaScript code easier to express.
You can read more about the change on GitHub.

## The `NoInfer` Utility Type

When calling generic functions, TypeScript is able to infer type arguments from whatever you pass in.

```ts
function doSomething<T>(arg: T) {
    // ...
}

// We can explicitly say that 'T' should be 'string'.
doSomething<string>("hello!");

// We can also just let the type of 'T' get inferred.
doSomething("hello!");
```

One challenge, however, is that it is not always clear what the "best" type is to infer.
This might lead to TypeScript rejecting valid calls, accepting questionable calls, or just reporting worse error messages when it catches a bug.

For example, let's imagine a `createStreetLight` function that takes a list of color names, along with an optional default color.

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: C) {
    // ...
}

createStreetLight(["red", "yellow", "green"], "red");
```

What happens when we pass in a `defaultColor` that wasn't in the original `colors` array?
In this function, `colors` is supposed to be the "source of truth" and describe what can be passed to `defaultColor`.

```ts
// Oops! This is undesirable, but is allowed!
createStreetLight(["red", "yellow", "green"], "blue");
```

In this call, type inference decided that `"blue"` was just as valid of a type as `"red"` or `"yellow"` or `"green"`.
So instead of rejecting the call, TypeScript infers the type of `C` as `"red" | "yellow" | "green" | "blue"`.
You might say that inference just blue up in our faces!

One way people currently deal with this is to add a separate type parameter that's bounded by the existing type parameter.

```ts
function createStreetLight<C extends string, D extends C>(colors: C[], defaultColor?: D) {
}

createStreetLight(["red", "yellow", "green"], "blue");
//                                            ~~~~~~
// error!
// Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green" | undefined'.
```

This works, but is a little bit awkward because `D` probably won't be used anywhere else in the signature for `createStreetLight`.
While not bad *in this case*, using a type parameter only once in a signature is often a code smell.

That's why TypeScript 5.4 introduces a new `NoInfer<T>` utility type.
Surrounding a type in `NoInfer<...>` gives a signal to TypeScript not to dig in and match against the inner types to find candidates for type inference.

Using `NoInfer`, we can rewrite `createStreetLight` as something like this:

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
    // ...
}

createStreetLight(["red", "yellow", "green"], "blue");
//                                            ~~~~~~
// error!
// Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green" | undefined'.
```

Excluding the type of `defaultColor` from being explored for inference means that `"blue"` never ends up as an inference candidate, and the type-checker can reject it.

You can see the specific changes in the implementing pull request, along with the initial implementation provided thanks to Mateusz Burzyński!

## `Object.groupBy` and `Map.groupBy`

TypeScript 5.4 adds declarations for JavaScript's new `Object.groupBy` and `Map.groupBy` static methods.

`Object.groupBy` takes an iterable, and a function that decides which "group" each element should be placed in.
The function needs to make a "key" for each distinct group, and `Object.groupBy` uses that key to make an object where every key maps to an array with the original element in it.

So the following JavaScript:

```js
const array = [0, 1, 2, 3, 4, 5];

const myObj = Object.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even": "odd";
});
```

is basically equivalent to writing this:

```js
const myObj = {
    even: [0, 2, 4],
    odd: [1, 3, 5],
};
```

`Map.groupBy` is similar, but produces a `Map` instead of a plain object.
This might be more desirable if you need the guarantees of `Map`s, you're dealing with APIs that expect `Map`s, or you need to use any kind of key for grouping - not just keys that can be used as property names in JavaScript.

```js
const myObj = Map.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even" : "odd";
});
```

and just as before, you could have created `myObj` in an equivalent way:

```js
const myObj = new Map();

myObj.set("even", [0, 2, 4]);
myObj.set("odd", [1, 3, 5]);
```

Note that in the above example of `Object.groupBy`, the object produced uses all optional properties.

```ts
interface EvenOdds {
    even?: number[];
    odd?: number[];
}

const myObj: EvenOdds = Object.groupBy(...);

myObj.even;
//    ~~~~
// Error to access this under 'strictNullChecks'.
```

This is because there's no way to guarantee in a general way that *all* the keys were produced by `groupBy`.

Note also that these methods are only accessible by configuring your `target` to `esnext` or adjusting your `lib` settings.
We expect they will eventually be available under a stable `es2024` target.

We'd like to extend a thanks to Kevin Gibbons for adding the declarations to these `groupBy` methods.

## Support for `require()` calls in `--moduleResolution bundler` and `--module preserve`

TypeScript has a `moduleResolution` option called `bundler` that is meant to model the way modern bundlers figure out which file an import path refers to.
One of the limitations of the option is that it had to be paired with `--module esnext`, making it impossible to use the `import ... = require(...)` syntax.

```ts
// previously errored
import myModule = require("module/path");
```

That might not seem like a big deal if you're planning on just writing standard ECMAScript `import`s, but there's a difference when using a package with conditional exports.

In TypeScript 5.4, `require()` can now be used when setting the `module` setting to a new option called `preserve`.

Between `--module preserve` and `--moduleResolution bundler`, the two more accurately model what bundlers and runtimes like Bun will allow, and how they'll perform module lookups.
In fact, when using `--module preserve`, the `bundler` option will be implicitly set for `--moduleResolution` (along with `--esModuleInterop` and `--resolveJsonModule`)

```json5
{
    "compilerOptions": {
        "module": "preserve",
        // ^ also implies:
        // "moduleResolution": "bundler",
        // "esModuleInterop": true,
        // "resolveJsonModule": true,

        // ...
    }
}
```

Under `--module preserve`, an ECMAScript `import` will always be emitted as-is, and `import ... = require(...)` will be emitted as a `require()` call (though in practice you may not even use TypeScript for emit, since it's likely you'll be using a bundler for your code).
This holds true regardless of the file extension of the containing file.
So the output of this code:

```ts
import * as foo from "some-package/foo";
import bar = require("some-package/bar");
```

should look something like this:

```js
import * as foo from "some-package/foo";
var bar = require("some-package/bar");
```

What this also means is that the syntax you choose directs how conditional exports are matched.
So in the above example, if the `package.json` of `some-package` looks like this:

```json5
{
  "name": "some-package",
  "version": "0.0.1",
  "exports": {
    "./foo": {
        "import": "./esm/foo-from-import.mjs",
        "require": "./cjs/foo-from-require.cjs"
    },
    "./bar": {
        "import": "./esm/bar-from-import.mjs",
        "require": "./cjs/bar-from-require.cjs"
    }
  }
}
```

TypeScript will resolve these paths to `[...]/some-package/esm/foo-from-import.mjs` and `[...]/some-package/cjs/bar-from-require.cjs`.

For more information, you can read up on these new settings here.

## Checked Import Attributes and Assertions

Import attributes and assertions are now checked against the global `ImportAttributes` type.
This means that runtimes can now more accurately describe the import attributes

```ts
// In some global file.
interface ImportAttributes {
    type: "json";
}

// In some other module
import * as ns from "foo" with { type: "not-json" };
//                                     ~~~~~~~~~~
// error!
//
// Type '{ type: "not-json"; }' is not assignable to type 'ImportAttributes'.
//  Types of property 'type' are incompatible.
//    Type '"not-json"' is not assignable to type '"json"'.
```

This change was provided thanks to Oleksandr Tarasiuk.

## Quick Fix for Adding Missing Parameters

TypeScript now has a quick fix to add a new parameter to functions that are called with too many arguments.

This can be useful when threading a new argument through several existing functions, which can be cumbersome today.

This quick fix was provided courtsey of Oleksandr Tarasiuk.

## Upcoming Changes from TypeScript 5.0 Deprecations

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

 To continue using them, developers using TypeScript 5.0 and other more recent versions have had to specify a new option called `ignoreDeprecations` with the value `"5.0"`.

 However, TypScript 5.4 will be the last version in which these will continue to function as normal.
 By TypeScript 5.5 (likely June 2024), these will become hard errors, and code using them will need to be migrated away.

 For more information, you can read up on this plan on GitHub, which contains suggestions in how to best adapt your codebase.
