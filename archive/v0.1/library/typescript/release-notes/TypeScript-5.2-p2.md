---
title: "TypeScript 5.2 (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.2.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.2 (part 2 of 3)

## Decorator Metadata

TypeScript 5.2 implements an upcoming ECMAScript feature called decorator metadata.

The key idea of this feature is to make it easy for decorators to create and consume metadata on any class they're used on or within.

Whenever decorator functions are used, they now have access to a new `metadata` property on their context object.
The `metadata` property just holds a simple object.
Since JavaScript lets us add properties arbitrarily, it can be used as a dictionary that is updated by each decorator.
Alternatively, since every `metadata` object will be identical for each decorated portion of a class, it can be used as a key into a `Map`.
After all decorators on or in a class get run, that object can be accessed on the class via `Symbol.metadata`.

```ts
interface Context {
    name: string;
    metadata: Record<PropertyKey, unknown>;
}

function setMetadata(_target: any, context: Context) {
    context.metadata[context.name] = true;
}

class SomeClass {
    @setMetadata
    foo = 123;

    @setMetadata
    accessor bar = "hello!";

    @setMetadata
    baz() { }
}

const ourMetadata = SomeClass[Symbol.metadata];

console.log(JSON.stringify(ourMetadata));
// { "bar": true, "baz": true, "foo": true }
```

This can be useful in a number of different scenarios.
Metadata could possibly be attached for lots of uses like debugging, serialization, or performing dependency injection with decorators.
Since metadata objects are created per decorated class, frameworks can either privately use them as keys into a `Map` or `WeakMap`, or tack properties on as necessary.

For example, let's say we wanted to use decorators to keep track of which properties and accessors are serializable when using `JSON.stringify` like so:

```ts
import { serialize, jsonify } from "./serializer";

class Person {
    firstName: string;
    lastName: string;

    @serialize
    age: number

    @serialize
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    toJSON() {
        return jsonify(this)
    }

    constructor(firstName: string, lastName: string, age: number) {
        // ...
    }
}
```

Here, the intent is that only `age` and `fullName` should be serialized because they are marked with the `@serialize` decorator.
We define a `toJSON` method for this purpose, but it just calls out to `jsonify` which uses the metadata that `@serialize` created.

Here's an example of how the module `./serialize.ts` might be defined:

```ts
const serializables = Symbol();

type Context =
    | ClassAccessorDecoratorContext
    | ClassGetterDecoratorContext
    | ClassFieldDecoratorContext
    ;

export function serialize(_target: any, context: Context): void {
    if (context.static || context.private) {
        throw new Error("Can only serialize public instance members.")
    }
    if (typeof context.name === "symbol") {
        throw new Error("Cannot serialize symbol-named properties.");
    }

    const propNames =
        (context.metadata[serializables] as string[] | undefined) ??= [];
    propNames.push(context.name);
}

export function jsonify(instance: object): string {
    const metadata = instance.constructor[Symbol.metadata];
    const propNames = metadata?.[serializables] as string[] | undefined;
    if (!propNames) {
        throw new Error("No members marked with @serialize.");
    }

    const pairStrings = propNames.map(key => {
        const strKey = JSON.stringify(key);
        const strValue = JSON.stringify((instance as any)[key]);
        return `${strKey}: ${strValue}`;
    });

    return `{ ${pairStrings.join(", ")} }`;
}
```

This module has a local `symbol` called `serializables` to store and retrieve the names of properties marked `@serializable`.
It stores a list of these property names on the metadata on each invocation of `@serializable`.
When `jsonify` is called, the list of properties is fetched off of the metadata and used to retrieve the actual values from the instance, eventually serializing those names and values.

Using a `symbol` technically makes this data accessible to others.
An alternative might be to use a `WeakMap` using the metadata object as a key.
This keeps data private and happens to use fewer type assertions in this case, but is otherwise similar.

```ts
const serializables = new WeakMap<object, string[]>();

type Context =
    | ClassAccessorDecoratorContext
    | ClassGetterDecoratorContext
    | ClassFieldDecoratorContext
    ;

export function serialize(_target: any, context: Context): void {
    if (context.static || context.private) {
        throw new Error("Can only serialize public instance members.")
    }
    if (typeof context.name !== "string") {
        throw new Error("Can only serialize string properties.");
    }

    let propNames = serializables.get(context.metadata);
    if (propNames === undefined) {
        serializables.set(context.metadata, propNames = []);
    }
    propNames.push(context.name);
}

export function jsonify(instance: object): string {
    const metadata = instance.constructor[Symbol.metadata];
    const propNames = metadata && serializables.get(metadata);
    if (!propNames) {
        throw new Error("No members marked with @serialize.");
    }
    const pairStrings = propNames.map(key => {
        const strKey = JSON.stringify(key);
        const strValue = JSON.stringify((instance as any)[key]);
        return `${strKey}: ${strValue}`;
    });

    return `{ ${pairStrings.join(", ")} }`;
}
```

As a note, these implementations don't handle subclassing and inheritance.
That's left as an exercise to you (and you might find that it is easier in one version of the file than the other!).

Because this feature is still fresh, most runtimes will not support it natively.
To use it, you will need a polyfill for `Symbol.metadata`.
Something as simple as the following should work for most cases:

```ts
Symbol.metadata ??= Symbol("Symbol.metadata");
```

