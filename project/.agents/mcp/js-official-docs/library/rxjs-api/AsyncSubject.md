# src/internal/AsyncSubject

## AsyncSubject

```ts
export class AsyncSubject<T> extends Subject<T>
```

A variant of Subject that only emits a value when it completes. It will emit
its latest value to all its observers on completion.