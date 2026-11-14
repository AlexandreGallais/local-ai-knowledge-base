# core/src/di/interface/provider

## ValueSansProvider

```ts
export interface ValueSansProvider
```

Configures the `Injector` to return a value for a token.
Base for `ValueProvider` decorator.

@publicApi

## ValueSansProvider.useValue

```ts
useValue: any
```

The value to inject.

## ValueProvider

```ts
export interface ValueProvider extends ValueSansProvider
```

Configures the `Injector` to return a value for a token.
@see [Dependency Injection Guide](guide/di)

@usageNotes

### Example

{@example core/di/ts/provider_spec.ts region='ValueProvider'}

### Multi-value example

{@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}

@publicApi

## ValueProvider.provide

```ts
provide: any
```

An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.

## ValueProvider.multi

```ts
multi?: boolean
```

When true, injector returns an array of instances. This is useful to allow multiple
providers spread across many files to provide configuration information to a common token.

## StaticClassSansProvider

```ts
export interface StaticClassSansProvider
```

Configures the `Injector` to return an instance of `useClass` for a token.
Base for `StaticClassProvider` decorator.

@publicApi

## StaticClassSansProvider.useClass

```ts
useClass: Type<any>
```

An optional class to instantiate for the `token`. By default, the `provide`
class is instantiated.

## StaticClassSansProvider.deps

```ts
deps: any[]
```

A list of `token`s to be resolved by the injector. The list of values is then
used as arguments to the `useClass` constructor.

## StaticClassProvider

```ts
export interface StaticClassProvider extends StaticClassSansProvider
```

Configures the `Injector` to return an instance of `useClass` for a token.
@see [Dependency Injection Guide](guide/di)

@usageNotes

{@example core/di/ts/provider_spec.ts region='StaticClassProvider'}

Note that following two providers are not equal:

{@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}

### Multi-value example

{@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}

@publicApi

## StaticClassProvider.provide

```ts
provide: any
```

An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.

## StaticClassProvider.multi

```ts
multi?: boolean
```

When true, injector returns an array of instances. This is useful to allow multiple
providers spread across many files to provide configuration information to a common token.

## ConstructorSansProvider

```ts
export interface ConstructorSansProvider
```

Configures the `Injector` to return an instance of a token.

@see [Dependency Injection Guide](guide/di)

@usageNotes

```ts
@Injectable(SomeModule, {deps: []})
class MyService {}
```

@publicApi

## ConstructorSansProvider.deps

```ts
deps?: any[]
```

A list of `token`s to be resolved by the injector.

## ConstructorProvider

```ts
export interface ConstructorProvider extends ConstructorSansProvider
```

Configures the `Injector` to return an instance of a token.

@see [Dependency Injection Guide](guide/di)

@usageNotes

{@example core/di/ts/provider_spec.ts region='ConstructorProvider'}

### Multi-value example

{@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}

@publicApi

## ConstructorProvider.provide

```ts
provide: Type<any>
```

An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.

## ConstructorProvider.multi

```ts
multi?: boolean
```

When true, injector returns an array of instances. This is useful to allow multiple
providers spread across many files to provide configuration information to a common token.

## ExistingSansProvider

```ts
export interface ExistingSansProvider
```

Configures the `Injector` to return a value of another `useExisting` token.

@see {@link ExistingProvider}
@see [Dependency Injection Guide](guide/di)

@publicApi

## ExistingSansProvider.useExisting

```ts
useExisting: any
```

Existing `token` to return. (Equivalent to `injector.get(useExisting)`)

## ExistingProvider

```ts
export interface ExistingProvider extends ExistingSansProvider
```

Configures the `Injector` to return a value of another `useExisting` token.

@see [Dependency Injection Guide](guide/di)

@usageNotes

{@example core/di/ts/provider_spec.ts region='ExistingProvider'}

### Multi-value example

{@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}

@publicApi

## ExistingProvider.provide

```ts
provide: any
```

An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.

## ExistingProvider.multi

