---
title: "TypeScript 4.0 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.0

## Variadic Tuple Types

Consider a function in JavaScript called `concat` that takes two array or tuple types and concatenates them together to make a new array.

```js
function concat(arr1, arr2) {
  return [...arr1, ...arr2];
}
```

Also consider `tail`, that takes an array or tuple, and returns all elements but the first.

```js
function tail(arg) {
  const [_, ...result] = arg;
  return result;
}
```

How would we type either of these in TypeScript?

For `concat`, the only valid thing we could do in older versions of the language was to try and write some overloads.

```ts
function concat(arr1: [], arr2: []): [];
function concat<A>(arr1: [A], arr2: []): [A];
function concat<A, B>(arr1: [A, B], arr2: []): [A, B];
function concat<A, B, C>(arr1: [A, B, C], arr2: []): [A, B, C];
function concat<A, B, C, D>(arr1: [A, B, C, D], arr2: []): [A, B, C, D];
function concat<A, B, C, D, E>(arr1: [A, B, C, D, E], arr2: []): [A, B, C, D, E];
function concat<A, B, C, D, E, F>(arr1: [A, B, C, D, E, F], arr2: []): [A, B, C, D, E, F];
```

Uh...okay, that's...seven overloads for when the second array is always empty.
Let's add some for when `arr2` has one argument.

```ts
function concat<A2>(arr1: [], arr2: [A2]): [A2];
function concat<A1, A2>(arr1: [A1], arr2: [A2]): [A1, A2];
function concat<A1, B1, A2>(arr1: [A1, B1], arr2: [A2]): [A1, B1, A2];
function concat<A1, B1, C1, A2>(arr1: [A1, B1, C1], arr2: [A2]): [A1, B1, C1, A2];
function concat<A1, B1, C1, D1, A2>(arr1: [A1, B1, C1, D1], arr2: [A2]): [A1, B1, C1, D1, A2];
function concat<A1, B1, C1, D1, E1, A2>(arr1: [A1, B1, C1, D1, E1], arr2: [A2]): [A1, B1, C1, D1, E1, A2];
function concat<A1, B1, C1, D1, E1, F1, A2>(arr1: [A1, B1, C1, D1, E1, F1], arr2: [A2]): [A1, B1, C1, D1, E1, F1, A2];
```

We hope it's clear that this is getting unreasonable.
Unfortunately, you'd also end up with the same sorts of issues typing a function like `tail`.

This is another case of what we like to call "death by a thousand overloads", and it doesn't even solve the problem generally.
It only gives correct types for as many overloads as we care to write.
If we wanted to make a catch-all case, we'd need an overload like the following:

```ts
function concat<T, U>(arr1: T[], arr2: U[]): Array<T | U>;
```

But that signature doesn't encode anything about the lengths of the input, or the order of the elements, when using tuples.

TypeScript 4.0 brings two fundamental changes, along with inference improvements, to make typing these possible.

The first change is that spreads in tuple type syntax can now be generic.
This means that we can represent higher-order operations on tuples and arrays even when we don't know the actual types we're operating over.
When generic spreads are instantiated (or, replaced with a real type) in these tuple types, they can produce other sets of array and tuple types.

For example, that means we can type function like `tail`, without our "death by a thousand overloads" issue.

```ts
function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}

const myTuple = [1, 2, 3, 4] as const;
const myArray = ["hello", "world"];

const r1 = tail(myTuple);

const r2 = tail([...myTuple, ...myArray] as const);
```

The second change is that rest elements can occur anywhere in a tuple - not just at the end!

```ts
type Strings = [string, string];
type Numbers = [number, number];

type StrStrNumNumBool = [...Strings, ...Numbers, boolean];
```

Previously, TypeScript would issue an error like the following:

```
A rest element must be last in a tuple type.
```

But with TypeScript 4.0, this restriction is relaxed.

Note that in cases when we spread in a type without a known length, the resulting type becomes unbounded as well, and all the following elements factor into the resulting rest element type.

```ts
type Strings = [string, string];
type Numbers = number[];

type Unbounded = [...Strings, ...Numbers, boolean];
```

By combining both of these behaviors together, we can write a single well-typed signature for `concat`:

```ts
type Arr = readonly any[];

function concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2];
}
```

