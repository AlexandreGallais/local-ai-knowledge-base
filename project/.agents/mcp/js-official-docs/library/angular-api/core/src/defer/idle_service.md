# core/src/defer/idle_service

## IdleService

```ts
export interface IdleService
```

Service which configures custom 'on idle' behavior for Angular features like `@defer`.

@publicApi

@see [Customizing `idle` behavior](guide/templates/defer#customizing-idle-behavior)

## IdleService.requestOnIdle

```ts
requestOnIdle(callback: (deadline?: IdleDeadline)
```

Schedule `callback` to be executed when the current application or browser is considered idle.

@returns an id which allows the scheduled callback to be cancelled before it executes.

## IdleService.cancelOnIdle

```ts
cancelOnIdle(id: number): void
```

Cancel a previously scheduled callback using the id associated with it.

## provideIdleServiceWith

```ts
export function provideIdleServiceWith( useExisting: AbstractType<IdleService> | InjectionToken<IdleService>, ): EnvironmentProviders
```

Configures Angular to use the given DI token as its `IdleService`.

The given token must be available for injection from the root injector, and the injected value
must implement the `IdleService` interface.

@publicApi

@see [Customizing `idle` behavior](guide/templates/defer#customizing-idle-behavior)