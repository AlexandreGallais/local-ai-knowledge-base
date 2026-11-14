# core/src/ng_reflect

## provideNgReflectAttributes

```ts
export function provideNgReflectAttributes(): EnvironmentProviders
```

Enables the logic to produce `ng-reflect-*` attributes on elements with bindings.

Note: this is a dev-mode only setting and it will have no effect in production mode.
In production mode, the `ng-reflect-*` attributes are *never* produced by Angular.

Important: using and relying on the `ng-reflect-*` attributes is not recommended,
they are deprecated and only present for backwards compatibility. Angular will stop
producing them in one of the future versions.

@publicApi