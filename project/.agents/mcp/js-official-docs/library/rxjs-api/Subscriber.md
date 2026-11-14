# src/internal/Subscriber

## Subscriber

```ts
export class Subscriber<T> extends Subscription implements Observer<T>
```

Implements the {@link Observer} interface and extends the
{@link Subscription} class. While the {@link Observer} is the public API for
consuming the values of an {@link Observable}, all Observers get converted to
a Subscriber, in order to provide Subscription-like capabilities such as
`unsubscribe`. Subscriber is a common type in RxJS, and crucial for
implementing operators, but it is rarely used as a public API.

## Subscriber.create

```ts
static create<T>(next?: (x?: T)
```

A static factory for a Subscriber, given a (potentially partial) definition
of an Observer.
@param next The `next` callback of an Observer.
@param error The `error` callback of an
Observer.
@param complete The `complete` callback of an
Observer.
@return A Subscriber wrapping the (partially defined)
Observer represented by the given arguments.
@deprecated Do not use. Will be removed in v8. There is no replacement for this
method, and there is no reason to be creating instances of `Subscriber` directly.
If you have a specific use case, please file an issue.

## Subscriber.isStopped

```ts
protected isStopped: boolean = false
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subscriber.destination

```ts
protected destination: Subscriber<any> | Observer<any>
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.

## Subscriber.constructor

```ts
constructor(destination?: Subscriber<any> | Observer<any>)
```

@deprecated Internal implementation detail, do not use directly. Will be made internal in v8.
There is no reason to directly create an instance of Subscriber. This type is exported for typings reasons.

## Subscriber.next

```ts
next(value: T): void
```

The {@link Observer} callback to receive notifications of type `next` from
the Observable, with a value. The Observable may call this method 0 or more
times.
@param value The `next` value.

## Subscriber.error

```ts
error(err?: any): void
```

The {@link Observer} callback to receive notifications of type `error` from
the Observable, with an attached `Error`. Notifies the Observer that
the Observable has experienced an error condition.
@param err The `error` exception.

## Subscriber.complete

```ts
complete(): void
```

The {@link Observer} callback to receive a valueless notification of type
`complete` from the Observable. Notifies the Observer that the Observable
has finished sending push-based notifications.

## EMPTY_OBSERVER

```ts
export const EMPTY_OBSERVER: Readonly<Observer<any>> & { closed: true }
```

The observer used as a stub for subscriptions where the user did not
pass any arguments to `subscribe`. Comes with the default error handling
behavior.