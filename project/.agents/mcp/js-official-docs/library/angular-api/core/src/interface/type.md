# core/src/interface/type

## Type

```ts
export const Type = Function
```

@description

Represents a type that a Component or other object is instances of.

An example of a `Type` is `MyCustomComponent` class, which in JavaScript is represented by
the `MyCustomComponent` constructor function.

@publicApi

## AbstractType

```ts
export interface AbstractType<T> extends Function
```

@description

Represents an abstract class `T`, if applied to a concrete class it would stop being
instantiable.

@publicApi