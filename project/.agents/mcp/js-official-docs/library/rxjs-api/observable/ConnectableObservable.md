# src/internal/observable/ConnectableObservable

## ConnectableObservable

```ts
export class ConnectableObservable<T> extends Observable<T>
```

@class ConnectableObservable<T>
@deprecated Will be removed in v8. Use {@link connectable} to create a connectable observable.
If you are using the `refCount` method of `ConnectableObservable`, use the {@link share} operator
instead.
Details: https://rxjs.dev/deprecations/multicasting

## ConnectableObservable.constructor

```ts
constructor(public source: Observable<T>, protected subjectFactory: ()
```

@param source The source observable
@param subjectFactory The factory that creates the subject used internally.
@deprecated Will be removed in v8. Use {@link connectable} to create a connectable observable.
`new ConnectableObservable(source, factory)` is equivalent to
`connectable(source, { connector: factory })`.
When the `refCount()` method is needed, the {@link share} operator should be used instead:
`new ConnectableObservable(source, factory).refCount()` is equivalent to
`source.pipe(share({ connector: factory }))`.
Details: https://rxjs.dev/deprecations/multicasting

## ConnectableObservable.connect

```ts
connect(): Subscription
```

@deprecated {@link ConnectableObservable} will be removed in v8. Use {@link connectable} instead.
Details: https://rxjs.dev/deprecations/multicasting

## ConnectableObservable.refCount

```ts
refCount(): Observable<T>
```

@deprecated {@link ConnectableObservable} will be removed in v8. Use the {@link share} operator instead.
Details: https://rxjs.dev/deprecations/multicasting