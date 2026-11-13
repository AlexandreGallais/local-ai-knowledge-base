---
title: "Advanced Types (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/reference/Advanced Types.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Advanced Types (part 3 of 3)

## Distributive conditional types

Conditional types in which the checked type is a naked type parameter are called _distributive conditional types_.
Distributive conditional types are automatically distributed over union types during instantiation.
For example, an instantiation of `T extends U ? X : Y` with the type argument `A | B | C` for `T` is resolved as `(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`.

#### Example

```ts
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";
type T5 = TypeName<string | (() => void)>;
type T6 = TypeName<string | string[] | undefined>;
type T7 = TypeName<string[] | number[]>;
```

In instantiations of a distributive conditional type `T extends U ? X : Y`, references to `T` within the conditional type are resolved to individual constituents of the union type (i.e. `T` refers to the individual constituents _after_ the conditional type is distributed over the union type).
Furthermore, references to `T` within `X` have an additional type parameter constraint `U` (i.e. `T` is considered assignable to `U` within `X`).

#### Example

```ts
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

type T1 = Boxed<string>;
type T2 = Boxed<number[]>;
type T3 = Boxed<string | number[]>;
```

Notice that `T` has the additional constraint `any[]` within the true branch of `Boxed<T>` and it is therefore possible to refer to the element type of the array as `T[number]`. Also, notice how the conditional type is distributed over the union type in the last example.

The distributive property of conditional types can conveniently be used to _filter_ union types:

```ts
// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;
// Remove types from T that are not assignable to U
type Filter<T, U> = T extends U ? T : never;

type T1 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;
type T2 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"
type T3 = Diff<string | number | (() => void), Function>; // string | number
type T4 = Filter<string | number | (() => void), Function>; // () => void

// Remove null and undefined from T
type NotNullable<T> = Diff<T, null | undefined>;

type T5 = NotNullable<string | number | undefined>;
type T6 = NotNullable<string | string[] | null | undefined>;

function f1<T>(x: T, y: NotNullable<T>) {
  x = y;
  y = x;
}

function f2<T extends string | undefined>(x: T, y: NotNullable<T>) {
  x = y;
  y = x;
  let s1: string = x;
  let s2: string = y;
}
```

Conditional types are particularly useful when combined with mapped types:

```ts
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T1 = FunctionPropertyNames<Part>;
type T2 = NonFunctionPropertyNames<Part>;
type T3 = FunctionProperties<Part>;
type T4 = NonFunctionProperties<Part>;
```

Note, conditional types are not permitted to reference themselves recursively. For example the following is an error.

#### Example

```ts
type ElementType<T> = T extends any[] ? ElementType<T[number]> : T; // Error
```

## Type inference in conditional types

Within the `extends` clause of a conditional type, it is now possible to have `infer` declarations that introduce a type variable to be inferred.
Such inferred type variables may be referenced in the true branch of the conditional type.
It is possible to have multiple `infer` locations for the same type variable.

For example, the following extracts the return type of a function type:

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

Conditional types can be nested to form a sequence of pattern matches that are evaluated in order:

```ts
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T0 = Unpacked<string>;
type T1 = Unpacked<string[]>;
type T2 = Unpacked<() => string>;
type T3 = Unpacked<Promise<string>>;
type T4 = Unpacked<Promise<string>[]>;
type T5 = Unpacked<Unpacked<Promise<string>[]>>;
```

The following example demonstrates how multiple candidates for the same type variable in co-variant positions causes a union type to be inferred:

```ts
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type T1 = Foo<{ a: string; b: string }>;
type T2 = Foo<{ a: string; b: number }>;
```

Likewise, multiple candidates for the same type variable in contra-variant positions causes an intersection type to be inferred:

```ts
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;

type T1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;
type T2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;
```

When inferring from a type with multiple call signatures (such as the type of an overloaded function), inferences are made from the _last_ signature (which, presumably, is the most permissive catch-all case).
It is not possible to perform overload resolution based on a list of argument types.

```ts
declare function foo(x: string): number;
declare function foo(x: number): string;
declare function foo(x: string | number): string | number;

type T1 = ReturnType<typeof foo>;
```

It is not possible to use `infer` declarations in constraint clauses for regular type parameters:

```ts
type ReturnedType<T extends (...args: any[]) => infer R> = R;
```

However, much the same effect can be obtained by erasing the type variables in the constraint and instead specifying a conditional type:

```ts
type AnyFunction = (...args: any[]) => any;
type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R
  ? R
  : any;
```

## Predefined conditional types

TypeScript adds several predefined conditional types, you can find the full list and examples in Utility Types.
