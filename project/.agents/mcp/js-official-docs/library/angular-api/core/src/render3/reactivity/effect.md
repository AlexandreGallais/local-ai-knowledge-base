# core/src/render3/reactivity/effect

## EffectRef

```ts
export interface EffectRef
```

A global reactive effect, which can be manually destroyed.

@publicApi 20.0

@see [Destroying effects](guide/signals/effect#destroying-effects)

## EffectRef.destroy

```ts
destroy(): void
```

Shut down the effect, removing it from any upcoming scheduled executions.

## CreateEffectOptions

```ts
export interface CreateEffectOptions
```

Options passed to the `effect` function.

@publicApi 20.0

## CreateEffectOptions.injector

```ts
injector?: Injector
```

The `Injector` in which to create the effect.

If this is not provided, the current [injection context](guide/di/dependency-injection-context)
will be used instead (via `inject`).

## CreateEffectOptions.manualCleanup

```ts
manualCleanup?: boolean
```

Whether the `effect` should require manual cleanup.

If this is `false` (the default) the effect will automatically register itself to be cleaned up
with the current `DestroyRef`.

If this is `true` and you want to use the effect outside an injection context, you still
need to provide an `Injector` to the effect.

## CreateEffectOptions.allowSignalWrites

```ts
allowSignalWrites?: boolean
```

@deprecated no longer required, signal writes are allowed by default.

## CreateEffectOptions.debugName

```ts
debugName?: string
```

A debug name for the effect. Used in Angular DevTools to identify the effect.

## EffectCleanupFn

```ts
export type EffectCleanupFn = ()
```

An effect can, optionally, register a cleanup function. If registered, the cleanup is executed
before the next effect run. The cleanup function makes it possible to "cancel" any work that the
previous effect run might have started.

@see [Effect cleanup functions](guide/signals/effect#effect-cleanup-functions)

@publicApi 20.0

## EffectCleanupRegisterFn

```ts
export type EffectCleanupRegisterFn = (cleanupFn: EffectCleanupFn)
```

A callback passed to the effect function that makes it possible to register cleanup logic.

@see [Effect cleanup functions](guide/signals/effect#effect-cleanup-functions)

@publicApi 20.0

## effect

```ts
export function effect( effectFn: (onCleanup: EffectCleanupRegisterFn)
```

Registers an "effect" that will be scheduled & executed whenever the signals that it reads
changes.

Angular has two different kinds of effect: component effects and root effects. Component effects
are created when `effect()` is called from a component, directive, or within a service of a
component/directive. Root effects are created when `effect()` is called from outside the
component tree, such as in a root service.

The two effect types differ in their timing. Component effects run as a component lifecycle
event during Angular's synchronization (change detection) process, and can safely read input
signals or create/destroy views that depend on component state. Root effects run as microtasks
and have no connection to the component tree or change detection.

`effect()` must be run in injection context, unless the `injector` option is manually specified.

@see [Effects](guide/signals/effect)

@publicApi 20.0