---
title: "Advanced Types (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/reference/Advanced Types.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Advanced Types (part 2 of 3)

## Index types

With index types, you can get the compiler to check code that uses dynamic property names.
For example, a common JavaScript pattern is to pick a subset of properties from an object:

```js
function pluck(o, propertyNames) {
  return propertyNames.map((n) => o[n]);
}
```

Here's how you would write and use this function in TypeScript, using the **index type query** and **indexed access** operators:

```ts
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
};

// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);

// If we try to pluck model and year, we get an
// array of a union type: (string | number)[]
let modelYear = pluck(taxi, ["model", "year"]);
```

The compiler checks that `manufacturer` and `model` are actually properties on `Car`.
The example introduces a couple of new type operators.
First is `keyof T`, the **index type query operator**.
For any type `T`, `keyof T` is the union of known, public property names of `T`.
For example:

```ts
interface Car {
  manufacturer: string;
  model: string;
  year: number;
}
let carProps: keyof Car;
```

`keyof Car` is completely interchangeable with `"manufacturer" | "model" | "year"`.
The difference is that if you add another property to `Car`, say `ownersAddress: string`, then `keyof Car` will automatically update to be `"manufacturer" | "model" | "year" | "ownersAddress"`.
And you can use `keyof` in generic contexts like `pluck`, where you can't possibly know the property names ahead of time.
That means the compiler will check that you pass the right set of property names to `pluck`:

```ts
// error, Type '"unknown"' is not assignable to type '"manufacturer" | "model" | "year"'
pluck(taxi, ["year", "unknown"]);
```

The second operator is `T[K]`, the **indexed access operator**.
Here, the type syntax reflects the expression syntax.
That means that `taxi["manufacturer"]` has the type `Car["manufacturer"]` — which in our example is just `string`.
However, just like index type queries, you can use `T[K]` in a generic context, which is where its real power comes to life.
You just have to make sure that the type variable `K extends keyof T`.
Here's another example with a function named `getProperty`.

```ts
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}
```

In `getProperty`, `o: T` and `propertyName: K`, so that means `o[propertyName]: T[K]`.
Once you return the `T[K]` result, the compiler will instantiate the actual type of the key, so the return type of `getProperty` will vary according to which property you request.

```ts
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}
interface Car {
  manufacturer: string;
  model: string;
  year: number;
}
let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
};
let manufacturer: string = getProperty(taxi, "manufacturer");
let year: number = getProperty(taxi, "year");

let unknown = getProperty(taxi, "unknown");
```

## Index types and index signatures

`keyof` and `T[K]` interact with index signatures. An index signature parameter type must be 'string' or 'number'.
If you have a type with a string index signature, `keyof T` will be `string | number`
(and not just `string`, since in JavaScript you can access an object property either
by using strings (`object["42"]`) or numbers (`object[42]`)).
And `T[string]` is just the type of the index signature:

```ts
interface Dictionary<T> {
  [key: string]: T;
}
let keys: keyof Dictionary<number>;
let value: Dictionary<number>["foo"];
```

If you have a type with a number index signature, `keyof T` will just be `number`.

```ts
interface Dictionary<T> {
  [key: number]: T;
}

let keys: keyof Dictionary<number>;
let numberValue: Dictionary<number>[42];
let value: Dictionary<number>["foo"];
```

## Mapped types

A common task is to take an existing type and make each of its properties optional:

```ts
interface PersonSubset {
  name?: string;
  age?: number;
}
```

Or we might want a readonly version:

```ts
interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}
```

This happens often enough in JavaScript that TypeScript provides a way to create new types based on old types — **mapped types**.
In a mapped type, the new type transforms each property in the old type in the same way.
For example, you can make all properties optional or of a type `readonly`.
Here are a couple of examples:

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

And to use it:

```ts
type Person = {
  name: string;
  age: number;
};
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

Note that this syntax describes a type rather than a member.
If you want to add members, you can use an intersection type:

```ts
// Use this:
type PartialWithNewMember<T> = {
  [P in keyof T]?: T[P];
} & { newMember: boolean }