While that one signature is still a bit lengthy, it's just one signature that doesn't have to be repeated, and it gives predictable behavior on all arrays and tuples.

This functionality on its own is great, but it shines in more sophisticated scenarios too.
For example, consider a function to partially apply arguments called `partialCall`.
`partialCall` takes a function - let's call it `f` - along with the initial few arguments that `f` expects.
It then returns a new function that takes any other arguments that `f` still needs, and calls `f` when it receives them.

```js
function partialCall(f, ...headArgs) {
  return (...tailArgs) => f(...headArgs, ...tailArgs);
}
```

TypeScript 4.0 improves the inference process for rest parameters and rest tuple elements so that we can type this and have it "just work".

```ts
type Arr = readonly unknown[];

function partialCall<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs);
}
```

In this case, `partialCall` understands which parameters it can and can't initially take, and returns functions that appropriately accept and reject anything left over.

```ts
type Arr = readonly unknown[];

function partialCall<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs);
}
const foo = (x: string, y: number, z: boolean) => {};

const f1 = partialCall(foo, 100);

const f2 = partialCall(foo, "hello", 100, true, "oops");

// This works!
const f3 = partialCall(foo, "hello");

// What can we do with f3 now?

// Works!
f3(123, true);

f3();

f3(123, "hello");
```

Variadic tuple types enable a lot of new exciting patterns, especially around function composition.
We expect we may be able to leverage it to do a better job type-checking JavaScript's built-in `bind` method.
A handful of other inference improvements and patterns also went into this, and if you're interested in learning more, you can take a look at the pull request for variadic tuples.

## Labeled Tuple Elements

Improving the experience around tuple types and parameter lists is important because it allows us to get strongly typed validation around common JavaScript idioms - really just slicing and dicing argument lists and passing them to other functions.
The idea that we can use tuple types for rest parameters is one place where this is crucial.

For example, the following function that uses a tuple type as a rest parameter...

```ts
function foo(...args: [string, number]): void {
  // ...
}
```

...should appear no different from the following function...

```ts
function foo(arg0: string, arg1: number): void {
  // ...
}
```

...for any caller of `foo`.

```ts
function foo(arg0: string, arg1: number): void {
  // ...
}
foo("hello", 42);

foo("hello", 42, true);
foo("hello");
```

There is one place where the differences begin to become observable though: readability.
In the first example, we have no parameter names for the first and second elements.
While these have no impact on type-checking, the lack of labels on tuple positions can make them harder to use - harder to communicate our intent.

That's why in TypeScript 4.0, tuples types can now provide labels.

```ts
type Range = [start: number, end: number];
```

To deepen the connection between parameter lists and tuple types, the syntax for rest elements and optional elements mirrors the syntax for parameter lists.

```ts
type Foo = [first: number, second?: string, ...rest: any[]];
```

There are a few rules when using labeled tuples.
For one, when labeling a tuple element, all other elements in the tuple must also be labeled.

```ts
type Bar = [first: string, number];
```

It's worth noting - labels don't require us to name our variables differently when destructuring.
They're purely there for documentation and tooling.

```ts
function foo(x: [first: string, second: number]) {
    // ...

    // note: we didn't need to name these 'first' and 'second'
    const [a, b] = x;
    a
    b
}
```

Overall, labeled tuples are handy when taking advantage of patterns around tuples and argument lists, along with implementing overloads in a type-safe way.
In fact, TypeScript's editor support will try to display them as overloads when possible.

To learn more, check out the pull request for labeled tuple elements.

## Class Property Inference from Constructors

TypeScript 4.0 can now use control flow analysis to determine the types of properties in classes when `noImplicitAny` is enabled.

```ts
class Square {
  // Previously both of these were any
  area;
  sideLength;
  constructor(sideLength: number) {
    this.sideLength = sideLength;
    this.area = sideLength ** 2;
  }
}
```

In cases where not all paths of a constructor assign to an instance member, the property is considered to potentially be `undefined`.

```ts
class Square {
  sideLength;

  constructor(sideLength: number) {
    if (Math.random()) {
      this.sideLength = sideLength;
    }
  }

  get area() {
    return this.sideLength ** 2;
  }
}
```

In cases where you know better (e.g. you have an `initialize` method of some sort), you'll still need an explicit type annotation along with a definite assignment assertion (`!`) if you're in `strictPropertyInitialization`.

