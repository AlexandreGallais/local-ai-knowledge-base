# src/internal/operators/scanInternals

## scanInternals

```ts
export function scanInternals<V, A, S>( accumulator: (acc: V | A | S, value: V, index: number)
```

A basic scan operation. This is used for `scan` and `reduce`.
@param accumulator The accumulator to use
@param seed The seed value for the state to accumulate
@param hasSeed Whether or not a seed was provided
@param emitOnNext Whether or not to emit the state on next
@param emitBeforeComplete Whether or not to emit the before completion