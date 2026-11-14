# core/src/di/injector_token

## INJECTOR

```ts
export const INJECTOR = new InjectionToken<Injector>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'INJECTOR' : '', // Disable tslint because this is const enum which gets inlined not top level prop access. // tslint:disable-next-line: no-toplevel-property-access InjectorMarkers.Injector as any, // Special value used by Ivy to identify `Injector`. )
```

An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.

Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
project.

@publicApi