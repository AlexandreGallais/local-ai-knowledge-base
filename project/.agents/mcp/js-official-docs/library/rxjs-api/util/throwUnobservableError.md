# src/internal/util/throwUnobservableError

## createInvalidObservableTypeError

```ts
export function createInvalidObservableTypeError(input: any)
```

Creates the TypeError to throw if an invalid object is passed to `from` or `scheduled`.
@param input The object that was passed.