# src/internal/operators/combineLatest

## combineLatest

```ts
export function combineLatest<T, A extends readonly unknown[], R>( sources: [...ObservableInputTuple<A>], project: (...values: [T, ...A])
```

@deprecated Replaced with {@link combineLatestWith}. Will be removed in v8.

## combineLatest

```ts
export function combineLatest<T, A extends readonly unknown[], R>(sources: [...ObservableInputTuple<A>]): OperatorFunction<T, [T, ...A]>
```

@deprecated Replaced with {@link combineLatestWith}. Will be removed in v8.

## combineLatest

```ts
export function combineLatest<T, A extends readonly unknown[], R>( ...sourcesAndProject: [...ObservableInputTuple<A>, (...values: [T, ...A])
```

@deprecated Replaced with {@link combineLatestWith}. Will be removed in v8.

## combineLatest

```ts
export function combineLatest<T, A extends readonly unknown[], R>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, [T, ...A]>
```

@deprecated Replaced with {@link combineLatestWith}. Will be removed in v8.

## combineLatest

```ts
export function combineLatest<T, R>(...args: (ObservableInput<any> | ((...values: any[])
```

@deprecated Replaced with {@link combineLatestWith}. Will be removed in v8.