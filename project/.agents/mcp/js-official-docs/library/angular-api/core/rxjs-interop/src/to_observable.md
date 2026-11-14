# core/rxjs-interop/src/to_observable

## ToObservableOptions

```ts
export interface ToObservableOptions
```

Options for `toObservable`.

@publicApi 20.0

## ToObservableOptions.injector

```ts
injector?: Injector
```

The `Injector` to use when creating the underlying `effect` which watches the signal.

If this isn't specified, the current [injection context](guide/di/dependency-injection-context)
will be used.

## toObservable

```ts
export function toObservable<T>(source: Signal<T>, options?: ToObservableOptions): Observable<T>
```

Exposes the value of an Angular `Signal` as an RxJS `Observable`.
As it reflects a state, the observable will always emit the latest value upon subscription.

The signal's value will be propagated into the `Observable`'s subscribers using an `effect`.
Because the `effect` runs asynchronously, the observable is not guaranteed to be immediately synchronized when the signal is updated.
If the signal is updated multiple times before the `effect` runs, the observable will only emit the last signal value.

`toObservable` must be called in an injection context unless an injector is provided via options.

@see [RxJS interop with Angular signals](ecosystem/rxjs-interop)
@see [Create an RxJS Observable from a signal with toObservable](ecosystem/rxjs-interop#create-an-rxjs-observable-from-a-signal-with-toobservable)

@publicApi 20.0