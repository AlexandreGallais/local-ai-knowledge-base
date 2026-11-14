# src/internal/util/argsOrArgArray

## argsOrArgArray

```ts
export function argsOrArgArray<T>(args: (T | T[])[]): T[]
```

Used in operators and functions that accept either a list of arguments, or an array of arguments
as a single argument.