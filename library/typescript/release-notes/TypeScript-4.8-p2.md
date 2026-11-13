---
title: "TypeScript 4.8 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.8.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.8 (part 2 of 2)

## Correctness Fixes and Breaking Changes

Due to the nature of type system changes, there are very few changes that can be made that don't affect *some* code;
however, there are a few changes that are more likely to require adapting existing code.

### `lib.d.ts` Updates

While TypeScript strives to avoid major breaks, even small changes in the built-in libraries can cause issues.
We don't expect major breaks as a result of DOM and `lib.d.ts` updates, but one notable change is that the `cause` property on `Error`s now has the type `unknown` instead of `Error`.

### Unconstrained Generics No Longer Assignable to `{}`

In TypeScript 4.8, for projects with `strictNullChecks` enabled, TypeScript will now correctly issue an error when an unconstrained type parameter is used in a position where `null` or `undefined` are not legal values.
That will include any type that expects `{}`, `object`, or an object type with all-optional properties.

A simple example can be seen in the following.

```ts
// Accepts any non-null non-undefined value
function bar(value: {}) {
  Object.keys(value); // This call throws on null/undefined at runtime.
}

// Unconstrained type parameter T...
function foo<T>(x: T) {
    bar(x); // Used to be allowed, now is an error in 4.8.
    //  ~
    // error: Argument of type 'T' is not assignable to parameter of type '{}'.
}

foo(undefined);
```

As demonstrated above, code like this has a potential bug - the values `null` and `undefined` can be indirectly passed through these unconstrained type parameters to code that is not supposed to observe those values.

This behavior will also be visible in type positions. One example would be:
```ts
interface Foo<T> {
  x: Bar<T>;
}

interface Bar<T extends {}> { }
```

Existing code that didn't want to handle `null` and `undefined` can be fixed by propagating the appropriate constraints through.

```diff
- function foo<T>(x: T) {
+ function foo<T extends {}>(x: T) {
```

Another work-around would be to check for `null` and `undefined` at runtime.

```diff
  function foo<T>(x: T) {
+     if (x !== null && x !== undefined) {
          bar(x);
+     }
  }
```

And if you know that for some reason, your generic value can't be `null` or `undefined`, you can just use a non-null assertion.

```diff
  function foo<T>(x: T) {
-     bar(x);
+     bar(x!);
  }
```

When it comes to types, you'll often either need to propagate constraints, or intersect your types with `{}`.

For more information, you can see the change that introduced this along with the specific discussion issue regarding how unconstrained generics now work.

### Decorators are placed on `modifiers` on TypeScript's Syntax Trees

The current direction of decorators in TC39 means that TypeScript will have to handle a break in terms of placement of decorators.
Previously, TypeScript assumed decorators would always be placed prior to all keywords/modifiers.
For example

```ts
@decorator
export class Foo {
  // ...
}
```

Decorators as currently proposed do not support this syntax.
Instead, the `export` keyword must precede the decorator.

```ts
export @decorator class Foo {
  // ...
}
```

Unfortunately, TypeScript's trees are *concrete* rather than *abstract*, and our architecture expects syntax tree node fields to be entirely ordered before or after each other.
To support both legacy decorators and decorators as proposed, TypeScript will have to gracefully parse, and intersperse, modifiers and decorators.

To do this, it exposes a new type alias called `ModifierLike` which is a `Modifier` or a `Decorator`.

```ts
export type ModifierLike = Modifier | Decorator;
```

Decorators are now placed in the same field as `modifiers` which is now a `NodeArray<ModifierLike>` when set, and the entire field is deprecated.

```diff
- readonly modifiers?: NodeArray<Modifier> | undefined;
+ /**
+  * @deprecated ...
+  * Use `ts.canHaveModifiers()` to test whether a `Node` can have modifiers.
+  * Use `ts.getModifiers()` to get the modifiers of a `Node`.
+  * ...
+  */
+ readonly modifiers?: NodeArray<ModifierLike> | undefined;
```

