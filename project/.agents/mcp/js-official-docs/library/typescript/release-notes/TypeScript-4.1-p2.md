---
title: "TypeScript 4.1 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.1.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.1 (part 2 of 2)

## React 17 JSX Factories

TypeScript 4.1 supports React 17's upcoming `jsx` and `jsxs` factory functions through two new options for the `jsx` compiler option:

- `react-jsx`
- `react-jsxdev`

These options are intended for production and development compiles respectively.
Often, the options from one can extend from the other.
For example, a `tsconfig.json` for production builds might look like the following:

```json
// ./src/tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es2015",
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["./**/*"]
}
```

and one for development builds might look like the following:

```json
// ./src/tsconfig.dev.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsxdev"
  }
}
```

For more information, check out the corresponding PR.

## Editor Support for the JSDoc `@see` Tag

The JSDoc tag `@see` tag now has better support in editors for TypeScript and JavaScript.
This allows you to use functionality like go-to-definition in a dotted name following the tag.
For example, going to definition on `first` or `C` in the JSDoc comment just works in the following example:

```ts
export class C {}

import * as first from "./first";

/**
 * @see first.C
 */
function related() {}
```

Thanks to frequent contributor Wenlu Wang for implementing this!

## Breaking Changes

### `lib.d.ts` Changes

`lib.d.ts` may have a set of changed APIs, potentially in part due to how the DOM types are automatically generated.
One specific change is that `Reflect.enumerate` has been removed, as it was removed from ES2016.

### `abstract` Members Can't Be Marked `async`

Members marked as `abstract` can no longer be marked as `async`.
The fix here is to remove the `async` keyword, since callers are only concerned with the return type.

### `any`/`unknown` Are Propagated in Falsy Positions

Previously, for an expression like `foo && somethingElse`, the type of `foo` was `any` or `unknown`, the type of the whole that expression would be the type of `somethingElse`.

For example, previously the type for `x` here was `{ someProp: string }`.

```ts
declare let foo: unknown;
declare let somethingElse: { someProp: string };

let x = foo && somethingElse;
```

However, in TypeScript 4.1, we are more careful about how we determine this type.
Since nothing is known about the type on the left side of the `&&`, we propagate `any` and `unknown` outward instead of the type on the right side.

The most common pattern we saw of this tended to be when checking compatibility with `boolean`s, especially in predicate functions.

```ts
function isThing(x: any): boolean {
  return x && typeof x === "object" && x.blah === "foo";
}
```

Often the appropriate fix is to switch from `foo && someExpression` to `!!foo && someExpression`.

### `resolve`'s Parameters Are No Longer Optional in `Promise`s

When writing code like the following

```ts
new Promise((resolve) => {
  doSomethingAsync(() => {
    doSomething();
    resolve();
  });
});
```

You may get an error like the following:

```
  resolve()
  ~~~~~~~~~
error TS2554: Expected 1 arguments, but got 0.
  An argument for 'value' was not provided.
```

This is because `resolve` no longer has an optional parameter, so by default, it must now be passed a value.
Often this catches legitimate bugs with using `Promise`s.
The typical fix is to pass it the correct argument, and sometimes to add an explicit type argument.

```ts
new Promise<number>((resolve) => {
  //     ^^^^^^^^
  doSomethingAsync((value) => {
    doSomething();
    resolve(value);
    //      ^^^^^
  });
});
```

However, sometimes `resolve()` really does need to be called without an argument.
In these cases, we can give `Promise` an explicit `void` generic type argument (i.e. write it out as `Promise<void>`).
This leverages new functionality in TypeScript 4.1 where a potentially-`void` trailing parameter can become optional.

```ts
new Promise<void>((resolve) => {
  //     ^^^^^^
  doSomethingAsync(() => {
    doSomething();
    resolve();
  });
});
```

TypeScript 4.1 ships with a quick fix to help fix this break.

### Conditional Spreads Create Optional Properties

In JavaScript, object spreads (like `{ ...foo }`) don't operate over falsy values.
So in code like `{ ...foo }`, `foo` will be skipped over if it's `null` or `undefined`.

Many users take advantage of this to spread properties "conditionally".

```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

interface Animal {
  name: string;
  owner: Person;
}

function copyOwner(pet?: Animal) {
  return {
    ...(pet && pet.owner),
    otherStuff: 123,
  };
}

// We could also use optional chaining here:

function copyOwner(pet?: Animal) {
  return {
    ...pet?.owner,
    otherStuff: 123,
  };
}
```

Here, if `pet` is defined, the properties of `pet.owner` will be spread in - otherwise, no properties will be spread into the returned object.

The return type of `copyOwner` was previously a union type based on each spread:

```
{ x: number } | { x: number, name: string, age: number, location: string }
```

This modeled exactly how the operation would occur: if `pet` was defined, all the properties from `Person` would be present; otherwise, none of them would be defined on the result.
It was an all-or-nothing operation.

However, we've seen this pattern taken to the extreme, with hundreds of spreads in a single object, each spread potentially adding in hundreds or thousands of properties.
It turns out that for various reasons, this ends up being extremely expensive, and usually for not much benefit.

In TypeScript 4.1, the returned type sometimes uses all-optional properties.

```
{
    x: number;
    name?: string;
    age?: number;
    location?: string;
}
```

This ends up performing better and generally displaying better too.

For more details, see the original change.
While this behavior is not entirely consistent right now, we expect a future release will produce cleaner and more predictable results.

### Unmatched parameters are no longer related

TypeScript would previously relate parameters that didn't correspond to each other by relating them to the type `any`.
With changes in TypeScript 4.1, the language now skips this process entirely.
This means that some cases of assignability will now fail, but it also means that some cases of overload resolution can fail as well.
For example, overload resolution on `util.promisify` in Node.js may select a different overload in TypeScript 4.1, sometimes causing new or different errors downstream.

As a workaround, you may be best using a type assertion to squelch errors.