// This is an error!
type WrongPartialWithNewMember<T> = {
  [P in keyof T]?: T[P];
  newMember: boolean;
}
```

Let's take a look at the simplest mapped type and its parts:

```ts
type Keys = "option1" | "option2";
type Flags = { [K in Keys]: boolean };
```

The syntax resembles the syntax for index signatures with a `for .. in` inside.
There are three parts:

1. The type variable `K`, which gets bound to each property in turn.
2. The string literal union `Keys`, which contains the names of properties to iterate over.
3. The resulting type of the property.

In this simple example, `Keys` is a hard-coded list of property names and the property type is always `boolean`, so this mapped type is equivalent to writing:

```ts
type Flags = {
  option1: boolean;
  option2: boolean;
};
```

Real applications, however, look like `Readonly` or `Partial` above.
They're based on some existing type, and they transform the properties in some way.
That's where `keyof` and indexed access types come in:

```ts
type Person = {
  name: string;
  age: number;
};
type NullablePerson = { [P in keyof Person]: Person[P] | null };
type PartialPerson = { [P in keyof Person]?: Person[P] };
```

But it's more useful to have a general version.

```ts
type Nullable<T> = { [P in keyof T]: T[P] | null };
type Partial<T> = { [P in keyof T]?: T[P] };
```

In these examples, the properties list is `keyof T` and the resulting type is some variant of `T[P]`.
This is a good template for any general use of mapped types.
That's because this kind of transformation is homomorphic, which means that the mapping applies only to properties of `T` and no others.
The compiler knows that it can copy all the existing property modifiers before adding any new ones.
For example, if `Person.name` was readonly, `Partial<Person>.name` would be readonly and optional.

Here's one more example, in which `T[P]` is wrapped in a `Proxy<T>` class:

```ts
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};

function proxify<T>(o: T): Proxify<T> {
  // ... wrap proxies ...
}

let props = { rooms: 4 };
let proxyProps = proxify(props);
```

Note that `Readonly<T>` and `Partial<T>` are so useful, they are included in TypeScript's standard library along with `Pick` and `Record`:

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

`Readonly`, `Partial` and `Pick` are homomorphic whereas `Record` is not.
One clue that `Record` is not homomorphic is that it doesn't take an input type to copy properties from:

```ts
type ThreeStringProps = Record<"prop1" | "prop2" | "prop3", string>;
```

Non-homomorphic types are essentially creating new properties, so they can't copy property modifiers from anywhere.

Note that `keyof any` represents the type of any value that can be used as an index to an object. In otherwords, `keyof any` is currently equal to `string | number | symbol`.

## Inference from mapped types

Now that you know how to wrap the properties of a type, the next thing you'll want to do is unwrap them.
Fortunately, that's pretty easy:

```ts
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};

function proxify<T>(o: T): Proxify<T> {
  return {} as any;
}

let props = { rooms: 4 };
let proxyProps = proxify(props);
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
    result[k] = t[k].get();
  }
  return result;
}

let originalProps = unproxify(proxyProps);
```

Note that this unwrapping inference only works on homomorphic mapped types.
If the mapped type is not homomorphic you'll have to give an explicit type parameter to your unwrapping function.

## Conditional Types

A conditional type selects one of two possible types based on a condition expressed as a type relationship test:

```ts
T extends U ? X : Y
```

The type above means when `T` is assignable to `U` the type is `X`, otherwise the type is `Y`.

A conditional type `T extends U ? X : Y` is either _resolved_ to `X` or `Y`, or _deferred_ because the condition depends on one or more type variables.
When `T` or `U` contains type variables, whether to resolve to `X` or `Y`, or to defer, is determined by whether or not the type system has enough information to conclude that `T` is always assignable to `U`.

As an example of some types that are immediately resolved, we can take a look at the following example:

```ts
declare function f<T extends boolean>(x: T): T extends true ? string : number;

// Type is 'string | number'
let x = f(Math.random() < 0.5);
```

Another example would be the `TypeName` type alias, which uses nested conditional types:

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

type T0 = TypeName<string>;
type T1 = TypeName<"a">;
type T2 = TypeName<true>;
type T3 = TypeName<() => void>;
type T4 = TypeName<string[]>;
```

But as an example of a place where conditional types are deferred - where they stick around instead of picking a branch - would be in the following:

```ts
interface Foo {
  propA: boolean;
  propB: boolean;
}

declare function f<T>(x: T): T extends Foo ? string : number;

function foo<U>(x: U) {
  // Has type 'U extends Foo ? string : number'
  let a = f(x);

  // This assignment is allowed though!
  let b: string | number = a;
}
```

In the above, the variable `a` has a conditional type that hasn't yet chosen a branch.
When another piece of code ends up calling `foo`, it will substitute in `U` with some other type, and TypeScript will re-evaluate the conditional type, deciding whether it can actually pick a branch.

In the meantime, we can assign a conditional type to any other target type as long as each branch of the conditional is assignable to that target.
So in our example above we were able to assign `U extends Foo ? string : number` to `string | number` since no matter what the conditional evaluates to, it's known to be either `string` or `number`.
