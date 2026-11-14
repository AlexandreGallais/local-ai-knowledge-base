# src/internal/operators/zipAll

## zipAll

```ts
export function zipAll<T>(): OperatorFunction<ObservableInput<T>, T[]>
```

Collects all observable inner sources from the source, once the source completes,
it will subscribe to all inner sources, combining their values by index and emitting
them.

@see {@link zipWith}
@see {@link zip}