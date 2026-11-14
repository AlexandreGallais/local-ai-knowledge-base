# core/src/render3/reactivity/linked_signal

## linkedSignal

```ts
export function linkedSignal<D>( computation: ()
```

Creates a writable signal whose value is initialized and reset by the linked, reactive computation.

@publicApi 20.0

## linkedSignal

```ts
export function linkedSignal<S, D>(options:
```

Creates a writable signal whose value is initialized and reset by the linked, reactive computation.
This is an advanced API form where the computation has access to the previous value of the signal and the computation result.

Note: The computation is reactive, meaning the linked signal will automatically update whenever any of the signals used within the computation change.

@publicApi 20.0
@see [Dependent state with linkedSignal](guide/signals/linked-signal)