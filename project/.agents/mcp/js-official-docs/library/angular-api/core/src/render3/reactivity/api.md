# core/src/render3/reactivity/api

## Signal

```ts
export type Signal<T> = (()
```

A reactive value which notifies consumers of any changes.

Signals are functions which returns their current value. To access the current value of a signal,
call it.

Ordinary values can be turned into `Signal`s with the `signal` function.

@see [What are signals?](guide/signals#what-are-signals)

@publicApi 17.0

## isSignal

```ts
export function isSignal(value: unknown): value is Signal<unknown>
```

Checks if the given `value` is a reactive `Signal`.

@see [Type checking signals](guide/signals#type-checking-signals)

@publicApi 17.0

## ValueEqualityFn

```ts
export type ValueEqualityFn<T> = (a: T, b: T)
```

A comparison function which can determine if two values are equal.

@see [Signal equality functions](guide/signals#signal-equality-functions)

@publicApi 17.0

## isWritableSignal

```ts
export function isWritableSignal(value: unknown): value is WritableSignal<unknown>
```

Checks if the given `value` is a writeable signal.

@see [Type checking signals](guide/signals#type-checking-signals)

@publicApi 21.1