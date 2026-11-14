# core/src/di/injector

## Injector

```ts
export abstract class Injector
```

Concrete injectors implement this interface. Injectors are configured
with [providers](guide/di/defining-dependency-providers) that associate
dependencies of various types with [injection tokens](guide/di/defining-dependency-providers).

@see [DI Providers](guide/di/defining-dependency-providers).
@see {@link StaticProvider}

@usageNotes

 The following example creates a service injector instance.

{@example core/di/ts/provider_spec.ts region='ConstructorProvider'}

### Usage example

{@example core/di/ts/injector_spec.ts region='Injector'}

`Injector` returns itself when given `Injector` as a token:

{@example core/di/ts/injector_spec.ts region='injectInjector'}

@see [Types of injector hierarchies](guide/di/hierarchical-dependency-injection#types-of-injector-hierarchies)

@publicApi

## Injector.get

```ts
abstract get<T>( token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions &
```

Retrieves an instance from the injector based on the provided token.
@returns The instance from the injector if defined, otherwise the `notFoundValue`.
@throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.

## Injector.get

```ts
abstract get<T>( token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions, ): T | null
```

Retrieves an instance from the injector based on the provided token.
@returns The instance from the injector if defined, otherwise the `notFoundValue`.
@throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.

## Injector.get

```ts
abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions): T
```

Retrieves an instance from the injector based on the provided token.
@returns The instance from the injector if defined, otherwise the `notFoundValue`.
@throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.

## Injector.get

```ts
abstract get<T>(token: string | ProviderToken<T>, notFoundValue?: any): any
```

@deprecated from v4.0.0 use ProviderToken<T>
@suppress {duplicate}

## Injector.create

```ts
static create(providers: StaticProvider[], parent?: Injector): Injector
```

@deprecated from v5 use the new signature Injector.create(options)

## Injector.create

```ts
static create(options:
```

Creates a new injector instance that provides one or more dependencies,
according to a given type or types of `StaticProvider`.

@param options An object with the following properties:
* `providers`: An array of providers of the [StaticProvider type](api/core/StaticProvider).
* `parent`: (optional) A parent injector.
* `name`: (optional) A developer-defined identifying name for the new injector.

@returns The new injector instance.

## DestroyableInjector

```ts
export interface DestroyableInjector extends Injector
```

An Injector that the owner can destroy and trigger the DestroyRef.destroy hooks.

@publicApi