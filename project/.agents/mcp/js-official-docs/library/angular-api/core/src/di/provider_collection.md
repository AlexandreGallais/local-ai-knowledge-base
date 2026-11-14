# core/src/di/provider_collection

## makeEnvironmentProviders

```ts
export function makeEnvironmentProviders( providers: (Provider | EnvironmentProviders)[], ): EnvironmentProviders
```

Wrap an array of `Provider`s into `EnvironmentProviders`, preventing them from being accidentally
referenced in `@Component` in a component injector.

@publicApi

## provideEnvironmentInitializer

```ts
export function provideEnvironmentInitializer(initializerFn: ()
```

@description
This function is used to provide initialization functions that will be executed upon construction
of an environment injector.

Note that the provided initializer is run in the injection context.

Previously, this was achieved using the `ENVIRONMENT_INITIALIZER` token which is now deprecated.

@see {@link ENVIRONMENT_INITIALIZER}

@usageNotes
The following example illustrates how to configure an initialization function using
`provideEnvironmentInitializer()`
```ts
createEnvironmentInjector(
  [
    provideEnvironmentInitializer(() => {
      console.log('environment initialized');
    }),
  ],
  parentInjector
);
```

@publicApi

## ImportProvidersSource

```ts
export type ImportProvidersSource = | Type<unknown> | ModuleWithProviders<unknown> | Array<ImportProvidersSource>
```

A source of providers for the `importProvidersFrom` function.

@publicApi

## importProvidersFrom

```ts
export function importProvidersFrom(...sources: ImportProvidersSource[]): EnvironmentProviders
```

Collects providers from all NgModules and standalone components, including transitively imported
ones.

Providers extracted via `importProvidersFrom` are only usable in an application injector or
another environment injector (such as a route injector). They should not be used in component
providers.


@usageNotes
The results of the `importProvidersFrom` call can be used in the `bootstrapApplication` call:

```ts
await bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(NgModuleOne, NgModuleTwo)
  ]
});
```

You can also use the `importProvidersFrom` results in the `providers` field of a route, when a
standalone component is used:

```ts
export const ROUTES: Route[] = [
  {
    path: 'foo',
    providers: [
      importProvidersFrom(NgModuleOne, NgModuleTwo)
    ],
    component: YourStandaloneComponent
  }
];
```

@returns Collected providers from the specified list of types.
@publicApi