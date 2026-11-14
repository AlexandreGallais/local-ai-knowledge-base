# core/rxjs-interop/src/output_from_observable

## outputFromObservable

```ts
export function outputFromObservable<T>( observable: Observable<T>, opts?: OutputOptions, ): OutputRef<T>
```

Declares an Angular output that is using an RxJS observable as a source
for events dispatched to parent subscribers.

The behavior for an observable as source is defined as followed:
   1. New values are forwarded to the Angular output (next notifications).
   2. Errors notifications are not handled by Angular. You need to handle these manually.
      For example by using `catchError`.
   3. Completion notifications stop the output from emitting new values.

@usageNotes
Initialize an output in your directive by declaring a
class field and initializing it with the `outputFromObservable()` function.

```ts
@Directive({..})
export class MyDir {
  nameChange$ = <some-observable>;
  nameChange = outputFromObservable(this.nameChange$);
}
```
@see [RxJS interop with component and directive outputs](ecosystem/rxjs-interop/output-interop)

@initializerApiFunction
@publicApi 19.0