```ts
multi?: boolean
```

When true, injector returns an array of instances. This is useful to allow multiple
providers spread across many files to provide configuration information to a common token.

## FactorySansProvider

```ts
export interface FactorySansProvider
```

Configures the `Injector` to return a value by invoking a `useFactory` function.

@see {@link FactoryProvider}
@see [Dependency Injection Guide](guide/di)

@publicApi

## FactorySansProvider.useFactory

```ts
useFactory: Function
```

A function to invoke to create a value for this `token`. The function is invoked with
resolved values of `token`s in the `deps` field.

## FactorySansProvider.deps

```ts
deps?: any[]
```

A list of `token`s to be resolved by the injector. The list of values is then
used as arguments to the `useFactory` function.

## FactoryProvider

```ts
export interface FactoryProvider extends FactorySansProvider
```

Configures the `Injector` to return a value by invoking a `useFactory` function.
@see [Dependency Injection Guide](guide/di)

@usageNotes

{@example core/di/ts/provider_spec.ts region='FactoryProvider'}

Dependencies can also be marked as optional:

{@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}

### Multi-value example

{@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}

@publicApi

## FactoryProvider.provide

```ts
provide: any
```

An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).

## FactoryProvider.multi

```ts
multi?: boolean
```

When true, injector returns an array of instances. This is useful to allow multiple
providers spread across many files to provide configuration information to a common token.

## StaticProvider

```ts
export type StaticProvider = | ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | any[]
```

Describes how an `Injector` should be configured as static (that is, without reflection).
A static provider provides tokens to an injector for various types of dependencies.

@see {@link Injector.create()}
@see [Dependency Injection Guide](guide/di/defining-dependency-providers).

@publicApi

## TypeProvider

```ts
export interface TypeProvider extends Type<any> {}
```

Configures the `Injector` to return an instance of `Type` when `Type` is used as the token.

Create an instance by invoking the `new` operator and supplying additional arguments.
This form is a short form of `TypeProvider`;

For more details, see the ["Dependency Injection Guide"](guide/di).

@usageNotes

{@example core/di/ts/provider_spec.ts region='TypeProvider'}

@publicApi

## ClassSansProvider

```ts
export interface ClassSansProvider
```

Configures the `Injector` to return a value by invoking a `useClass` function.
Base for `ClassProvider` decorator.

@see [Dependency Injection Guide](guide/di)

@publicApi

## ClassSansProvider.useClass

```ts
useClass: Type<any>
```

Class to instantiate for the `token`.

## ClassProvider

```ts
export interface ClassProvider extends ClassSansProvider
```

Configures the `Injector` to return an instance of `useClass` for a token.
@see [Dependency Injection Guide](guide/di)

@usageNotes

{@example core/di/ts/provider_spec.ts region='ClassProvider'}

Note that following two providers are not equal:

{@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}

### Multi-value example

{@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}

@publicApi

## ClassProvider.provide

```ts
provide: any
```

An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).

## ClassProvider.multi

```ts
multi?: boolean
```

When true, injector returns an array of instances. This is useful to allow multiple
providers spread across many files to provide configuration information to a common token.

## Provider

```ts
export type Provider = | TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[]
```

Describes how the `Injector` should be configured.
@see [Dependency Injection Guide](guide/di)

@see {@link StaticProvider}

@publicApi

## EnvironmentProviders

```ts
export type EnvironmentProviders
```

Encapsulated `Provider`s that are only accepted during creation of an `EnvironmentInjector` (e.g.
in an `NgModule`).

Using this wrapper type prevents providers which are only designed to work in
application/environment injectors from being accidentally included in
`@Component.providers` and ending up in a component injector.

This wrapper type prevents access to the `Provider`s inside.

@see {@link makeEnvironmentProviders}
@see {@link importProvidersFrom}

@publicApi

## ModuleWithProviders

```ts
export interface ModuleWithProviders<T>
```

A wrapper around an NgModule that associates it with providers
Usage without a generic type is deprecated.

@publicApi