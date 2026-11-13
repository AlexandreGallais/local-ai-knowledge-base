---
title: "TypeScript 5.5 (part 1 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.5.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.5

## Inferred Type Predicates

*This section was written by Dan Vanderkam, who implemented this feature in TypeScript 5.5. Thanks Dan!*

TypeScript's control flow analysis does a great job of tracking how the type of a variable changes as it moves through your code:

```tsx
interface Bird {
    commonName: string;
    scientificName: string;
    sing(): void;
}

// Maps country names -> national bird.
// Not all nations have official birds (looking at you, Canada!)
declare const nationalBirds: Map<string, Bird>;

function makeNationalBirdCall(country: string) {
  const bird = nationalBirds.get(country);  // bird has a declared type of Bird | undefined
  if (bird) {
    bird.sing();  // bird has type Bird inside the if statement
  } else {
    // bird has type undefined here.
  }
}
```

By making you handle the `undefined` case, TypeScript pushes you to write more robust code.

In the past, this sort of type refinement was more difficult to apply to arrays. This would have been an error in all previous versions of TypeScript:

```tsx
function makeBirdCalls(countries: string[]) {
  // birds: (Bird | undefined)[]
  const birds = countries
    .map(country => nationalBirds.get(country))
    .filter(bird => bird !== undefined);

  for (const bird of birds) {
    bird.sing();  // error: 'bird' is possibly 'undefined'.
  }
}
```

This code is perfectly fine: we've filtered all the `undefined` values out of the list.
But TypeScript hasn't been able to follow along.

With TypeScript 5.5, the type checker is fine with this code:

```tsx
function makeBirdCalls(countries: string[]) {
  // birds: Bird[]
  const birds = countries
    .map(country => nationalBirds.get(country))
    .filter(bird => bird !== undefined);

  for (const bird of birds) {
    bird.sing();  // ok!
  }
}
```

Note the more precise type for `birds`.

This works because TypeScript now infers a type predicate for the `filter` function.
You can see what's going on more clearly by pulling it out into a standalone function:

```tsx
// function isBirdReal(bird: Bird | undefined): bird is Bird
function isBirdReal(bird: Bird | undefined) {
  return bird !== undefined;
}
```

`bird is Bird` is the type predicate.
It means that, if the function returns `true`, then it's a `Bird` (if the function returns `false` then it's `undefined`).
The type declarations for `Array.prototype.filter` know about type predicates, so the net result is that you get a more precise type and the code passes the type checker.

TypeScript will infer that a function returns a type predicate if these conditions hold:

1. The function does not have an explicit return type or type predicate annotation.
2. The function has a single `return` statement and no implicit returns.
3. The function does not mutate its parameter.
4. The function returns a `boolean` expression that's tied to a refinement on the parameter.

Generally this works how you'd expect.
Here's a few more examples of inferred type predicates:

```tsx
// const isNumber: (x: unknown) => x is number
const isNumber = (x: unknown) => typeof x === 'number';

// const isNonNullish: <T>(x: T) => x is NonNullable<T>
const isNonNullish = <T,>(x: T) => x != null;
```

Previously, TypeScript would have just inferred that these functions return `boolean`.
It now infers signatures with type predicates like `x is number` or `x is NonNullable<T>`.

Type predicates have "if and only if" semantics.
If a function returns `x is T`, then it means that:

1. If the function returns `true` then `x` has the type `T`.
2. If the function returns `false` then `x` does *not* have type `T`.

If you're expecting a type predicate to be inferred but it's not, then you may be running afoul of the second rule. This often comes up with "truthiness" checks:

```tsx
function getClassroomAverage(students: string[], allScores: Map<string, number>) {
  const studentScores = students
    .map(student => allScores.get(student))
    .filter(score => !!score);

  return studentScores.reduce((a, b) => a + b) / studentScores.length;
  //     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // error: Object is possibly 'undefined'.
}
```

TypeScript did not infer a type predicate for `score => !!score`, and rightly so: if this returns `true` then `score` is a `number`.
But if it returns `false`, then `score` could be either `undefined` or a `number` (specifically, `0`).
This is a real bug: if any student got a zero on the test, then filtering out their score will skew the average upwards.
Fewer will be above average and more will be sad!

As with the first example, it's better to explicitly filter out `undefined` values:

