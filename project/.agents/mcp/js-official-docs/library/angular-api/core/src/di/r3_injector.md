# core/src/di/r3_injector

## EnvironmentInjector

```ts
export abstract class EnvironmentInjector implements Injector
```

An `Injector` that's part of the environment injector hierarchy, which exists outside of the
component tree.

@see [Types of injector hierarchies](guide/di/hierarchical-dependency-injection#types-of-injector-hierarchies)

@publicApi

## EnvironmentInjector.get

```ts
abstract get<T>( token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions &
```

Retrieves an instance from the injector based on the provided token.
@returns The instance from the injector if defined, otherwise the `notFoundValue`.
@throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.

## EnvironmentInjector.get

```ts
abstract get<T>( token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions, ): T | null
```

Retrieves an instance from the injector based on the provided token.
@returns The instance from the injector if defined, otherwise the `notFoundValue`.
@throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.

## EnvironmentInjector.get

```ts
abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions): T
```

Retrieves an instance from the injector based on the provided token.
@returns The instance from the injector if defined, otherwise the `notFoundValue`.
@throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.

## EnvironmentInjector.get

```ts
abstract get<T>(token: string | ProviderToken<T>, notFoundValue?: any): any
```

@deprecated from v4.0.0 use ProviderToken<T>
@suppress {duplicate}

## EnvironmentInjector.runInContext

```ts
abstract runInContext<ReturnT>(fn: ()
```

Runs the given function in the context of this `EnvironmentInjector`.

Within the function's stack frame, [`inject`](api/core/inject) can be used to inject
dependencies from this injector. Note that `inject` is only usable synchronously, and cannot be
used in any asynchronous callbacks or after any `await` points.

@param fn the closure to be run in the context of this injector
@returns the return value of the function, if any
@deprecated use the standalone function `runInInjectionContext` instead

## EnvironmentInjector.destroyed

```ts
abstract get destroyed(): boolean
```

Indicates whether the instance has already been destroyed.

## EnvironmentInjector.destroyed

```ts
override get destroyed(): boolean
```

Flag indicating that this injector was previously destroyed.

## EnvironmentInjector.destroy

```ts
override destroy(): void
```

Destroy the injector and release references to every instance or provider associated with it.

Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
hook was found.