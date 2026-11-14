# core/rxjs-interop/src/output_to_observable

## outputToObservable

```ts
export function outputToObservable<T>(ref: OutputRef<T>): Observable<T>
```

Converts an Angular output declared via `output()` or `outputFromObservable()`
to an observable.
It creates an observable that represents the stream of "events firing" in an output.

You can subscribe to the output via `Observable.subscribe` then.

@see [RxJS interop with component and directive outputs](ecosystem/rxjs-interop/output-interop)

@publicApi 19.0