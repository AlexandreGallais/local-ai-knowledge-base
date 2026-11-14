---
title: "TypeScript 3.7 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 3.7.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 3.7

## Optional Chaining

Playground

Optional chaining is issue #16 on our issue tracker. For context, there have been over 23,000 issues on the TypeScript issue tracker since then.

At its core, optional chaining lets us write code where TypeScript can immediately stop running some expressions if we run into a `null` or `undefined`.
The star of the show in optional chaining is the new `?.` operator for _optional property accesses_.
When we write code like

```ts
let x = foo?.bar.baz();
```

this is a way of saying that when `foo` is defined, `foo.bar.baz()` will be computed; but when `foo` is `null` or `undefined`, stop what we're doing and just return `undefined`."

More plainly, that code snippet is the same as writing the following.

```ts
let x = foo === null || foo === undefined ? undefined : foo.bar.baz();
```

Note that if `bar` is `null` or `undefined`, our code will still hit an error accessing `baz`.
Likewise, if `baz` is `null` or `undefined`, we'll hit an error at the call site.
`?.` only checks for whether the value on the _left_ of it is `null` or `undefined` - not any of the subsequent properties.

You might find yourself using `?.` to replace a lot of code that performs repetitive nullish checks using the `&&` operator.

```ts
// Before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}

// After-ish
if (foo?.bar?.baz) {
  // ...
}
```

Keep in mind that `?.` acts differently than those `&&` operations since `&&` will act specially on "falsy" values (e.g. the empty string, `0`, `NaN`, and, well, `false`), but this is an intentional feature of the construct.
It doesn't short-circuit on valid data like `0` or empty strings.

Optional chaining also includes two other operations.
First there's the _optional element access_ which acts similarly to optional property accesses, but allows us to access non-identifier properties (e.g. arbitrary strings, numbers, and symbols):

```ts
/**
 * Get the first element of the array if we have an array.
 * Otherwise return undefined.
 */
function tryGetFirstElement<T>(arr?: T[]) {
  return arr?.[0];
  // equivalent to
  //   return (arr === null || arr === undefined) ?
  //       undefined :
  //       arr[0];
}
```

There's also _optional call_, which allows us to conditionally call expressions if they're not `null` or `undefined`.

```ts
async function makeRequest(url: string, log?: (msg: string) => void) {
  log?.(`Request started at ${new Date().toISOString()}`);
  // roughly equivalent to
  //   if (log != null) {
  //       log(`Request started at ${new Date().toISOString()}`);
  //   }

  const result = (await fetch(url)).json();

  log?.(`Request finished at ${new Date().toISOString()}`);

  return result;
}
```

The "short-circuiting" behavior that optional chains have is limited property accesses, calls, element accesses - it doesn't expand any further out from these expressions.
In other words,

```ts
let result = foo?.bar / someComputation();
```

doesn't stop the division or `someComputation()` call from occurring.
It's equivalent to

```ts
let temp = foo === null || foo === undefined ? undefined : foo.bar;

let result = temp / someComputation();
```

That might result in dividing `undefined`, which is why in `strictNullChecks`, the following is an error.

```ts
function barPercentage(foo?: { bar: number }) {
  return foo?.bar / 100;
  //     ~~~~~~~~
  // Error: Object is possibly undefined.
}
```

More more details, you can read up on the proposal and view the original pull request.

## Nullish Coalescing

Playground

The _nullish coalescing operator_ is another upcoming ECMAScript feature that goes hand-in-hand with optional chaining, and which our team has been involved with championing in TC39.

You can think of this feature - the `??` operator - as a way to "fall back" to a default value when dealing with `null` or `undefined`.
When we write code like

```ts
let x = foo ?? bar();
```

this is a new way to say that the value `foo` will be used when it's "present";
but when it's `null` or `undefined`, calculate `bar()` in its place.

Again, the above code is equivalent to the following.

```ts
let x = foo !== null && foo !== undefined ? foo : bar();
```

The `??` operator can replace uses of `||` when trying to use a default value.
For example, the following code snippet tries to fetch the volume that was last saved in `localStorage` (if it ever was);
however, it has a bug because it uses `||`.

```ts
function initializeAudio() {
  let volume = localStorage.volume || 0.5;

  // ...
}
```

When `localStorage.volume` is set to `0`, the page will set the volume to `0.5` which is unintended.
`??` avoids some unintended behavior from `0`, `NaN` and `""` being treated as falsy values.

We owe a large thanks to community members Wenlu Wang and Titian Cernicova Dragomir for implementing this feature!
For more details, check out their pull request and the nullish coalescing proposal repository.

## Assertion Functions

Playground

There's a specific set of functions that `throw` an error if something unexpected happened.
They're called "assertion" functions.
As an example, Node.js has a dedicated function for this called `assert`.

```js
assert(someValue === 42);
```

In this example if `someValue` isn't equal to `42`, then `assert` will throw an `AssertionError`.

Assertions in JavaScript are often used to guard against improper types being passed in.
For example,

```js
function multiply(x, y) {
  assert(typeof x === "number");
  assert(typeof y === "number");

  return x * y;
}
```

Unfortunately in TypeScript these checks could never be properly encoded.
For loosely-typed code this meant TypeScript was checking less, and for slightly conservative code it often forced users to use type assertions.

```ts
function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase();
  // Oops! We misspelled 'toUpperCase'.
  // Would be great if TypeScript still caught this!
}
```

