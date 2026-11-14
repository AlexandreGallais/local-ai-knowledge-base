# src/internal/util/EmptyError

## EmptyError

```ts
export const EmptyError: EmptyErrorCtor = createErrorClass( (_super)
```

An error thrown when an Observable or a sequence was queried but has no
elements.

@see {@link first}
@see {@link last}
@see {@link single}
@see {@link firstValueFrom}
@see {@link lastValueFrom}