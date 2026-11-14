---
title: "TypeScript 4.7 (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.7.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.7 (part 2 of 3)

## Improved Function Inference in Objects and Methods

TypeScript 4.7 can now perform more granular inferences from functions within objects and arrays.
This allows the types of these functions to consistently flow in a left-to-right manner just like for plain arguments.

```ts
declare function f<T>(arg: {
    produce: (n: string) => T,
    consume: (x: T) => void }
): void;

// Works
f({
    produce: () => "hello",
    consume: x => x.toLowerCase()
});

// Works
f({
    produce: (n: string) => n,
    consume: x => x.toLowerCase(),
});

// Was an error, now works.
f({
    produce: n => n,
    consume: x => x.toLowerCase(),
});

// Was an error, now works.
f({
    produce: function () { return "hello"; },
    consume: x => x.toLowerCase(),
});

// Was an error, now works.
f({
    produce() { return "hello" },
    consume: x => x.toLowerCase(),
});
```

Inference failed in some of these examples because knowing the type of their `produce` functions would indirectly request the type of `arg` before finding a good type for `T`.
TypeScript now gathers functions that could contribute to the inferred type of `T` and infers from them lazily.

For more information, you can take a look at the specific modifications to our inference process.

## Instantiation Expressions

Occasionally functions can be a bit more general than we want.
For example, let's say we had a `makeBox` function.

```ts
interface Box<T> {
    value: T;
}

function makeBox<T>(value: T) {
    return { value };
}
```

Maybe we want to create a more specialized set of functions for making `Box`es of `Wrench`es and `Hammer`s.
To do that today, we'd have to wrap `makeBox` in other functions, or use an explicit type for an alias of `makeBox`.

```ts
function makeHammerBox(hammer: Hammer) {
    return makeBox(hammer);
}

// or...

const makeWrenchBox: (wrench: Wrench) => Box<Wrench> = makeBox;
```

These work, but wrapping a call to `makeBox` is a bit wasteful, and writing the full signature of `makeWrenchBox` could get unwieldy.
Ideally, we would be able to say that we just want to alias `makeBox` while replacing all of the generics in its signature.

TypeScript 4.7 allows exactly that!
We can now take functions and constructors and feed them type arguments directly.

```ts
const makeHammerBox = makeBox<Hammer>;
const makeWrenchBox = makeBox<Wrench>;
```

So with this, we can specialize `makeBox` to accept more specific types and reject anything else.

```ts
const makeStringBox = makeBox<string>;

// TypeScript correctly rejects this.
makeStringBox(42);
```

This logic also works for constructor functions such as `Array`, `Map`, and `Set`.

```ts
// Has type `new () => Map<string, Error>`
const ErrorMap = Map<string, Error>;

// Has type `// Map<string, Error>`
const errorMap = new ErrorMap();
```

When a function or constructor is given type arguments, it will produce a new type that keeps all signatures with compatible type parameter lists, and replaces the corresponding type parameters with the given type arguments.
Any other signatures are dropped, as TypeScript will assume that they aren't meant to be used.

For more information on this feature, check out the pull request.

## `extends` Constraints on `infer` Type Variables

Conditional types are a bit of a power-user feature.
They allow us to match and infer against the shape of types, and make decisions based on them.
For example, we can write a conditional type that returns the first element of a tuple type if it's a `string`-like type.

```ts
type FirstIfString<T> =
    T extends [infer S, ...unknown[]]
        ? S extends string ? S : never
        : never;

 // string
type A = FirstIfString<[string, number, number]>;

// "hello"
type B = FirstIfString<["hello", number, number]>;

// "hello" | "world"
type C = FirstIfString<["hello" | "world", boolean]>;

// never
type D = FirstIfString<[boolean, number, string]>;
```

`FirstIfString` matches against any tuple with at least one element and grabs the type of the first element as `S`.
Then it checks if `S` is compatible with `string` and returns that type if it is.

Note that we had to use two conditional types to write this.
We could have written `FirstIfString` as follows:

```ts
type FirstIfString<T> =
    T extends [string, ...unknown[]]
        // Grab the first type out of `T`
        ? T[0]
        : never;
