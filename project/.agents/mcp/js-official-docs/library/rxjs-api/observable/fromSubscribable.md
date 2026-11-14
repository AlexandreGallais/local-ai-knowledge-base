# src/internal/observable/fromSubscribable

## fromSubscribable

```ts
export function fromSubscribable<T>(subscribable: Subscribable<T>)
```

Used to convert a subscribable to an observable.

Currently, this is only used within internals.

TODO: Discuss ObservableInput supporting "Subscribable".
https://github.com/ReactiveX/rxjs/issues/5909

@param subscribable A subscribable