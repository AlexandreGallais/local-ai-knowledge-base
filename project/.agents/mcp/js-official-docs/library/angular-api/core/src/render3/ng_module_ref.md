# core/src/render3/ng_module_ref

## createNgModule

```ts
export function createNgModule<T>( ngModule: Type<T>, parentInjector?: Injector, ): viewEngine_NgModuleRef<T>
```

Returns a new NgModuleRef instance based on the NgModule class and parent injector provided.

@param ngModule NgModule class.
@param parentInjector Optional injector instance to use as a parent for the module injector. If
    not provided, `NullInjector` will be used instead.
@returns NgModuleRef that represents an NgModule instance.

@publicApi

## createEnvironmentInjector

```ts
export function createEnvironmentInjector( providers: Array<Provider | EnvironmentProviders>, parent: EnvironmentInjector, debugName: string | null = null, ): EnvironmentInjector
```

Create a new environment injector.

@param providers An array of providers.
@param parent A parent environment injector.
@param debugName An optional name for this injector instance, which will be used in error
    messages.

@publicApi