```tsx
function getClassroomAverage(students: string[], allScores: Map<string, number>) {
  const studentScores = students
    .map(student => allScores.get(student))
    .filter(score => score !== undefined);

  return studentScores.reduce((a, b) => a + b) / studentScores.length;  // ok!
}
```

A truthiness check *will* infer a type predicate for object types, where there's no ambiguity.
Remember that functions must return a `boolean` to be a candidate for an inferred type predicate: `x => !!x` might infer a type predicate, but `x => x` definitely won't.

Explicit type predicates continue to work exactly as before.
TypeScript will not check whether it would infer the same type predicate.
Explicit type predicates ("is") are no safer than a type assertion ("as").

It's possible that this feature will break existing code if TypeScript now infers a more precise type than you want. For example:

```tsx
// Previously, nums: (number | null)[]
// Now, nums: number[]
const nums = [1, 2, 3, null, 5].filter(x => x !== null);

nums.push(null);  // ok in TS 5.4, error in TS 5.5
```

The fix is to tell TypeScript the type that you want using an explicit type annotation:

```tsx
const nums: (number | null)[] = [1, 2, 3, null, 5].filter(x => x !== null);
nums.push(null);  // ok in all versions
```

For more information, check out the implementing pull request and Dan's blog post about implementing this feature.

## Control Flow Narrowing for Constant Indexed Accesses

TypeScript is now able to narrow expressions of the form `obj[key]` when both `obj` and `key` are effectively constant.

```ts
function f1(obj: Record<string, unknown>, key: string) {
    if (typeof obj[key] === "string") {
        // Now okay, previously was error
        obj[key].toUpperCase();
    }
}
```

In the above, neither `obj` nor `key` are ever mutated, so TypeScript can narrow the type of `obj[key]` to `string` after the `typeof` check.
For more information, see the implementing pull request here.

## The JSDoc `@import` Tag

Today, if you want to import something only for type-checking in a JavaScript file, it is cumbersome.
JavaScript developers can't simply import a type named `SomeType` if it's not there at runtime.

```js
// ./some-module.d.ts
export interface SomeType {
    // ...
}

// ./index.js
import { SomeType } from "./some-module"; // ❌ runtime error!

/**
 * @param {SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

`SomeType` won't exist at runtime, so the import will fail.
Developers can instead use a namespace import instead.

```js
import * as someModule from "./some-module";

/**
 * @param {someModule.SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

But `./some-module` is still imported at runtime - which might also not be desirable.

To avoid this, developers typically had to use `import(...)` types in JSDoc comments.

```js
/**
 * @param {import("./some-module").SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

If you wanted to reuse the same type in multiple places, you could use a `typedef` to avoid repeating the import.

```js
/**
 * @typedef {import("./some-module").SomeType} SomeType
 */

/**
 * @param {SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

This helps with local uses of `SomeType`, but it gets repetitive for many imports and can be a bit verbose.

That's why TypeScript now supports a new `@import` comment tag that has the same syntax as ECMAScript imports.

```js
/** @import { SomeType } from "some-module" */

/**
 * @param {SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

Here, we used named imports.
We could also have written our import as a namespace import.

```js
/** @import * as someModule from "some-module" */