You will also need to set your compilation `target` to `es2022` or below, and configure your `lib` setting to either include `"esnext"` or `"esnext.decorators"`.

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.decorators", "dom"]
    }
}
```

We'd like to thank Oleksandr Tarasiuk for contributing the implementation of decorator metadata for TypeScript 5.2!

## Named and Anonymous Tuple Elements

Tuple types have supported optional labels or names for each element.

```ts
type Pair<T> = [first: T, second: T];
```

These labels don't change what you're allowed to do with them — they're solely to help with readability and tooling.

However, TypeScript previously had a rule that tuples could not mix and match between labeled and unlabeled elements.
In other words, either no element could have a label in a tuple, or all elements needed one.

```ts
// ✅ fine - no labels
type Pair1<T> = [T, T];

// ✅ fine - all fully labeled
type Pair2<T> = [first: T, second: T];

// ❌ previously an error
type Pair3<T> = [first: T, T];
//                         ~
// Tuple members must all have names
// or all not have names.
```

This could be annoying for rest elements where we'd be forced to just add a label like `rest` or `tail`.

```ts
// ❌ previously an error
type TwoOrMore_A<T> = [first: T, second: T, ...T[]];
//                                          ~~~~~~
// Tuple members must all have names
// or all not have names.

// ✅
type TwoOrMore_B<T> = [first: T, second: T, rest: ...T[]];
```

It also meant that this restriction had to be enforced internally in the type system, meaning TypeScript would lose labels.

```ts
type HasLabels = [a: string, b: string];
type HasNoLabels = [number, number];
type Merged = [...HasNoLabels, ...HasLabels];
//   ^ [number, number, string, string]
//
//     'a' and 'b' were lost in 'Merged'
```

In TypeScript 5.2, the all-or-nothing restriction on tuple labels has been lifted.
The language can now also preserve labels when spreading into an unlabeled tuple.

We'd like to extend our thanks to Josh Goldberg and Mateusz Burzyński who collaborated to lift this restriction.

## Easier Method Usage for Unions of Arrays

In previous versions of TypeScript, calling a method on a union of arrays could end in pain.

```ts
declare let array: string[] | number[];

array.filter(x => !!x);
//    ~~~~~~ error!
// This expression is not callable.
//   Each member of the union type '...' has signatures,
//   but none of those signatures are compatible
//   with each other.
```

In this example, TypeScript would try to see if each version of `filter` is compatible across `string[]` and `number[]`.
Without a coherent strategy, TypeScript threw its hands in the air and said "I can't make it work".

In TypeScript 5.2, before giving up in these cases, unions of arrays are treated as a special case.
A new array type is constructed out of each member's element type, and then the method is invoked on that.

Taking the above example, `string[] | number[]` is transformed into `(string | number)[]` (or `Array<string | number>`), and `filter` is invoked on that type.
There is a slight caveat which is that `filter` will produce an `Array<string | number>` instead of a `string[] | number[]`;
but for a freshly produced value there is less risk of something "going wrong".

This means lots of methods like `filter`, `find`, `some`, `every`, and `reduce` should all be invokable on unions of arrays in cases where they were not previously.

You can read up more details on the implementing pull request.

## Type-Only Import Paths with TypeScript Implementation File Extensions

TypeScript now allows both declaration *and* implementation file extensions to be included in type-only import paths, regardless of whether `allowImportingTsExtensions` is enabled.

This means that you can now write `import type` statements that use `.ts`, `.mts`, `.cts`, and `.tsx` file extensions.

```ts
import type { JustAType } from "./justTypes.ts";

export function f(param: JustAType) {
    // ...
}
```

It also means that `import()` types, which can be used in both TypeScript and JavaScript with JSDoc, can use those file extensions.

```js
/**
 * @param {import("./justTypes.ts").JustAType} param
 */
export function f(param) {
    // ...
}
```

For more information, see the change here.

## Comma Completions for Object Members

It can be easy to forget to add a comma when adding a new property to an object.
Previously, if you forgot a comma and requested auto-completion, TypeScript would confusingly give poor unrelated completion results.

TypeScript 5.2 now gracefully provides object member completions when you're missing a comma.
But to just skip past hitting you with a syntax error, it will *also* auto-insert the missing comma.

For more information, see the implementation here.

## Inline Variable Refactoring

TypeScript 5.2 now has a refactoring to inline the contents of a variable to all usage sites.

.

Using the "inline variable" refactoring will eliminate the variable and replace all the variable's usages with its initializer.
Note that this may cause that initializer's side-effects to run at a different time, and as many times as the variable has been used.

For more details, see the implementing pull request.

## Optimized Checks for Ongoing Type Compatibility

Because TypeScript is a structural type system, types occasionally need to be compared in a member-wise fashion;
however, recursive types add some issues here.
For example:

```ts
interface A {
    value: A;
    other: string;
}

interface B {
    value: B;
    other: number;
}
```

When checking whether the type `A` is compatible with the type `B`, TypeScript will end up checking whether the types of `value` in `A` and `B` are respectively compatible.
At this point, the type system needs to stop checking any further and proceed to check other members.
To do this, the type system has to track when any two types are already being related.

Previously TypeScript already kept a stack of type pairs, and iterated through that to determine whether those types are being related.
When this stack is shallow that's not a problem; but when the stack isn't shallow, that, uh, is a problem.

In TypeScript 5.3, a simple `Set` helps track this information.
This reduced the time spent on a reported test case that used the drizzle library by over 33%!

```
Benchmark 1: old
  Time (mean ± σ):      3.115 s ±  0.067 s    [User: 4.403 s, System: 0.124 s]
  Range (min … max):    3.018 s …  3.196 s    10 runs
 
Benchmark 2: new
  Time (mean ± σ):      2.072 s ±  0.050 s    [User: 3.355 s, System: 0.135 s]
  Range (min … max):    1.985 s …  2.150 s    10 runs
 
Summary
  'new' ran
    1.50 ± 0.05 times faster than 'old'
```

Read more on the change here.
