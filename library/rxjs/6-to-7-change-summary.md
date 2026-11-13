---
title: "RxJS 6.x to 7.x Detailed Change List (part 1 of 2)"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/6-to-7-change-summary.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# RxJS 6.x to 7.x Detailed Change List

This document contains a detailed list of changes between RxJS 6.x and RxJS 7.x, presented in the order they can be found when diffing the TypeScript APIs in various module files.

## module `rxjs`

### Breaking changes

#### AsyncSubject

- `_subscribe` method is no longer `public` and is now `protected`.
- no longer has its own implementation of the `error` method inherited from `Subject`.

#### BehaviorSubject

- `_subscribe` method is no longer `public` and is now `protected`.
- `value` property is a getter `get value()` instead of `readonly value`, and can no longer be forcibly set.

#### bindCallback

- Generic signatures have changed. Do not explicitly pass generics.

#### combineLatest

- Generic signatures have changed. Do not explicitly pass generics.

#### concat

- Generic signatures have changed. Do not explicitly pass generics.

#### ConnectableObservable

- `_isComplete` is no longer a property.
- `_subscribe` method is no longer `public` and is now `protected`.

#### defer

- Generic argument no longer extends `void`.
- `defer` no longer allows factories to return void or undefined. All factories passed to `defer` must return a proper `ObservableInput`, such as `Observable`, `Promise`, et al. To get the same behavior as you may have relied on previously, `return EMPTY` or `return of()` from the factory.

#### forkJoin

- Generic signatures have changed. Do not explicitly pass generics.

#### fromEvent

- The `fromEvent` signatures have been changed and there are now separate signatures for each type of target - DOM, Node, jQuery, etc. That means that an attempt to pass <example-value> - like `{ once: true }` - to a target that does not support an options argument will result in a TypeScript error.

#### GroupedObservable

- No longer publicly exposes `_subscribe`
- `key` properly is `readonly`.
- No longer publicly exposes `constructor`.

#### iif

- Generic signatures have changed. Do not explicitly pass generics.
- `iif` will no longer allow result arguments that are `undefined`. This was a bad call pattern that was likely an error in most cases. If for some reason you are relying on this behavior, simply substitute `EMPTY` in place of the `undefined` argument. This ensures that the behavior was intentional and desired, rather than the result of an accidental `undefined` argument.

#### isObservable

- No longer has a generic and returns `Observable<unknown>`, you must cast the result.

#### merge

- Generic signatures have changed. Do not explicitly pass generics.

#### Notification

- The `error` property is now `readonly`.
- The `hasValue` property is now `readonly`.
- The `kind` property is now `readonly`.
- The `value` property is now `readonly` and may be `undefined`.
- `constructor` signature now only allows valid construction. For example `new Notification('C', 'some_value')` will be an error in TypeScript.

#### Observable

- `_isScalar` property removed.
- `_subscribe` method is no longer `public` and is now marked `@internal`.
- `_trySubscribe` method is no longer `public` and is now `@internal`.
- `pipe` method calls with `9` or more arguments will now return `Observable<unknown>` rather than `Observable<{}>`.
- `toPromise` method now correctly returns `Promise<T | undefined>` instead of `Promise<T>`. This is a correction without a runtime change, because if the observable does not emit a value before completion, the promise will resolve with `undefined`.
- `static if` and `static throw` properties are no longer defined. They were unused in version 6.
- `lift`, `source`, and `operator` properties are still **deprecated**, and should not be used. They are implementation details, and will very likely be renamed or missing in version 8.

#### of

- Generic signatures have changed. Do not explicitly pass generics.

#### onErrorResumeNext

- Generic signatures have changed. Do not explicitly pass generics.

#### pairs

- Generic signatures have changed. Do not explicitly pass generics.
- `pairs` will no longer function in IE without a polyfill for `Object.entries`. `pairs` itself is also deprecated in favor of users just using `from(Object.entries(obj))`.

#### partition

- Generic signatures have changed. Do not explicitly pass generics.

#### pipe

- Calls with `9` or more arguments will now return `(arg: A) => unknown` rather than `(arg: A) => {}`.

#### race

- Generic signatures have changed. Do not explicitly pass generics.
- `race` will no longer subscribe to subsequent observables if a provided source synchronously errors or completes. This means side effects that might have occurred during subscription in those rare cases will no longer occur.

#### ReplaySubject

- `_getNow` method has been removed.
- `_subscribe` method is no longer `public` and is now `protected`.

#### Subscribable

- `subscribe` will accept `Partial<Observer<T>>` now. All overloads with functions as arguments have been removed. This is because `Subscribable` is intended to map to the basic <example-value> contract from the TC39 proposal and the return type of a call to `Symbol.observable`.

