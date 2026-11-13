---
title: "Using observables (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable_api/using_observables/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using observables (part 2 of 3)

## Subscribing to an observable

We already showed basic `subscribe()` usage in the previous sections, but let's look at it in a bit more detail.

Just like a promise can send notifications either as "fulfilled" or "rejected", an observable can also send multiple types of notifications to its subscribers, each one corresponding to a different method you can pass into `subscribe()`.

- `next(value)`: Called whenever a new value is available in the observable stream. In the examples above, we passed a single function into `subscribe()`, which is shorthand for passing an object with just a `next()` method.
- `error(err)`: Called when the observable signals an error. Exceptions thrown by the observer's own callbacks are reported as uncaught errors to the global object instead of passed to this `error()` callback.
- `complete()`: Called when the observable has finished sending values. We'll discuss this more in the Creating custom observables guide. Event streams are infinite, but can be made finite by calling `take()` or `takeUntil()`.

For example, this observable completes after three clicks and logs a completion message:

```js
document.body
  .when("click")
  .take(3)
  .subscribe({
    next(event) {
      console.log("Clicked at", event.clientX, event.clientY);
    },
    complete() {
      console.log("Observable complete");
    },
  });
```

Internally, each active observable subscription has a list of _observers_ — objects containing zero or more of these three callbacks. You can call `subscribe()` multiple times on the same observable to register multiple observers. For example:

```js
const clickObservable = document.body.when("click");

clickObservable.subscribe((e) => {
  console.log("Observer 1: Clicked at", e.clientX, e.clientY);
});
clickObservable.subscribe((e) => {
  console.log("Observer 2: Clicked at", e.clientX, e.clientY);
});

// For every click, both observers will be called
```

Concurrent observers share the subscription, and each receives values emitted while it is subscribed; previously emitted values are not replayed to new observers. This differs from sharing an iterator, where each consumer's `next()` call advances the same iterator rather than broadcasting a value to all consumers.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.
>
> For this particular example, the behavior would be the same, but each `subscribe()` call will register a new `click` event listener instead of reusing the same event listener.

## Unsubscribing from an observable

An observer can also be unsubscribed from the observable, which means its callbacks will no longer be called. If an observable has no more observers, its shared subscription becomes inactive, and it runs callbacks known as _teardown callbacks_. These callbacks release resources, such as the event listener registered by `when()`. Custom observables must implement this cleanup themselves, as described in Creating custom observables.

The canonical way to unsubscribe from an observable is to use an `AbortController`. With this method, you can unsubscribe mid-way through observable data processing, at any point you like. To do this, you create an `AbortController` and pass its `signal` when you call `subscribe()`. You can then call `AbortController.abort()` on the controller, which unsubscribes all observers associated with that signal.

For example, we can modify our earlier Basic `when()` example to unsubscribe when the user clicks anywhere on the page. This means the output will stop updating. Click Restart to start a new subscription.

```html
<button disabled>Restart</button>
```

```js
const outputElem = document.querySelector("p");
const restart = document.querySelector("button");

function start() {
  restart.disabled = true;
  outputElem.textContent = "Move the mouse over a purple area";
  // Create controller
  const controller = new AbortController();

  document.body
    .when("mousemove")
    .filter((e) => e.target.matches("div"))
    .map((e) => ({ x: e.clientX, y: e.clientY }))
    .subscribe(
      (p) => {
        outputElem.textContent = `${p.x},${p.y}`;
      },
      // Register observer with signal
      { signal: controller.signal },
    );

  document.body
    .when("click")
    .filter((event) => event.target !== restart)
    .take(1)
    .subscribe(() => {
      // Unsubscribe on click
      controller.abort();
      outputElem.textContent += " — Stopped. Click Restart to try again.";
      restart.disabled = false;
    });
}

restart.when("click").subscribe(start);
start();
```

The `take(1)` call completes the click stream after the first click, removing its event listener. This is similar to using `{ once: true }` with `addEventListener()`.

In the next example, another observable emits a value to trigger the abort condition: `document.body.when("click")`. The `takeUntil()` method is a transformation method and therefore returns an observable. This means you can insert it in the pipeline to specify a condition under which the unsubscribe action occurs. The following code achieves the same effect as the previous example:

