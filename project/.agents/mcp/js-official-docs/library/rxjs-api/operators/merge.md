# src/internal/operators/merge

## merge

```ts
export function merge<T, A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>
```

@deprecated Replaced with {@link mergeWith}. Will be removed in v8.

## merge

```ts
export function merge<T, A extends readonly unknown[]>( ...sourcesAndConcurrency: [...ObservableInputTuple<A>, number] ): OperatorFunction<T, T | A[number]>
```

@deprecated Replaced with {@link mergeWith}. Will be removed in v8.

## merge

```ts
export function merge<T, A extends readonly unknown[]>( ...sourcesAndScheduler: [...ObservableInputTuple<A>, SchedulerLike] ): OperatorFunction<T, T | A[number]>
```

@deprecated Replaced with {@link mergeWith}. Will be removed in v8.

## merge

```ts
export function merge<T, A extends readonly unknown[]>( ...sourcesAndConcurrencyAndScheduler: [...ObservableInputTuple<A>, number, SchedulerLike] ): OperatorFunction<T, T | A[number]>
```

@deprecated Replaced with {@link mergeWith}. Will be removed in v8.