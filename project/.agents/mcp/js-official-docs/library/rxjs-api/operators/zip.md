# src/internal/operators/zip

## zip

```ts
export function zip<T, A extends readonly unknown[]>(otherInputs: [...ObservableInputTuple<A>]): OperatorFunction<T, Cons<T, A>>
```

@deprecated Replaced with {@link zipWith}. Will be removed in v8.

## zip

```ts
export function zip<T, A extends readonly unknown[], R>( otherInputsAndProject: [...ObservableInputTuple<A>], project: (...values: Cons<T, A>)
```

@deprecated Replaced with {@link zipWith}. Will be removed in v8.

## zip

```ts
export function zip<T, A extends readonly unknown[]>(...otherInputs: [...ObservableInputTuple<A>]): OperatorFunction<T, Cons<T, A>>
```

@deprecated Replaced with {@link zipWith}. Will be removed in v8.

## zip

```ts
export function zip<T, A extends readonly unknown[], R>( ...otherInputsAndProject: [...ObservableInputTuple<A>, (...values: Cons<T, A>)
```

@deprecated Replaced with {@link zipWith}. Will be removed in v8.

## zip

```ts
export function zip<T, R>(...sources: Array<ObservableInput<any> | ((...values: Array<any>)
```

@deprecated Replaced with {@link zipWith}. Will be removed in v8.