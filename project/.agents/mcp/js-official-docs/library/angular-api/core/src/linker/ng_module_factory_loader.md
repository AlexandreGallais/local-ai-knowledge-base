# core/src/linker/ng_module_factory_loader

## getModuleFactory

```ts
export function getModuleFactory(id: string): NgModuleFactory<any>
```

Returns the NgModuleFactory with the given id (specified using [@NgModule.id
field](api/core/NgModule#id)), if it exists and has been loaded. Factories for NgModules that do
not specify an `id` cannot be retrieved. Throws if an NgModule cannot be found.
@publicApi
@deprecated Use `getNgModuleById` instead.

## getNgModuleById

```ts
export function getNgModuleById<T>(id: string): Type<T>
```

Returns the NgModule class with the given id (specified using [@NgModule.id
field](api/core/NgModule#id)), if it exists and has been loaded. Classes for NgModules that do
not specify an `id` cannot be retrieved. Throws if an NgModule cannot be found.
@publicApi