# src/internal/types

## UnaryFunction

```ts
export interface UnaryFunction<T, R>
```

A function type interface that describes a function that accepts one parameter `T`
and returns another parameter `R`.

Usually used to describe {@link OperatorFunction} - it always takes a single
parameter (the source Observable) and returns another Observable.

## MonoTypeOperatorFunction

```ts
export interface MonoTypeOperatorFunction<T> extends OperatorFunction<T, T> {}
```

A function type interface that describes a function that accepts and returns a parameter of the same type.

Used to describe {@link OperatorFunction} with the only one type: `OperatorFunction<T, T>`.

## Timestamp

```ts
export interface Timestamp<T>
```

A value and the time at which it was emitted.

Emitted by the `timestamp` operator

@see {@link timestamp}

## Timestamp.timestamp

```ts
timestamp: number
```

The timestamp. By default, this is in epoch milliseconds.
Could vary based on the timestamp provider passed to the operator.

## TimeInterval

```ts
export interface TimeInterval<T>
```

A value emitted and the amount of time since the last value was emitted.

Emitted by the `timeInterval` operator.

@see {@link timeInterval}

## TimeInterval.interval

```ts
interval: number
```

The amount of time between this value's emission and the previous value's emission.
If this is the first emitted value, then it will be the amount of time since subscription
started.

## SubscribableOrPromise

```ts
export type SubscribableOrPromise<T> = Subscribable<T> | Subscribable<never> | PromiseLike<T> | InteropObservable<T>
```

@deprecated Do not use. Most likely you want to use `ObservableInput`. Will be removed in v8.

## Subscribable

```ts
export interface Subscribable<T>
```

OBSERVABLE INTERFACES

## ObservableInput

```ts
export type ObservableInput<T> = | Observable<T> | InteropObservable<T> | AsyncIterable<T> | PromiseLike<T> | ArrayLike<T> | Iterable<T> | ReadableStreamLike<T>
```

Valid types that can be converted to observables.

## ObservableLike

```ts
export type ObservableLike<T> = InteropObservable<T>
```

@deprecated Renamed to {@link InteropObservable }. Will be removed in v8.

## InteropObservable

```ts
export interface InteropObservable<T>
```

An object that implements the `Symbol.observable` interface.

## NextNotification

```ts
export interface NextNotification<T>
```

A notification representing a "next" from an observable.
Can be used with {@link dematerialize}.

## NextNotification.kind

```ts
kind: 'N'
```

The kind of notification. Always "N"

## NextNotification.value

```ts
value: T
```

The value of the notification.

## ErrorNotification

```ts
export interface ErrorNotification
```

A notification representing an "error" from an observable.
Can be used with {@link dematerialize}.

## ErrorNotification.kind

```ts
kind: 'E'
```

The kind of notification. Always "E"

## CompleteNotification

```ts
export interface CompleteNotification
```

A notification representing a "completion" from an observable.
Can be used with {@link dematerialize}.

## ObservableNotification

```ts
export type ObservableNotification<T> = NextNotification<T> | ErrorNotification | CompleteNotification
```

Valid observable notification types.

## Observer

```ts
export interface Observer<T>
```