The alternative was to instead rewrite the code so that the language could analyze it, but this isn't convenient.

```ts
function yell(str) {
  if (typeof str !== "string") {
    throw new TypeError("str should have been a string.");
  }
  // Error caught!
  return str.toUppercase();
}
```

Ultimately the goal of TypeScript is to type existing JavaScript constructs in the least disruptive way.
For that reason, TypeScript 3.7 introduces a new concept called "assertion signatures" which model these assertion functions.

The first type of assertion signature models the way that Node's `assert` function works.
It ensures that whatever condition is being checked must be true for the remainder of the containing scope.

```ts
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}
```

`asserts condition` says that whatever gets passed into the `condition` parameter must be true if the `assert` returns (because otherwise it would throw an error).
That means that for the rest of the scope, that condition must be truthy.
As an example, using this assertion function means we _do_ catch our original `yell` example.

```ts
function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}
```

The other type of assertion signature doesn't check for a condition, but instead tells TypeScript that a specific variable or property has a different type.

```ts
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}
```

Here `asserts val is string` ensures that after any call to `assertIsString`, any variable passed in will be known to be a `string`.

```ts
function yell(str: any) {
  assertIsString(str);

  // Now TypeScript knows that 'str' is a 'string'.

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}
```

These assertion signatures are very similar to writing type predicate signatures:

```ts
function isString(val: any): val is string {
  return typeof val === "string";
}

function yell(str: any) {
  if (isString(str)) {
    return str.toUppercase();
  }
  throw "Oops!";
}
```

And just like type predicate signatures, these assertion signatures are incredibly expressive.
We can express some fairly sophisticated ideas with these.

```ts
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}
```

To read up more about assertion signatures, check out the original pull request.

## Better Support for `never`-Returning Functions

As part of the work for assertion signatures, TypeScript needed to encode more about where and which functions were being called.
This gave us the opportunity to expand support for another class of functions: functions that return `never`.

The intent of any function that returns `never` is that it never returns.
It indicates that an exception was thrown, a halting error condition occurred, or that the program exited.
For example, `process.exit(...)` in `@types/node` is specified to return `never`.

In order to ensure that a function never potentially returned `undefined` or effectively returned from all code paths, TypeScript needed some syntactic signal - either a `return` or `throw` at the end of a function.
So users found themselves `return`-ing their failure functions.

```ts
function dispatch(x: string | number): SomeType {
  if (typeof x === "string") {
    return doThingWithString(x);
  } else if (typeof x === "number") {
    return doThingWithNumber(x);
  }
  return process.exit(1);
}
```

Now when these `never`-returning functions are called, TypeScript recognizes that they affect the control flow graph and accounts for them.

```ts
function dispatch(x: string | number): SomeType {
  if (typeof x === "string") {
    return doThingWithString(x);
  } else if (typeof x === "number") {
    return doThingWithNumber(x);
  }
  process.exit(1);
}
```

As with assertion functions, you can read up more at the same pull request.

## (More) Recursive Type Aliases

Playground

Type aliases have always had a limitation in how they could be "recursively" referenced.
The reason is that any use of a type alias needs to be able to substitute itself with whatever it aliases.
In some cases, that's not possible, so the compiler rejects certain recursive aliases like the following:

```ts
type Foo = Foo;
```

This is a reasonable restriction because any use of `Foo` would need to be replaced with `Foo` which would need to be replaced with `Foo` which would need to be replaced with `Foo` which... well, hopefully you get the idea!
In the end, there isn't a type that makes sense in place of `Foo`.

This is fairly consistent with how other languages treat type aliases, but it does give rise to some slightly surprising scenarios for how users leverage the feature.
For example, in TypeScript 3.6 and prior, the following causes an error.

```ts
type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
//   ~~~~~~~~~~~~
// error: Type alias 'ValueOrArray' circularly references itself.
```

This is strange because there is technically nothing wrong with any use users could always write what was effectively the same code by introducing an interface.

```ts
type ValueOrArray<T> = T | ArrayOfValueOrArray<T>;

interface ArrayOfValueOrArray<T> extends Array<ValueOrArray<T>> {}
```

Because interfaces (and other object types) introduce a level of indirection and their full structure doesn't need to be eagerly built out, TypeScript has no problem working with this structure.

But workaround of introducing the interface wasn't intuitive for users.
And in principle there really wasn't anything wrong with the original version of `ValueOrArray` that used `Array` directly.
If the compiler was a little bit "lazier" and only calculated the type arguments to `Array` when necessary, then TypeScript could express these correctly.

That's exactly what TypeScript 3.7 introduces.
At the "top level" of a type alias, TypeScript will defer resolving type arguments to permit these patterns.

This means that code like the following that was trying to represent JSON...

```ts
type Json = string | number | boolean | null | JsonObject | JsonArray;

interface JsonObject {
  [property: string]: Json;
}

interface JsonArray extends Array<Json> {}
```

can finally be rewritten without helper interfaces.

```ts
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];
```

This new relaxation also lets us recursively reference type aliases in tuples as well.
The following code which used to error is now valid TypeScript code.

```ts
type VirtualNode = string | [string, { [key: <example-value>]: any }, ...VirtualNode[]];

const myNode: VirtualNode = [
  "div",
  { id: "parent" },
  ["div", { id: "first-child" }, "I'm the first child"],
  ["div", { id: "second-child" }, "I'm the second child"],
];
```

For more information, you can read up on the original pull request.
