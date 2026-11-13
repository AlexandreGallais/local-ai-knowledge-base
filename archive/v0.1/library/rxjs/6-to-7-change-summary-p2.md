---
title: "RxJS 6.x to 7.x Detailed Change List (part 2 of 2)"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/6-to-7-change-summary.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# RxJS 6.x to 7.x Detailed Change List (part 2 of 2)

## module `rxjs/operators`

### Breaking Changes

#### audit

- The observable returned by the `audit` operator's duration selector must emit a next notification to end the duration. Complete notifications no longer end the duration.
- `audit` now emits the last value from the source when the source completes. Previously, `audit` would mirror the completion without emitting the value.

#### auditTime

- `auditTime` now emits the last value from the source when the source completes, after the audit duration elapses. Previously, `auditTime` would mirror the completion without emitting the value and without waiting for the audit duration to elapse.

#### buffer

- `buffer` now subscribes to the source observable before it subscribes to the closing notifier. Previously, it subscribed to the closing notifier first.
- Final buffered values will now always be emitted. To get the same behavior as the previous release, you can use `endWith` and `skipLast(1)`, like so: `source$.pipe(buffer(notifier$.pipe(endWith(true))), skipLast(1))`
- `closingNotifier` completion no longer completes the result of `buffer`. If that is truly a desired behavior, then you should use `takeUntil`. Something like: `source$.pipe(buffer(notifier$), takeUntil(notifier$.pipe(ignoreElements(), endWith(true))))`, where `notifier$` is multicast, although there are many ways to compose this behavior.

#### bufferToggle

- The observable returned by the `bufferToggle` operator's closing selector must emit a next notification to close the buffer. Complete notifications no longer close the buffer.

#### bufferWhen

- The observable returned by the `bufferWhen` operator's closing selector must emit a next notification to close the buffer. Complete notifications no longer close the buffer.

#### combineLatest

- Generic signatures have changed. Do not explicitly pass generics.

#### concat

- Generic signatures have changed. Do not explicitly pass generics.
- Still deprecated, use the new `concatWith`.

#### concatAll

- Generic signatures have changed. Do not explicitly pass generics.

#### concatMapTo

- Generic signatures have changed. Do not explicitly pass generics.

#### count

- No longer passes `source` observable as a third argument to the predicate. That feature was rarely used, and of limited value. The workaround is to simply close over the source inside of the function if you need to access it in there.

#### debounce

- The observable returned by the `debounce` operator's duration selector must emit a next notification to end the duration. Complete notifications no longer end the duration.

#### debounceTime

- The `debounceTime` implementation is more efficient and no longer schedules an action for each received next notification. However, because the implementation now uses the scheduler's concept of time, any tests using Jasmine's `clock` will need to ensure that `jasmine.clock().mockDate()` is called after `jasmine.clock().install()` - because Jasmine does not mock `Date.now()` by default.

#### defaultIfEmpty

- Generic signatures have changed. Do not explicitly pass generics.
- `defaultIfEmpty` requires a value be passed. Will no longer convert `undefined` to `null` for no good reason.

#### delayWhen

- `delayWhen` will no longer emit if the duration selector simply completes without a value. Notifiers must notify with a value, not a completion.

#### endWith

- Generic signatures have changed. Do not explicitly pass generics.

#### expand

- Generic signatures have changed. Do not explicitly pass generics.

#### finalize

- `finalize` will now unsubscribe from its source _before_ it calls its callback. That means that `finalize` callbacks will run in the order in which they occur in the pipeline: `source.pipe(finalize(() => console.log(1)), finalize(() => console.log(2)))` will log `1` and then `2`. Previously, callbacks were called in the reverse order.

#### map

- `thisArg` will now default to `undefined`. The previous default of `MapSubscriber` never made any sense. This will only affect code that calls map with a `function` and references `this` like so: `source.pipe(map(function () { console.log(this); }))`. There wasn't anything useful about doing this, so the breakage is expected to be very minimal. If anything we're no longer leaking an implementation detail.

#### merge

- Generic signatures have changed. Do not explicitly pass generics.
- Still deprecated, use the new `mergeWith`.

#### mergeAll

- Generic signatures have changed. Do not explicitly pass generics.

#### mergeScan

- `mergeScan` will no longer emit its inner state again upon completion.

#### pluck

- Generic signatures have changed. Do not explicitly pass generics.

#### race

- Generic signatures have changed. Do not explicitly pass generics.

#### reduce

- Generic signatures have changed. Do not explicitly pass generics.

#### sample

- The `sample` operator's notifier observable must emit a next notification to effect a sample. Complete notifications no longer effect a sample.

#### scan

- Generic signatures have changed. Do not explicitly pass generics.

#### single

- The `single` operator will now throw for scenarios where values coming in are either not present, or do not match the provided predicate. Error types have thrown have also been updated, please check documentation for changes.

#### skipLast

- `skipLast` will no longer error when passed a negative number, rather it will simply return the source, as though `0` was passed.

#### startWith

- Generic signatures have changed. Do not explicitly pass generics.

