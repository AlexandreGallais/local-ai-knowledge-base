# src/internal/Subject

## Subject

```ts
export class Subject<T> extends Observable<T> implements SubscriptionLike
```

A Subject is a special type of Observable that allows values to be
multicasted to many Observers. Subjects are like EventEmitters.

Every Subject is an Observable and an Observer. You can subscribe to a
Subject, and you can call next to feed values as well as error and complete.

## Subject.observers

```ts
observers: Observer<T>[] = []
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subject.isStopped

```ts
isStopped = false
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subject.hasError

```ts
hasError = false
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subject.thrownError

```ts
thrownError: any = null
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subject.create

```ts
static create: (...args: any[])
```

Creates a "subject" by basically gluing an observer to an observable.

@deprecated Recommended you do not use. Will be removed at some point in the future. Plans for replacement still under discussion.

## Subject.lift

```ts
lift<R>(operator: Operator<T, R>): Observable<R>
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subject.asObservable

```ts
asObservable(): Observable<T>
```

Creates a new Observable with this Subject as the source. You can do this
to create custom Observer-side logic of the Subject and conceal it from
code that uses the Observable.
@return Observable that this Subject casts to.

## Subject.destination

```ts
public destination?: Observer<T>, source?: Observable<T> )
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.