#### SubscribableOrPromise

- See notes on `Subscribable` above.

#### Subscriber

- `destination` property must now be a `Subscriber` or full `Observer`.
- `syncErrorThrowable` property has been removed.
- `syncErrorThrown` property has been removed.
- `syncErrorValue` property has been removed.
- `_unsubscribeAndRecycle` method has been removed.

#### Subscription

- `_parentOrParents` property has been removed.
- `add` method returns `void` and no longer returns a `Subscription`. Returning `Subscription` was an old behavior from the early days of version 5. If you add a function to a subscription (i.e. `subscription.add(fn)`), you can remove that function directly by calling `remove` with the same function instance. (i.e. `subscription.remove(fn)`). Previously, you needed to get the returned `Subscription` object and pass <example-value> to `remove`. In version 6 and lower, the `Subscription` returned by calling `add` with another `Subscription` was always the same subscription you passed in. (meaning `subscription.add(subs1).add(subs2)` was an antipattern and the same as `subscription.add(subs1); subs1.add(subs2);`.

#### VirtualAction

- The static `sortActions` method has been removed.

#### zip

- Generic signatures have changed. Do not explicitly pass generics.
- Zipping a single array will now have a different result. This is an extreme corner-case, because it is very unlikely that anyone would want to zip an array with nothing at all. The workaround would be to wrap the array in another array `zip([[1,2,3]])`. But again, that's pretty weird.

---

### New Features

#### animationFrames

- A new method for creating a stream of animation frames. Each event will carry with it a high-resolution timestamp, and an elapsed time since observation was started.

#### config

##### onUnhandledError

- A handler for dealing with errors that make it all the way down to the "end" of the observation chain when there is no error handler in the observer. Useful for doing things like logging unhandled errors in RxJS observable chains.

##### onStoppedNotification

- A handler for edge cases where a subscriber within RxJS is notified after it has already "stopped", that is, a point in time where it has received an error or complete, but hasn't yet finalized. This is mostly useful for logging purposes.

##### useDeprecatedNextContext

- In RxJS 6, a little-used feature allowed users to access the `subscriber` directly as `this` within a call to the `next` handler. The problem with this is it incurred heavy performance penalties. That behavior has been changed (because it wasn't really documented and it was barely ever used) to not change the `this` context of any user-provided subscription handlers. If you need to get that feature back, you can switch it on with this flag. Note this behavior will be removed completely in version 8.

#### connectable

- This is the new means for creating a `ConnectableObservable`, and really is a replacement for non-selector usage of `multicast` and `publish` variants. Simply pass your source observable to `connectable` with the `Subject` you'd like to connect through.

#### firstValueFrom

- A better, more tree-shakable replacement for `toPromise()` (which is now deprecated). This function allows the user to convert any `Observable` into a `Promise` that will resolve when the source observable emits its first value. If the source observable closes without emitting a value, the returned promise will reject with an `EmptyError`, or it will resolve with a configured `defaultValue`. For more information, see the deprecation guide.

#### lastValueFrom

- A better, more tree-shakable replacement for `toPromise()` (which is now deprecated). This function allows the user to convert any `Observable` in to a `Promise` that will resolve when the source observable emits the last value. If the source observable closes without emitting a value, the returned promise will reject with an `EmptyError`, or it will resolve with a configured `defaultValue`. For more information, see the deprecation guide.

#### ObservableInput

- This is just a type, but it's important. This type defines the allowed types that can be passed to almost every API within RxJS that accepts an Observable. It has always accepted `Observable`, `Promise`, `Iterable`, and `ArrayLike`. Now it will also accept `AsyncIterable` and `ReadableStream`.

##### AsyncIterable

- `AsyncIterables` such as those defined by `IxJS` or by async generators (`async function*`), may now be passed to any API that accepts an observable, and can be converted to an `Observable` directly using `from`.

##### ReadableStream

- `ReadableStream` such as those returned by `fetch`, et al, can be passed to any API that accepts an observable, and can be converted to `Observable` directly using `from`.

#### ReplaySubject

- A bug was fixed that prevented a completed or errored `ReplaySubject` from accumulating values in its buffer when resubscribed to another source. This breaks some uses - like this StackOverflow answer - that depended upon the buggy behavior.

#### Subscription

- Now allows adding and removing of functions directly via `add` and `remove` methods.

#### throwError

- Now accepts an `errorFactory` of `() => any` to defer the creation of the error until the time it will be emitted. It is recommended to use this method, as Errors created in most popular JavaScript runtimes will retain all values in the current scope for debugging purposes.