/**
 * @param {someModule.SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

Because these are just JSDoc comments, they don't affect runtime behavior at all.

We would like to extend a big thanks to Oleksandr Tarasiuk who contributed this change!

## Regular Expression Syntax Checking

Until now, TypeScript has typically skipped over most regular expressions in code.
This is because regular expressions technically have an extensible grammar and TypeScript never made any effort to compile regular expressions to earlier versions of JavaScript.
Still, this meant that lots of common problems would go undiscovered in regular expressions, and they would either turn into errors at runtime, or silently fail.

But TypeScript now does basic syntax checking on regular expressions!

```ts
let myRegex = /@robot(\s+(please|immediately)))? do some task/;
//                                            ~
// error!
// Unexpected ')'. Did you mean to escape it with backslash?
```

This is a simple example, but this checking can catch a lot of common mistakes.
In fact, TypeScript's checking goes slightly beyond syntactic checks.
For instance, TypeScript can now catch issues around backreferences that don't exist.

```ts
let myRegex = /@typedef \{import\((.+)\)\.([a-zA-Z_]+)\} \3/u;
//                                                        ~
// error!
// This backreference refers to a group that does not exist.
// There are only 2 capturing groups in this regular expression.
```

The same applies to named capturing groups.

```ts
let myRegex = /@typedef \{import\((?<importPath>.+)\)\.(?<importedEntity>[a-zA-Z_]+)\} \k<namedImport>/;
//                                                                                        ~~~~~~~~~~~
// error!
// There is no capturing group named 'namedImport' in this regular expression.
```

TypeScript's checking is now also aware of when certain RegExp features are used when newer than your target version of ECMAScript.
For example, if we use named capturing groups like the above in an ES5 target, we'll get an error.

```ts
let myRegex = /@typedef \{import\((?<importPath>.+)\)\.(?<importedEntity>[a-zA-Z_]+)\} \k<importedEntity>/;
//                                  ~~~~~~~~~~~~         ~~~~~~~~~~~~~~~~
// error!
// Named capturing groups are only available when targeting 'ES2018' or later.
```

The same is true for certain regular expression flags as well.

Note that TypeScript's regular expression support is limited to regular expression *literals*.
If you try calling `new RegExp` with a string literal, TypeScript will not check the provided string.

We would like to thank GitHub user graphemecluster who iterated a ton with us to get this feature into TypeScript.

## Support for New ECMAScript `Set` Methods

TypeScript 5.5 declares new proposed methods for the ECMAScript `Set` type.

Some of these methods, like `union`, `intersection`, `difference`, and `symmetricDifference`, take another `Set` and return a new `Set` as the result.
The other methods, `isSubsetOf`, `isSupersetOf`, and `isDisjointFrom`, take another `Set` and return a `boolean`.
None of these methods mutate the original `Set`s.

Here's a quick example of how you might use these methods and how they behave:

```ts
let fruits = new Set(["apples", "bananas", "pears", "oranges"]);
let applesAndBananas = new Set(["apples", "bananas"]);
let applesAndOranges = new Set(["apples", "oranges"]);
let oranges = new Set(["oranges"]);
let emptySet = new Set();

////
// union
////

// Set(4) {'apples', 'bananas', 'pears', 'oranges'}
console.log(fruits.union(oranges));

// Set(3) {'apples', 'bananas', 'oranges'}
console.log(applesAndBananas.union(oranges));

////
// intersection
////

// Set(2) {'apples', 'bananas'}
console.log(fruits.intersection(applesAndBananas));

// Set(0) {}
console.log(applesAndBananas.intersection(oranges));

// Set(1) {'apples'}
console.log(applesAndBananas.intersection(applesAndOranges));

////
// difference
////

// Set(3) {'apples', 'bananas', 'pears'}
console.log(fruits.difference(oranges));

// Set(2) {'pears', 'oranges'}
console.log(fruits.difference(applesAndBananas));

// Set(1) {'bananas'}
console.log(applesAndBananas.difference(applesAndOranges));

////
// symmetricDifference
////

// Set(2) {'bananas', 'oranges'}
console.log(applesAndBananas.symmetricDifference(applesAndOranges)); // no apples

////
// isDisjointFrom
////

// true
console.log(applesAndBananas.isDisjointFrom(oranges));

// false
console.log(applesAndBananas.isDisjointFrom(applesAndOranges));

// true
console.log(fruits.isDisjointFrom(emptySet));

// true
console.log(emptySet.isDisjointFrom(emptySet));

////
// isSubsetOf
////

// true
console.log(applesAndBananas.isSubsetOf(fruits));

// false
console.log(fruits.isSubsetOf(applesAndBananas));

// false
console.log(applesAndBananas.isSubsetOf(oranges));

// true
console.log(fruits.isSubsetOf(fruits));

// true
console.log(emptySet.isSubsetOf(fruits));

////
// isSupersetOf
////

// true
console.log(fruits.isSupersetOf(applesAndBananas));

// false
console.log(applesAndBananas.isSupersetOf(fruits));

// false
console.log(applesAndBananas.isSupersetOf(oranges));

// true
console.log(fruits.isSupersetOf(fruits));

// false
console.log(emptySet.isSupersetOf(fruits));
```

We'd like to thank Kevin Gibbons who not only co-championed the feature in ECMAScript, but also provided the declarations for `Set`, `ReadonlySet`, and `ReadonlySetLike` in TypeScript!