```js
const outputElem = document.querySelector("p");

document.body
  .when("mousemove")
  .filter((e) => e.target.matches("div"))
  .map((e) => ({ x: e.clientX, y: e.clientY }))
  // When the click event fires, unsubscribe
  .takeUntil(document.body.when("click"))
  .subscribe((p) => {
    outputElem.textContent = `${p.x},${p.y}`;
  });
```

> **Note:**
> The `takeUntil()` method converts its input to an observable. You can pass a promise to stop when it fulfills, or sync/async iterables for when they produce the first value, if any. Check `Observable.from()` for how it does the conversion.

An `AbortController` lets you unsubscribe at any point in your code. Separate controllers let you unsubscribe observers independently. Aborting does not call the observer's `complete` callback. In contrast, `takeUntil()` completes the observable it returns and notifies that observable's observers through their `complete` callbacks. Other observers subscribed directly to the source observable remain subscribed.

## Handling errors

An error ends the affected subscription. Errors from a source propagate through the pipeline, and exceptions thrown by transformation callbacks, such as a `map()` mapper or `filter()` predicate, become errors in the returned observable. An observer's `error` callback reports or handles the failure, but does not resume the subscription. If the observer has no `error` callback, the error is reported as an uncaught error to the global object.

`Observable.catch()` lets a pipeline recover by subscribing to a replacement stream. Its callback receives the error and returns an observable, or any value convertible by `Observable.from()`. For example, returning `[]` completes the replacement without emitting a value. It does not retry the failed source.

Placement matters for inner observables. In the search example, a failure in the current request ends the search subscription, so subsequent input events no longer start searches. We can replace that subscription code with the following to recover from failures while the inner subscription is active:

```js
queries
  .switchMap((query) =>
    Observable.from(search(query)).catch((error) => {
      results.textContent = error.message;
      return [];
    }),
  )
  .subscribe((data) => {
    results.textContent = JSON.stringify(data);
  });
```

Here, `catch()` handles only the inner request's failure. Its empty replacement completes, while the outer subscription continues listening for input. Placing `catch()` after `switchMap()` would instead replace the entire search pipeline: returning `[]` there would complete it and stop listening for input.

```js
queries
  .switchMap(search)
  .catch((error) => {
    results.textContent = error.message;
    return [];
  })
  .subscribe({
    next(data) {
      results.textContent = JSON.stringify(data);
    },
    complete() {
      console.log("Search pipeline ended");
    },
  });
```

The same distinction applies to `flatMap()`.

This does not handle failures from requests that `switchMap()` has already unsubscribed from. If such a request's promise later rejects, `Observable.from()` reports the error to the global object because its subscriber is inactive; the `catch()` callback is no longer subscribed. To cancel obsolete requests and avoid reporting their cancellation as an error, use the custom `fetchJSON()` producer in Canceling asynchronous work, which checks `subscriber.active` before forwarding a rejection.

Exceptions thrown by callbacks passed to `subscribe()` are different: they are reported to the global object, rather than becoming errors that a pipeline's `catch()` can recover from. Similarly, an async `next` callback's returned promise is not awaited; handle its rejections yourself, or use `flatMap()` or `switchMap()` to incorporate the asynchronous work into the pipeline.

For example, a pipeline's `catch()` does not handle an exception thrown by its observer:

```js
Observable.from([1, 2, 3])
  .catch(() => [0])
  .subscribe(() => {
    throw new Error("Reported as an uncaught error on window");
  });
```

If an observer has foreseeable error conditions, handle its failure explicitly:

```js
queries.subscribe(async (query) => {
  try {
    results.textContent = JSON.stringify(await search(query));
  } catch (error) {
    results.textContent = error.message;
  }
});
```

Unlike the `switchMap()` version, this version handles failures, but does not discard outdated results.

### Running cleanup

`Observable.finally()` returns an observable that forwards the source's values and notifications, and runs a callback when its subscription ends through completion, error, or unsubscribing. This makes it useful for cleanup that a `complete` callback alone would miss:

```js
document.body
  .when("click")
  .take(3)
  .finally(() => console.log("Stopped observing clicks"))
  .subscribe((event) => console.log(event.target));
```

In the previous snippet, the `finally()` callback runs after the subscription ends (after three clicks, as specified by `take(3)`). It will also run if the subscription is aborted early. It does not await a returned promise. Use `finally()` to attach cleanup when composing a pipeline; use `addTeardown()` to implement the producer's own resource cleanup, as described in Creating custom observables.
