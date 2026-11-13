---
title: "Generics (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/handbook-v2/Type Manipulation/Generics.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Generics (part 2 of 2)

## Generic Parameter Defaults

By declaring a default for a generic type parameter, you make it optional to specify the corresponding type argument. For example, a function which creates a new `HTMLElement`. Calling the function with no arguments generates a `HTMLDivElement`; calling the function with an element as the first argument generates an element of the argument's type. You can optionally pass a list of children as well. Previously you would have to define the function as:

```ts
type Container<T, U> = {
  element: T;
  children: U;
};

declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>;
```

With generic parameter defaults we can reduce it to:

```ts
type Container<T, U> = {
  element: T;
  children: U;
};

declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;

const div = create();

const p = create(new HTMLParagraphElement());
```

A generic parameter default follows the following rules:

- A type parameter is deemed optional if it has a default.
- Required type parameters must not follow optional type parameters.
- Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
- When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
- If a default type is specified and inference cannot choose a candidate, the default type is inferred.
- A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
- A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.

## Variance Annotations

> This is an advanced feature for solving a very specific problem, and should only be used in situations where you've identified a reason to use it

Covariance and contravariance are type theory terms that describe what the relationship between two generic types is.
Here's a brief primer on the concept.

For example, if you have an interface representing an object that can `make` a certain type:
```ts
interface Producer<T> {
  make(): T;
}
```
We can use a `Producer<Cat>` where a `Producer<Animal>` is expected, because a `Cat` is an `Animal`.
This relationship is called *covariance*: the relationship from `Producer<T>` to `Producer` is the same as the relationship from `T` to `U`.

Conversely, if you have an interface that can `consume` a certain type:
```ts
interface Consumer<T> {
  consume: (arg: T) => void;
}
```
Then we can use a `Consumer<Animal>` where a `Consumer<Cat>` is expected, because any function that is capable of accepting an `Animal` must also be capable of accepting a `Cat`.
This relationship is called *contravariance*: the relationship from `Consumer<T>` to `Consumer` is the same as the relationship from `U` to `T`.
Note the reversal of direction as compared to covariance! This is why contravariance "cancels itself out" but covariance doesn't.

In a structural type system like TypeScript's, covariance and contravariance are naturally emergent behaviors that follow from the definition of types.
Even in the absence of generics, we would see covariant (and contravariant) relationships:
```ts
interface AnimalProducer {
  make(): Animal;
}

// A CatProducer can be used anywhere an
// Animal producer is expected
interface CatProducer {
  make(): Cat;
}
```

TypeScript has a structural type system, so when comparing two types, e.g. to see if a `Producer<Cat>` can be used where a `Producer<Animal>` is expected, the usual algorithm would be structurally expand both of those definitions, and compare their structures.
However, variance allows for an extremely useful optimization: if `Producer<T>` is covariant on `T`, then we can simply check `Cat` and `Animal` instead, as we know they'll have the same relationship as `Producer<Cat>` and `Producer<Animal>`.

Note that this logic can only be used when we're examining two instantiations of the same type.
If we have a `Producer<T>` and a `FastProducer`, there's no guarantee that `T` and `U` necessarily refer to the same positions in these types, so this check will always be performed structurally.

Because variance is a naturally emergent property of structural types, TypeScript automatically *infers* the variance of every generic type.
**In extremely rare cases** involving certain kinds of circular types, this measurement can be inaccurate.
If this happens, you can add a variance annotation to a type parameter to force a particular variance:
```ts
// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}

// Covariant annotation
interface Producer<out T> {
  make(): T;
}

// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}
```
Only do this if you are writing the same variance that *should* occur structurally.

> Never write a variance annotation that doesn't match the structural variance!

It's critical to reinforce that variance annotations are only in effect during an instantiation-based comparison.
They have no effect during a structural comparison.
For example, you can't use variance annotations to "force" a type to be actually invariant:
```ts
// DON'T DO THIS - variance annotation
// does not match structural behavior
interface Producer<in out T> {
  make(): T;
}

// Not a type error -- this is a structural
// comparison, so variance annotations are
// not in effect
const p: Producer<string | number> = {
    make(): number {
        return 42;
    }
}
```
Here, the object literal's `make` function returns `number`, which we might expect to cause an error because `number` isn't `string | number`.
However, this isn't an instantiation-based comparison, because the object literal is an anonymous type, not a `Producer<string | number>`.

> Variance annotations don't change structural behavior and are only consulted in specific situations

It's very important to only write variance annotations if you absolutely know why you're doing it, what their limitations are, and when they aren't in effect.
Whether TypeScript uses an instantiation-based comparison or structural comparison is not a specified behavior and may change from version to version for correctness or performance reasons, so you should only ever write variance annotations when they match the structural behavior of a type.
Don't use variance annotations to try to "force" a particular variance; this will cause unpredictable behavior in your code.

> Do NOT write variance annotations unless they match the structural behavior of a type

Remember, TypeScript can automatically infer variance from your generic types.
It's almost never necessary to write a variance annotation, and you should only do so when you've identified a specific need.
Variance annotations *do not* change the structural behavior of a type, and depending on the situation, you might see a structural comparison made when you expected an instantiation-based comparison.
Variance annotations can't be used to modify how types behave in these structural contexts, and shouldn't be written unless the annotation is the same as the structural definition.
Because this is difficult to get right, and TypeScript can correctly infer variance in the vast majority of cases, you should not find yourself writing variance annotations in normal code.

> Don't try to use variance annotations to change typechecking behavior; this is not what they are for

You *may* find temporary variance annotations useful in a "type debugging" situation, because variance annotations are checked.
TypeScript will issue an error if the annotated variance is identifiably wrong:
```ts
// Error, this interface is definitely contravariant on T
interface Foo<out T> {
  consume: (arg: T) => void;
}
```
However, variance annotations are allowed to be stricter (e.g. `in out` is valid if the actual variance is covariant).
Be sure to remove your variance annotations once you're done debugging.

Lastly, if you're trying to maximize your typechecking performance, *and* have run a profiler, *and* have identified a specific type that's slow, *and* have identified variance inference specifically is slow, *and* have carefully validated the variance annotation you want to write, you *may* see a small performance benefit in extraordinarily complex types by adding variance annotations.

> Don't try to use variance annotations to change typechecking behavior; this is not what they are for
