# core/src/linker/ng_module_factory

## NgModuleRef

```ts
export abstract class NgModuleRef<T>
```

Represents an instance of an `NgModule` created by an `NgModuleFactory`.
Provides access to the `NgModule` instance and related objects.

@publicApi

## NgModuleRef.injector

```ts
abstract get injector(): EnvironmentInjector
```

The injector that contains all of the providers of the `NgModule`.

## NgModuleRef.instance

```ts
abstract get instance(): T
```

The `NgModule` instance.

## NgModuleRef.destroy

```ts
abstract destroy(): void
```

Destroys the module instance and all of the data structures associated with it.

## NgModuleRef.onDestroy

```ts
abstract onDestroy(callback: ()
```

Registers a callback to be executed when the module is destroyed.

## NgModuleFactory

```ts
export abstract class NgModuleFactory<T>
```

@publicApi

@deprecated
This class was mostly used as a part of ViewEngine-based JIT API and is no longer needed in Ivy
JIT mode. Angular provides APIs that accept NgModule classes directly (such as
[PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule) and
[createNgModule](api/core/createNgModule)), consider switching to those APIs instead of
using factory-based ones.