An object interface that defines a set of callback functions a user can use to get
notified of any set of {@link Observable}
{@link guide/glossary-and-semantics#notification notification} events.

For more info, please refer to {@link guide/observer this guide}.

## Observer.next

```ts
next: (value: T)
```

A callback function that gets called by the producer during the subscription when
the producer "has" the `value`. It won't be called if `error` or `complete` callback
functions have been called, nor after the consumer has unsubscribed.

For more info, please refer to {@link guide/glossary-and-semantics#next this guide}.

## Observer.error

```ts
error: (err: any)
```

A callback function that gets called by the producer if and when it encountered a
problem of any kind. The errored value will be provided through the `err` parameter.
This callback can't be called more than one time, it can't be called if the
`complete` callback function have been called previously, nor it can't be called if
the consumer has unsubscribed.

For more info, please refer to {@link guide/glossary-and-semantics#error this guide}.

## Observer.complete

```ts
complete: ()
```

A callback function that gets called by the producer if and when it has no more
values to provide (by calling `next` callback function). This means that no error
has happened. This callback can't be called more than one time, it can't be called
if the `error` callback function have been called previously, nor it can't be called
if the consumer has unsubscribed.

For more info, please refer to {@link guide/glossary-and-semantics#complete this guide}.

## TimestampProvider

```ts
export interface TimestampProvider
```

This is a type that provides a method to allow RxJS to create a numeric timestamp

## TimestampProvider.now

```ts
now(): number
```

Returns a timestamp as a number.

This is used by types like `ReplaySubject` or operators like `timestamp` to calculate
the amount of time passed between events.

## ObservedValueOf

```ts
export type ObservedValueOf<O> = O extends ObservableInput<infer T> ? T : never
```

Extracts the type from an `ObservableInput<any>`. If you have
`O extends ObservableInput<any>` and you pass in `Observable<number>`, or
`Promise<number>`, etc, it will type as `number`.

## ObservedValueUnionFromArray

```ts
export type ObservedValueUnionFromArray<X> = X extends Array<ObservableInput<infer T>> ? T : never
```

Extracts a union of element types from an `ObservableInput<any>[]`.
If you have `O extends ObservableInput<any>[]` and you pass in
`Observable<string>[]` or `Promise<string>[]` you would get
back a type of `string`.
If you pass in `[Observable<string>, Observable<number>]` you would
get back a type of `string | number`.

## ObservedValuesFromArray

```ts
export type ObservedValuesFromArray<X> = ObservedValueUnionFromArray<X>
```

@deprecated Renamed to {@link ObservedValueUnionFromArray}. Will be removed in v8.

## ObservedValueTupleFromArray

```ts
export type ObservedValueTupleFromArray<X> = { [K in keyof X]: ObservedValueOf<X[K]> }
```

Extracts a tuple of element types from an `ObservableInput<any>[]`.
If you have `O extends ObservableInput<any>[]` and you pass in
`[Observable<string>, Observable<number>]` you would get back a type
of `[string, number]`.

## ObservableInputTuple

```ts
export type ObservableInputTuple<T>
```

Used to infer types from arguments to functions like {@link forkJoin}.
So that you can have `forkJoin([Observable<A>, PromiseLike<B>]): Observable<[A, B]>`
et al.

## Cons

```ts
export type Cons<X, Y extends readonly any[]> = ((arg: X, ...rest: Y)
```

Constructs a new tuple with the specified type at the head.
If you declare `Cons<A, [B, C]>` you will get back `[A, B, C]`.

## Head

```ts
export type Head<X extends readonly any[]> = ((...args: X)
```

Extracts the head of a tuple.
If you declare `Head<[A, B, C]>` you will get back `A`.

## Tail

```ts
export type Tail<X extends readonly any[]> = ((...args: X)
```

Extracts the tail of a tuple.
If you declare `Tail<[A, B, C]>` you will get back `[B, C]`.

## ValueFromArray

```ts
export type ValueFromArray<A extends readonly unknown[]> = A extends Array<infer T> ? T : never
```

Extracts the generic value from an Array type.
If you have `T extends Array<any>`, and pass a `string[]` to it,
`ValueFromArray<T>` will return the actual type of `string`.

## ValueFromNotification

```ts
export type ValueFromNotification<T> = T extends { kind: 'N' | 'E' | 'C' } ? T extends NextNotification<any> ? T extends { value: infer V } ? V : undefined : never : never
```

Gets the value type from an {@link ObservableNotification}, if possible.

## Falsy

```ts
export type Falsy = null | undefined | false | 0 | -0 | 0n | ''
```

A simple type to represent a gamut of "falsy" values... with a notable exception:
`NaN` is "falsy" however, it is not and cannot be typed via TypeScript. See
comments here: https://github.com/microsoft/TypeScript/issues/28682#issuecomment-707142417

## ReadableStreamLike

```ts
export interface ReadableStreamLike<T>
```

The base signature RxJS will look for to identify and use
a [ReadableStream](https://streams.spec.whatwg.org/#rs-class)
as an {@link ObservableInput} source.

## Connectable

```ts
export interface Connectable<T> extends Observable<T>
```

An observable with a `connect` method that is used to create a subscription
to an underlying source, connecting it with all consumers via a multicast.

## Connectable.connect

```ts
connect(): Subscription
```

(Idempotent) Calling this method will connect the underlying source observable to all subscribed consumers
through an underlying {@link Subject}.
@returns A subscription, that when unsubscribed, will "disconnect" the source from the connector subject,
severing notifications to all consumers.