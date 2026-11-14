# src/internal/util/mapOneOrManyArgs

## mapOneOrManyArgs

```ts
export function mapOneOrManyArgs<T, R>(fn: ((...values: T[])
```

Used in several -- mostly deprecated -- situations where we need to 
apply a list of arguments or a single argument to a result selector.