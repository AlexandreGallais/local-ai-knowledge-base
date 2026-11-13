---
title: "TypeScript 4.4 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.4.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.4

## Control Flow Analysis of Aliased Conditions and Discriminants

In JavaScript, we often have to probe a value in different ways, and do something different once we know more about its type.
TypeScript understands these checks and calls them _type guards_.
Instead of having to convince TypeScript of a variable's type whenever we use it, the type-checker leverages something called _control flow analysis_ to see if we've used a type guard before a given piece of code.

For example, we can write something like

```ts
function foo(arg: unknown) {
  if (typeof arg === "string") {
    console.log(arg.toUpperCase());
  }
}
```

In this example, we checked whether `arg` was a `string`.
TypeScript recognized the `typeof arg === "string"` check, which it considered a type guard, and knew that `arg` was a `string` inside the body of the `if` block.
That let us access `string` methods like `toUpperCase()` without getting an error.

However, what would happen if we moved the condition out to a constant called `argIsString`?

```ts
// In TS 4.3 and below

function foo(arg: unknown) {
  const argIsString = typeof arg === "string";
  if (argIsString) {
    console.log(arg.toUpperCase());
    //              ~~~~~~~~~~~
    // Error! Property 'toUpperCase' does not exist on type 'unknown'.
  }
}
```

In previous versions of TypeScript, this would be an error - even though `argIsString` was assigned the value of a type guard, TypeScript simply lost that information.
That's unfortunate since we might want to re-use the same check in several places.
To get around that, users often have to repeat themselves or use type assertions (a.k.a. casts).

In TypeScript 4.4, that is no longer the case.
The above example works with no errors!
When TypeScript sees that we are testing a constant value, it will do a little bit of extra work to see if it contains a type guard.
If that type guard operates on a `const`, a `readonly` property, or an un-modified parameter, then TypeScript is able to narrow that value appropriately.

Different sorts of type guard conditions are preserved - not just `typeof` checks.
For example, checks on discriminated unions work like a charm.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number };

function area(shape: Shape): number {
  const isCircle = shape.kind === "circle";
  if (isCircle) {
    // We know we have a circle here!
    return Math.PI * shape.radius ** 2;
  } else {
    // We know we're left with a square here!
    return shape.sideLength ** 2;
  }
}
```

Analysis on discriminants in 4.4 also goes a little bit deeper - we can now extract out discriminants and TypeScript can narrow the original object.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number };

function area(shape: Shape): number {
  // Extract out the 'kind' field first.
  const { kind } = shape;

  if (kind === "circle") {
    // We know we have a circle here!
    return Math.PI * shape.radius ** 2;
  } else {
    // We know we're left with a square here!
    return shape.sideLength ** 2;
  }
}
```

As another example, here's a function that checks whether two of its inputs have contents.

```ts
function doSomeChecks(
  inputA: string | undefined,
  inputB: string | undefined,
  shouldDoExtraWork: boolean
) {
  const mustDoWork = inputA && inputB && shouldDoExtraWork;
  if (mustDoWork) {
    // We can access 'string' properties on both 'inputA' and 'inputB'!
    const upperA = inputA.toUpperCase();
    const upperB = inputB.toUpperCase();
    // ...
  }
}
```

TypeScript can understand that both `inputA` and `inputB` are both present if `mustDoWork` is `true`.
That means we don't have to write a non-null assertion like `inputA!` to convince TypeScript that `inputA` isn't `undefined`.

One neat feature here is that this analysis works transitively.
TypeScript will hop through constants to understand what sorts of checks you've already performed.

```ts
function f(x: string | number | boolean) {
  const isString = typeof x === "string";
  const isNumber = typeof x === "number";
  const isStringOrNumber = isString || isNumber;
  if (isStringOrNumber) {
    x;
  } else {
    x;
  }
}
```

Note that there's a cutoff - TypeScript doesn't go arbitrarily deep when checking these conditions, but its analysis is deep enough for most checks.

This feature should make a lot of intuitive JavaScript code "just work" in TypeScript without it getting in your way.
For more details, check out the implementation on GitHub!

## Symbol and Template String Pattern Index Signatures

TypeScript lets us describe objects where every property has to have a certain type using _index signatures_.
This allows us to use these objects as dictionary-like types, where we can use string keys to index into them with square brackets.