```ts
class Square {
  // definite assignment assertion
  //        v
  sideLength!: number;
  //         ^^^^^^^^
  // type annotation

  constructor(sideLength: number) {
    this.initialize(sideLength);
  }

  initialize(sideLength: number) {
    this.sideLength = sideLength;
  }

  get area() {
    return this.sideLength ** 2;
  }
}
```

For more details, see the implementing pull request.

## Short-Circuiting Assignment Operators

JavaScript, and a lot of other languages, support a set of operators called _compound assignment_ operators.
Compound assignment operators apply an operator to two arguments, and then assign the result to the left side.
You may have seen these before:

```ts
// Addition
// a = a + b
a += b;

// Subtraction
// a = a - b
a -= b;

// Multiplication
// a = a * b
a *= b;

// Division
// a = a / b
a /= b;

// Exponentiation
// a = a ** b
a **= b;

// Left Bit Shift
// a = a << b
a <<= b;
```

So many operators in JavaScript have a corresponding assignment operator!
Up until recently, however, there were three notable exceptions: logical _and_ (`&&`), logical _or_ (`||`), and nullish coalescing (`??`).

That's why TypeScript 4.0 supports a new ECMAScript feature to add three new assignment operators: `&&=`, `||=`, and `??=`.

These operators are great for substituting any example where a user might write code like the following:

```ts
a = a && b;
a = a || b;
a = a ?? b;
```

Or a similar `if` block like

```ts
// could be 'a ||= b'
if (!a) {
  a = b;
}
```

There are even some patterns we've seen (or, uh, written ourselves) to lazily initialize values, only if they'll be needed.

```ts
let values: string[];
(values ?? (values = [])).push("hello");

// After
(values ??= []).push("hello");
```

(look, we're not proud of _all_ the code we write...)

On the rare case that you use getters or setters with side-effects, it's worth noting that these operators only perform assignments if necessary.
In that sense, not only is the right side of the operator "short-circuited" - the assignment itself is too.

```ts
obj.prop ||= foo();

// roughly equivalent to either of the following

obj.prop || (obj.prop = foo());

if (!obj.prop) {
    obj.prop = foo();
}
```

Try running the following example to see how that differs from _always_ performing the assignment.

```ts
const obj = {
    get prop() {
        console.log("getter has run");

        // Replace me!
        return Math.random() < 0.5;
    },
    set prop(_val: boolean) {
        console.log("setter has run");
    }
};

function foo() {
    console.log("right side evaluated");
    return true;
}

console.log("This one always runs the setter");
obj.prop = obj.prop || foo();

console.log("This one *sometimes* runs the setter");
obj.prop ||= foo();
```

We'd like to extend a big thanks to community member Wenlu Wang for this contribution!

For more details, you can take a look at the pull request here.
You can also check out TC39's proposal repository for this feature.

## `unknown` on `catch` Clause Bindings

Since the beginning days of TypeScript, `catch` clause variables have always been typed as `any`.
This meant that TypeScript allowed you to do anything you wanted with them.

```ts
try {
  // Do some work
} catch (x) {
  // x has type 'any' - have fun!
  console.log(x.message);
  console.log(x.toUpperCase());
  x++;
  x.yadda.yadda.yadda();
}
```

The above has some undesirable behavior if we're trying to prevent _more_ errors from happening in our error-handling code!
Because these variables have the type `any` by default, they lack any type-safety which could have errored on invalid operations.

That's why TypeScript 4.0 now lets you specify the type of `catch` clause variables as `unknown` instead.
`unknown` is safer than `any` because it reminds us that we need to perform some sorts of type-checks before operating on our values.

```ts
try {
  // ...
} catch (e: unknown) {
  // Can't access values on unknowns
  console.log(e.toUpperCase());

  if (typeof e === "string") {
    // We've narrowed 'e' down to the type 'string'.
    console.log(e.toUpperCase());
  }
}
```

While the types of `catch` variables won't change by default, we might consider a new `strict` mode flag in the future so that users can opt in to this behavior.
In the meantime, it should be possible to write a lint rule to force `catch` variables to have an explicit annotation of either `: any` or `: unknown`.

For more details you can peek at the changes for this feature.
