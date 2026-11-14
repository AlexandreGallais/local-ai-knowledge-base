# core/rxjs-interop/src/to_signal

## ToSignalOptions

```ts
export interface ToSignalOptions<T>
```

Options for `toSignal`.

@publicApi 20.0

## ToSignalOptions.initialValue

```ts
initialValue?: unknown
```

Initial value for the signal produced by `toSignal`.

This will be the value of the signal until the observable emits its first value.

## ToSignalOptions.requireSync

```ts
requireSync?: boolean
```

Whether to require that the observable emits synchronously when `toSignal` subscribes.

If this is `true`, `toSignal` will assert that the observable produces a value immediately upon
subscription. Setting this option removes the need to either deal with `undefined` in the
signal type or provide an `initialValue`, at the cost of a runtime error if this requirement is
not met.

## ToSignalOptions.injector

```ts
injector?: Injector
```

`Injector` which will provide the `DestroyRef` used to clean up the Observable subscription.

If this is not provided, a `DestroyRef` will be retrieved from the current [injection
context](guide/di/dependency-injection-context), unless manual cleanup is requested.

## ToSignalOptions.manualCleanup

```ts
manualCleanup?: boolean
```

Whether the subscription should be automatically cleaned up (via `DestroyRef`) when
`toSignal`'s creation context is destroyed.

If manual cleanup is enabled, then `DestroyRef` is not used, and the subscription will persist
until the `Observable` itself completes.

## ToSignalOptions.equal

```ts
equal?: ValueEqualityFn<T>
```

A comparison function which defines equality for values emitted by the observable.

Equality comparisons are executed against the initial value if one is provided.

## ToSignalOptions.debugName

```ts
debugName?: string
```

A debug name for the signal. Used in Angular DevTools to identify the signal.