For example, we can write a type with an index signature that takes `string` keys and maps to `boolean` values.
If we try to assign anything other than a `boolean` value, we'll get an error.

```ts
interface BooleanDictionary {
  [key: <example-value>]: boolean;
}

declare let myDict: BooleanDictionary;

// Valid to assign boolean values
myDict["foo"] = true;
myDict["bar"] = false;

// Error, "oops" isn't a boolean
myDict["baz"] = "oops";
```

While a `Map` might be a better data structure here (specifically, a `Map<string, boolean>`), JavaScript objects are often more convenient to use or just happen to be what we're given to work with.

Similarly, `Array<T>` already defines a `number` index signature that lets us insert/retrieve values of type `T`.

```ts
// This is part of TypeScript's definition of the built-in Array type.
interface Array<T> {
  [index: number]: T;

  // ...
}

let arr = new Array<string>();

// Valid
arr[0] = "hello!";

// Error, expecting a 'string' value here
arr[1] = 123;
```

Index signatures are very useful to express lots of code out in the wild;
however, until now they've been limited to `string` and `number` keys (and `string` index signatures have an intentional quirk where they can accept `number` keys since they'll be coerced to strings anyway).
That means that TypeScript didn't allow indexing objects with `symbol` keys.
TypeScript also couldn't model an index signature of some _subset_ of `string` keys - for example, an index signature which describes just properties whose names start with the text `data-`.

TypeScript 4.4 addresses these limitations, and allows index signatures for `symbol`s and template string patterns.

For example, TypeScript now allows us to declare a type that can be keyed on arbitrary `symbol`s.

```ts
interface Colors {
  [sym: symbol]: number;
}

const red = Symbol("red");
const green = Symbol("green");
const blue = Symbol("blue");

let colors: Colors = {};

// Assignment of a number is allowed
colors[red] = 255;
let redVal = colors[red];

colors[blue] = "da ba dee";
```

Similarly, we can write an index signature with template string pattern type.
One use of this might be to exempt properties starting with `data-` from TypeScript's excess property checking.
When we pass an object literal to something with an expected type, TypeScript will look for excess properties that weren't declared in the expected type.

```ts
interface Options {
    width?: number;
    height?: number;
}

let a: Options = {
    width: 100,
    height: 100,

    "data-blah": true,
};

interface OptionsWithDataProps extends Options {
    // Permit any property starting with 'data-'.
    [optName: `data-${string}`]: unknown;
}

let b: OptionsWithDataProps = {
    width: 100,
    height: 100,
    "data-blah": true,

    // Fails for a property which is not known, nor
    // starts with 'data-'
    "unknown-property": true,
};
```

A final note on index signatures is that they now permit union types, as long as they're a union of infinite-domain primitive types - specifically:

- `string`
- `number`
- `symbol`
- template string patterns (e.g. `` `hello-${string}` ``)

An index signature whose argument is a union of these types will de-sugar into several different index signatures.

```ts
interface Data {
  [optName: string | symbol]: any;
}

// Equivalent to

interface Data {
  [optName: string]: any;
  [optName: symbol]: any;
}
```

For more details, read up on the pull request

## Defaulting to the `unknown` Type in Catch Variables (`--useUnknownInCatchVariables`)

In JavaScript, any type of value can be thrown with `throw` and caught in a `catch` clause.
Because of this, TypeScript historically typed catch clause variables as `any`, and would not allow any other type annotation:

```ts
try {
  // Who knows what this might throw...
  executeSomeThirdPartyCode();
} catch (err) {
  // err: any
  console.error(err.message); // Allowed, because 'any'
  err.thisWillProbablyFail(); // Allowed, because 'any' :(
}
```

Once TypeScript added the `unknown` type, it became clear that `unknown` was a better choice than `any` in `catch` clause variables for users who want the highest degree of correctness and type-safety, since it narrows better and forces us to test against arbitrary values.
Eventually TypeScript 4.0 allowed users to specify an explicit type annotation of `unknown` (or `any`) on each `catch` clause variable so that we could opt into stricter types on a case-by-case basis;
however, for some, manually specifying `: unknown` on every `catch` clause was a chore.

