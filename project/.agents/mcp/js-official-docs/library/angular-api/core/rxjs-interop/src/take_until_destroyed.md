# core/rxjs-interop/src/take_until_destroyed

## takeUntilDestroyed

```ts
export function takeUntilDestroyed<T>(destroyRef?: DestroyRef): MonoTypeOperatorFunction<T>
```

Operator which completes the Observable when the calling context (component, directive, service,
etc) is destroyed.

@param destroyRef optionally, the `DestroyRef` representing the current context. This can be
    passed explicitly to use `takeUntilDestroyed` outside of an [injection
context](guide/di/dependency-injection-context). Otherwise, the current `DestroyRef` is injected.

@see [Unsubscribing with takeUntilDestroyed](ecosystem/rxjs-interop/take-until-destroyed)

@publicApi 19.0