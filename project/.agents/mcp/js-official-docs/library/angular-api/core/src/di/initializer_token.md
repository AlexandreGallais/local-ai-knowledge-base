# core/src/di/initializer_token

## ENVIRONMENT_INITIALIZER

```ts
export const ENVIRONMENT_INITIALIZER = new InjectionToken<ReadonlyArray<()
```

A multi-provider token for initialization functions that will run upon construction of an
environment injector.

@deprecated from v19.0.0, use provideEnvironmentInitializer instead

@see {@link provideEnvironmentInitializer}

Note: As opposed to the `APP_INITIALIZER` token, the `ENVIRONMENT_INITIALIZER` functions are not awaited,
hence they should not be `async`.

@publicApi