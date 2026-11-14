# core/src/di/interface/defs

## InjectableType

```ts
export interface InjectableType<T> extends Type<T>
```

A `Type` which has a `ɵprov: ɵɵInjectableDeclaration` static field.

`InjectableType`s contain their own Dependency Injection metadata and are usable in an
`InjectorDef`-based `StaticInjector`.

@publicApi

## InjectorType

```ts
export interface InjectorType<T> extends Type<T>
```

A type which has an `InjectorDef` static field.

`InjectorTypes` can be used to configure a `StaticInjector`.

This is an opaque type whose structure is highly version dependent. Do not rely on any
properties.

@publicApi