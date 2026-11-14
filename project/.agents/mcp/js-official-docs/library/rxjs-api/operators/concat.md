# src/internal/operators/concat

## concat

```ts
export function concat<T, A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>
```

@deprecated Replaced with {@link concatWith}. Will be removed in v8.

## concat

```ts
export function concat<T, A extends readonly unknown[]>( ...sourcesAndScheduler: [...ObservableInputTuple<A>, SchedulerLike] ): OperatorFunction<T, T | A[number]>
```

@deprecated Replaced with {@link concatWith}. Will be removed in v8.

## concat

```ts
export function concat<T, R>(...args: any[]): OperatorFunction<T, R>
```

@deprecated Replaced with {@link concatWith}. Will be removed in v8.