```

This works, but it's slightly more "manual" and less declarative.
Instead of just pattern-matching on the type and giving the first element a name, we have to fetch out the `0`th element of `T` with `T[0]`.
If we were dealing with types more complex than tuples, this could get a lot trickier, so `infer` can simplify things.

Using nested conditionals to infer a type and then match against that inferred type is pretty common.
To avoid that second level of nesting, TypeScript 4.7 now allows you to place a constraint on any `infer` type.

```ts
type FirstIfString<T> =
    T extends [infer S extends string, ...unknown[]]
        ? S
        : never;
```

This way, when TypeScript matches against `S`, it also ensures that `S` has to be a `string`.
If `S` isn't a `string`, it takes the false path, which in these cases is `never`.

For more details, you can read up on the change on GitHub.

## Optional Variance Annotations for Type Parameters

Let's take the following types.

```ts
interface Animal {
    animalStuff: any;
}

interface Dog extends Animal {
    dogStuff: any;
}

// ...

type Getter<T> = () => T;

type Setter<T> = (value: T) => void;
```

Imagine we had two different instances of `Getter`s.
Figuring out whether any two different `Getter`s are substitutable for one another depends entirely on `T`.
In the case of whether an assignment of `Getter<Dog>` &rarr; `Getter<Animal>` is valid, we have to check whether `Dog` &rarr; `Animal` is valid.
Because each type for `T` just gets related in the same "direction", we say that the `Getter` type is *covariant* on `T`.
On the other hand, checking whether `Setter<Dog>` &rarr; `Setter<Animal>` is valid involves checking whether `Animal` &rarr; `Dog` is valid.
That "flip" in direction is kind of like how in math, checking whether &minus;*x* < *&minus;y* is the same as checking whether *y* < *x*.
When we have to flip directions like this to compare `T`, we say that `Setter` is *contravariant* on `T`.

With TypeScript 4.7, we're now able to *explicitly* specify variance on type parameters.

So now, if we want to make it explicit that `Getter` is covariant on `T`, we can now give it an `out` modifier.

```ts
type Getter<out T> = () => T;
```

And similarly, if we also want to make it explicit that `Setter` is contravariant on `T`, we can give it an `in` modifier.

```ts
type Setter<in T> = (value: T) => void;
```

`out` and `in` are used here because a type parameter's variance depends on whether it's used in an *output* or an *input*.
Instead of thinking about variance, you can just think about if `T` is used in output and input positions.

There are also cases for using both `in` and `out`.

```ts
interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
}
```

When a `T` is used in both an output and input position, it becomes *invariant*.
Two different `State<T>`s can't be interchanged unless their `T`s are the same.
In other words, `State<Dog>` and `State<Animal>` aren't substitutable for the other.

Now technically speaking, in a purely structural type system, type parameters and their variance don't really matter - you can just plug in types in place of each type parameter and check whether each matching member is structurally compatible.
So if TypeScript uses a structural type system, why are we interested in the variance of type parameters?
And why might we ever want to annotate them?

One reason is that it can be useful for a reader to explicitly see how a type parameter is used at a glance.
For much more complex types, it can be difficult to tell whether a type is meant to be read, written, or both.
TypeScript will also help us out if we forget to mention how that type parameter is used.
As an example, if we forgot to specify both `in` and `out` on `State`, we'd get an error.

```ts
interface State<out T> {
    //          ~~~~~
    // error!
    // Type 'State<sub-T>' is not assignable to type 'State<super-T>' as implied by variance annotation.
    //   Types of property 'set' are incompatible.
    //     Type '(value: sub-T) => void' is not assignable to type '(value: super-T) => void'.
    //       Types of parameters 'value' and 'value' are incompatible.
    //         Type 'super-T' is not assignable to type 'sub-T'.
    get: () => T;
    set: (value: T) => void;
}
```

Another reason is precision and speed!
TypeScript already tries to infer the variance of type parameters as an optimization.
By doing this, it can type-check larger structural types in a reasonable amount of time.
Calculating variance ahead of time allows the type-checker to skip deeper comparisons and just compare type arguments which can be *much* faster than comparing the full structure of a type over and over again.
But often there are cases where this calculation is still fairly expensive, and the calculation may find circularities that can't be accurately resolved, meaning there's no clear answer for the variance of a type.

```ts
type Foo<T> = {
    x: T;
    f: Bar<T>;
}

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
    value: Foo<V[]>;
}

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2;  // Should be an error but isn't ❌
foo2 = foo1;  // Error - correct ✅
```

Providing an explicit annotation can speed up type-checking at these circularities and provide better accuracy.
For instance, marking `T` as invariant in the above example can help stop the problematic assignment.

```diff
- type Foo<T> = {
+ type Foo<in out T> = {
      x: T;
      f: Bar<T>;
  }
```

We don't necessarily recommend annotating every type parameter with its variance;
For example, it's possible (but not recommended) to make variance a little stricter than is necessary, so TypeScript won't stop you from marking something as invariant if it's really just covariant, contravariant, or even independent.
So if you do choose to add explicit variance markers, we would encourage thoughtful and precise use of them.

But if you're working with deeply recursive types, especially if you're a library author, you may be interested in using these annotations to the benefit of your users.
Those annotations can provide wins in both accuracy and type-checking speed, which can even affect their code editing experience.
Determining when variance calculation is a bottleneck on type-checking time can be done experimentally, and determined using tooling like our analyze-trace utility.

For more details on this feature, you can read up on the pull request.

## Resolution Customization with `moduleSuffixes`

TypeScript 4.7 now supports a `moduleSuffixes` option to customize how module specifiers are looked up.

```jsonc
{
    "compilerOptions": {
        "moduleSuffixes": [".ios", ".native", ""]
    }
}
```

Given the above configuration, an import like the following...

```ts
import * as foo from "./foo";
```

will try to look at the relative files `./foo.ios.ts`, `./foo.native.ts`, and finally `./foo.ts`.

Note that the empty string `""` in `moduleSuffixes` is necessary for TypeScript to also look-up `./foo.ts`.
In a sense, the default value for `moduleSuffixes` is `[""]`.

This feature can be useful for React Native projects where each target platform can use a separate `tsconfig.json` with differing `moduleSuffixes`.

The `moduleSuffixes` option was contributed thanks to Adam Foxman!

## resolution-mode

With Node's ECMAScript resolution, the mode of the containing file and the syntax you use determines how imports are resolved;
however it would be useful to reference the types of a CommonJS module from an ECMAScript module, or vice-versa.

TypeScript now allows `/// <reference types="..." />` directives.

```ts
/// <reference types="pkg" resolution-mode="require" />

// or

/// <reference types="pkg" resolution-mode="import" />
```

Additionally, in nightly versions of TypeScript, `import type` can specify an import assertion to achieve something similar.

```ts
// Resolve `pkg` as if we were importing with a `require()`
import type { TypeFromRequire } from "pkg" assert {
    "resolution-mode": "require"
};

// Resolve `pkg` as if we were importing with an `import`
import type { TypeFromImport } from "pkg" assert {
    "resolution-mode": "import"
};

export interface MergedType extends TypeFromRequire, TypeFromImport {}
```

These import assertions can also be used on `import()` types.

```ts
export type TypeFromRequire =
    import("pkg", { assert: { "resolution-mode": "require" } }).TypeFromRequire;

export type TypeFromImport =
    import("pkg", { assert: { "resolution-mode": "import" } }).TypeFromImport;

export interface MergedType extends TypeFromRequire, TypeFromImport {}
```

The `import type` and `import()` syntaxes only support `resolution-mode` in nightly builds of TypeScript.
You'll likely get an error like

```
Resolution mode assertions are unstable. Use nightly TypeScript to silence this error. Try updating with 'npm install -D typescript@next'.
```

If you do find yourself using this feature in nightly versions of TypeScript, consider providing feedback on this issue.

You can see the respective changes for reference directives and for type import assertions.

## Go to Source Definition

TypeScript 4.7 contains support for a new experimental editor command called *Go To Source Definition*.
It's similar to *Go To Definition*, but it never returns results inside declaration files.
Instead, it tries to find corresponding *implementation* files (like `.js` or `.ts` files), and find definitions there — even if those files are normally shadowed by `.d.ts` files.

This comes in handy most often when you need to peek at the implementation of a function you're importing from a library instead of its type declaration in a `.d.ts` file.

You can try this new command in the latest versions of Visual Studio Code.
Note, though, that this functionality is still in preview, and there are some known limitations.
In some cases TypeScript uses heuristics to guess which `.js` file corresponds to the given result of a definition, so these results might be inaccurate.
Visual Studio Code also doesn't yet indicate whether a result was a guess, but it's something we're collaborating on.

You can leave feedback about the feature, read about known limitations, or learn more at our dedicated feedback issue.
