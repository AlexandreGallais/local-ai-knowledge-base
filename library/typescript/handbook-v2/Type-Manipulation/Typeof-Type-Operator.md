---
title: "Typeof Type Operator"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/handbook-v2/Type Manipulation/Typeof Type Operator.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Typeof Type Operator

## The `typeof` type operator

JavaScript already has a `typeof` operator you can use in an _expression_ context:

```ts
// Prints "string"
console.log(typeof "Hello world");
```

TypeScript adds a `typeof` operator you can use in a _type_ context to refer to the _type_ of a variable or property:

```ts
let s = "hello";
let n: typeof s;
```

This isn't very useful for basic types, but combined with other type operators, you can use `typeof` to conveniently express many patterns.
For an example, let's start by looking at the predefined type `ReturnType<T>`.
It takes a _function type_ and produces its return type:

```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
```

If we try to use `ReturnType` on a function name, we see an instructive error:

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
```

Remember that _values_ and _types_ aren't the same thing.
To refer to the _type_ that the _value `f`_ has, we use `typeof`:

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

### Limitations

TypeScript intentionally limits the sorts of expressions you can use `typeof` on.

Specifically, it's only legal to use `typeof` on identifiers (i.e. variable names) or their properties.
This helps avoid the confusing trap of writing code you think is executing, but isn't:

```ts
declare const msgbox: (prompt: string) => boolean;
// type msgbox = any;
// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
```
