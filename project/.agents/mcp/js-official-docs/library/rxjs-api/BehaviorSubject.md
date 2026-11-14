# src/internal/BehaviorSubject

## BehaviorSubject

```ts
export class BehaviorSubject<T> extends Subject<T>
```

A variant of Subject that requires an initial value and emits its current
value whenever it is subscribed to.