All existing `decorators` properties have been marked as deprecated and will always be `undefined` if read.
The type has also been changed to `undefined` so that existing tools know to handle them correctly.

```diff
- readonly decorators?: NodeArray<Decorator> | undefined;
+ /**
+  * @deprecated ...
+  * Use `ts.canHaveDecorators()` to test whether a `Node` can have decorators.
+  * Use `ts.getDecorators()` to get the decorators of a `Node`.
+  * ...
+  */
+ readonly decorators?: undefined;
```

To avoid new deprecation warnings and other issues, TypeScript now exposes four new functions to use in place of the `decorators` and `modifiers` properties.
There are individual predicates for testing whether a node has support modifiers and decorators, along with respective accessor functions for grabbing them.

```ts
function canHaveModifiers(node: Node): node is HasModifiers;
function getModifiers(node: HasModifiers): readonly Modifier[] | undefined;

function canHaveDecorators(node: Node): node is HasDecorators;
function getDecorators(node: HasDecorators): readonly Decorator[] | undefined;
```

As an example of how to access modifiers off of a node, you can write

```ts
const modifiers = canHaveModifiers(myNode) ? getModifiers(myNode) : undefined;
```

With the note that each call to `getModifiers` and `getDecorators` may allocate a new array.

For more information, see changes around

* the restructuring of our tree nodes
* the deprecations
* exposing the predicate functions

### Types Cannot Be Imported/Exported in JavaScript Files

TypeScript previously allowed JavaScript files to import and export entities declared with a type, but no value, in `import` and `export` statements.
This behavior was incorrect, because named imports and exports for values that don't exist will cause a runtime error under ECMAScript modules.
When a JavaScript file is type-checked under `--checkJs` or through a `// @ts-check` comment, TypeScript will now issue an error.

```ts

// Will fail at runtime because 'SomeType' is not a value.
import { someValue, SomeType } from "some-module";

/**
 * @type {SomeType}
 */
export const myValue = someValue;

/**
 * @typedef {string | number} MyType
 */

// Will fail at runtime because 'MyType' is not a value.
export { MyType as MyExportedType };
```

To reference a type from another module, you can instead directly qualify the import.

```diff
- import { someValue, SomeType } from "some-module";
+ import { someValue } from "some-module";
  
  /**
-  * @type {SomeType}
+  * @type {import("some-module").SomeType}
   */
  export const myValue = someValue;
```

To export a type, you can just use a `/** @typedef */` comment in JSDoc.
`@typedef` comments already automatically export types from their containing modules.

```diff
  /**
   * @typedef {string | number} MyType
   */

+ /**
+  * @typedef {MyType} MyExportedType
+  */
- export { MyType as MyExportedType };
```

You can read more about the change here.

### Binding Patterns Do Not Directly Contribute to Inference Candidates

As mentioned above, binding patterns no longer change the type of inference results in function calls.
You can read more about the original change here.

### Unused Renames in Binding Patterns are Now Errors in Type Signatures

TypeScript's type annotation syntax often looks like it can be used when destructuring values.
For example, take the following function.

```ts
declare function makePerson({ name: string, age: number }): Person;
```

You might read this signature and think that `makePerson` obviously takes an object with a `name` property with the type `string` and an `age` property with the type `number`;
however, JavaScript's destructuring syntax is actually taking precedence here.
`makePerson` does say that it's going to take an object with a `name` and an `age` property, but instead of specifying a type for them, it's just saying that it renames `name` and `age` to `string` and `number` respectively.

In a pure type construct, writing code like this is useless, and typically a mistake since developers usually assume they're writing a type annotation.

TypeScript 4.8 makes these an error unless they're referenced later in the signature.
The correct way to write the above signature would be as follows:

```ts
declare function makePerson(options: { name: string, age: number }): Person;

// or

declare function makePerson({ name, age }: { name: string, age: number }): Person;
```

This change can catch bugs in declarations, and has been helpful for improving existing code.
We'd like to extend our thanks to GitHub user uhyo for providing this check.
You can read up on the change here.