#### switchAll

- Generic signatures have changed. Do not explicitly pass generics.

#### switchMapTo

- Generic signatures have changed. Do not explicitly pass generics.

#### take

- `take` and will now throw runtime error for arguments that are negative or NaN, this includes non-TS calls like `take()`.

#### takeLast

- `takeLast` now has runtime assertions that throw `TypeError`s for invalid arguments. Calling `takeLast` without arguments or with an argument that is `NaN` will throw a `TypeError`.

#### throttle

- The observable returned by the `throttle` operator's duration selector must emit a next notification to end the duration. Complete notifications no longer end the duration.

#### throwError

- In an extreme corner case for usage, `throwError` is no longer able to emit a function as an error directly. If you need to push a function as an error, you will have to use the factory function to return the function like so: `throwError(() => functionToEmit)`, in other words `throwError(() => () => console.log('called later'))`.

#### window

- The `windowBoundaries` observable no longer completes the result. It was only ever meant to notify of the window boundary. To get the same behavior as the old behavior, you would need to add an `endWith` and a `skipLast(1)` like so: `source$.pipe(window(notifier$.pipe(endWith(true))), skipLast(1))`.

#### windowToggle

- The observable returned by the `windowToggle` operator's closing selector must emit a next notification to close the window. Complete notifications no longer close the window.

#### withLatestFrom

- Generic signatures have changed. Do not explicitly pass generics.

#### zip

- Generic signatures have changed. Do not explicitly pass generics.
- Still deprecated, use the new `zipWith`.
- `zip` operators will no longer iterate provided iterables "as needed", instead the iterables will be treated as push-streams just like they would be everywhere else in RxJS. This means that passing an endless iterable will result in the thread locking up, as it will endlessly try to read from that iterable. This puts us in line with all other Rx implementations. To work around this, it is probably best to use `map` or some combination of `map` and `zip`. For example, `zip(source$, iterator)` could be `source$.pipe(map(value => [value, iterator.next().value]))`.

### New Features

#### connect

- New operator to cover the use cases of `publish` variants that use a `selector`. Wherein the selector allows the user to define multicast behavior prior to connection to the source observable for the multicast.

#### share

- Added functionality to allow complete configuration of what type of `Subject` is used to multicast, and when that subject is reset.

#### timeout

- Added more configuration options to `timeout`, so it could be used to timeout just if the first item doesn't arrive quickly enough, or it could be used as a timeout between each item. Users may also pass a `Date` object to define an absolute time for a timeout for the first time to arrive. Adds additional information to the timeout error, and the ability to pass along metadata with the timeout for identification purposes.

#### zipWith, concatWith, mergeWith, raceWith

- Simply renamed versions of the operators `zip`, `concat`, `merge`, and `race`. So we can deprecate those old names and use the new names without collisions.

## module `rxjs/ajax`

### Breaking Changes

#### ajax

- `ajax` body serialization will now use default XHR behavior in all cases. If the body is a `Blob`, `ArrayBuffer`, any array buffer view (like a byte sequence, e.g. `Uint8Array`, etc), `FormData`, `URLSearchParams`, `string`, or `ReadableStream`, default handling is used. If the `body` is otherwise `typeof` `"object"`, then it will be converted to JSON via `JSON.stringify`, and the `Content-Type` header will be set to `application/json;charset=utf-8`. All other types will emit an error.
- The `Content-Type` header passed to `ajax` configuration no longer has any effect on the serialization behavior of the AJAX request.
- For TypeScript users, `AjaxRequest` is no longer the type that should be explicitly used to create an `ajax`. It is now `AjaxConfig`, although the two types are compatible, only `AjaxConfig` has `progressSubscriber` and `createXHR`.
- Ajax implementation drops support for IE10 and lower. This puts us in line with other implementations and helps clean up code in this area

#### AjaxRequest

- `AjaxRequest` is no longer used to type the configuration argument for calls to `ajax`. The new type is `AjaxConfig`. This was done to disambiguate two very similar types with different use cases. `AjaxRequest` is still there, but properties have changed, and it is used to show what final request information was sent as part of an event response.

### New Features

#### AjaxResponse

- Now includes `responseHeaders`.
- Now includes event `type` and `total` numbers for examining upload and download progress (see `includeUploadProgress` and `includeDownloadProgress`).

#### includeUploadProgress

- A flag to make a request that will include streaming upload progress events in the returned observable.

#### includeDownloadProgress

- A flag to make a request that will include streaming upload progress events in the returned observable.

#### queryParams

- Configuration for setting query parameters in the URL of the request to be made.

#### XSRF (CSRF) additions:

- `xsrfCookieName` and `xsrfHeaderName` were added for cross-site request forgery prevention capabilities.

## module `rxjs/fetch`

No changes.

## module `rxjs/testing`

### New Features

#### TestScheduler expectObservable().toEqual()

- A new means of comparing the equality of to observables. If all emissions are the same, and at the same time, then they are equal. This is primarily useful for refactoring operator chains and making sure that they are equivalent.