That's why TypeScript 4.4 introduces a new flag called `useUnknownInCatchVariables`.
This flag changes the default type of `catch` clause variables from `any` to `unknown`.

```ts
declare function executeSomeThirdPartyCode(): void;
try {
  executeSomeThirdPartyCode();
} catch (err) {
  // err: unknown

  // Error! Property 'message' does not exist on type 'unknown'.
  console.error(err.message);

  // Works! We can narrow 'err' from 'unknown' to 'Error'.
  if (err instanceof Error) {
    console.error(err.message);
  }
}
```

This flag is enabled under the `strict` family of options.
That means that if you check your code using `strict`, this option will automatically be turned on.
You may end up with errors in TypeScript 4.4 such as

```
Property 'message' does not exist on type 'unknown'.
Property 'name' does not exist on type 'unknown'.
Property 'stack' does not exist on type 'unknown'.
```

In cases where we don't want to deal with an `unknown` variable in a `catch` clause, we can always add an explicit `: any` annotation so that we can opt _out_ of stricter types.

```ts
declare function executeSomeThirdPartyCode(): void;
try {
  executeSomeThirdPartyCode();
} catch (err: any) {
  console.error(err.message); // Works again!
}
```

For more information, take a look at the implementing pull request.

## Exact Optional Property Types (`--exactOptionalPropertyTypes`)

In JavaScript, reading a _missing_ property on an object produces the value `undefined`.
It's also possible to _have_ an actual property with the value `undefined`.
A lot of code in JavaScript tends to treat these situations the same way, and so initially TypeScript just interpreted every optional property as if a user had written `undefined` in the type.
For example,

```ts
interface Person {
  name: string;
  age?: number;
}
```

was considered equivalent to

```ts
interface Person {
  name: string;
  age?: number | undefined;
}
```

What this meant is that a user could explicitly write `undefined` in place of `age`.

```ts
const p: Person = {
  name: "Daniel",
  age: undefined, // This is okay by default.
};
```

So by default, TypeScript doesn't distinguish between a present property with the value `undefined` and a missing property.
While this works most of the time, not all code in JavaScript makes the same assumptions.
Functions and operators like `Object.assign`, `Object.keys`, object spread (`{ ...obj }`), and `for`-`in` loops behave differently depending on whether or not a property actually exists on an object.
In the case of our `Person` example, this could potentially lead to runtime errors if the `age` property was observed in a context where its presence was important.

In TypeScript 4.4, the new flag `exactOptionalPropertyTypes` specifies that optional property types should be interpreted exactly as written, meaning that `| undefined` is not added to the type:

```ts
interface Person {
  name: string;
  age?: number;
}
// With 'exactOptionalPropertyTypes' on:
const p: Person = {
  name: "Daniel",
  age: undefined, // Error! undefined isn't a number
};
```

This flag is **not** part of the `strict` family and needs to be turned on explicitly if you'd like this behavior.
It also requires `strictNullChecks` to be enabled as well.
We've been making updates to DefinitelyTyped and other definitions to try to make the transition as straightforward as possible, but you may encounter some friction with this depending on how your code is structured.

For more information, you can take a look at the implementing pull request here.

## `static` Blocks in Classes

TypeScript 4.4 brings support for `static` blocks in classes, an upcoming ECMAScript feature that can help you write more-complex initialization code for static members.

```ts
declare function someCondition(): boolean
class Foo {
    static count = 0;

    // This is a static block:
    static {
        if (someCondition()) {
            Foo.count++;
        }
    }
}
```

These static blocks allow you to write a sequence of statements with their own scope that can access private fields within the containing class.
That means that we can write initialization code with all the capabilities of writing statements, no leakage of variables, and full access to our class's internals.

```ts
declare function loadLastInstances(): any[]
class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```

Without `static` blocks, writing the code above was possible, but often involved several different types of hacks that had to compromise in some way.

Note that a class can have multiple `static` blocks, and they're run in the same order in which they're written.

```ts
// Prints:
//    1
//    2
//    3
class Foo {
    static prop = 1
    static {
        console.log(Foo.prop++);
    }
    static {
        console.log(Foo.prop++);
    }
    static {
        console.log(Foo.prop++);
    }
}
```

We'd like to extend our thanks to Wenlu Wang for TypeScript's implementation of this feature.
For more details, you can see that pull request here.
