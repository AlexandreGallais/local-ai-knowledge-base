---
title: "Observable"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable

The **`Observable`** interface of the Observable API represents a stream of values that can be subscribed to.

`Observable` objects (commonly called **observables**) can be thought of as more powerful event listeners that integrate with `EventTarget`. They improve event handling code in a similar way to how promises improved on callbacks, simplifying code by reducing the need for nested blocks.

Observables have several methods that return a new observable, and these methods can be chained together to create a pipeline to precisely control the stream of values as desired.

There are three main ways to obtain observables:

- The `EventTarget.when()` method returns an `Observable` representing a stream of events fired on the `EventTarget`. You may also have libraries that return observables.
- You can create your own custom observables using the `Observable()` constructor.
- You can convert objects such as promises and iterables into observables using the static `Observable.from()` method.

## Constructor

- `Observable()` (experimental)
    Creates a new `Observable` object instance.

## Static methods

- `from()` (experimental)
    Returns an observable converted from a promise, iterable, or async iterable, or returns an existing observable unchanged.

## Instance methods

- `subscribe()` (experimental)
    Subscribes to a value stream, most commonly a stream of events.

### Observable-returning instance methods

- `catch()` (experimental)
    Returns a new observable that replaces an error from the source observable with values from another observable.
- `drop()` (experimental)
    Returns a new observable that skips the given number of values at the start of the source observable.
- `filter()` (experimental)
    Returns a new observable that emits only those values of the source observable for which the provided callback function returns a truthy value.
- `finally()` (experimental)
    Returns a new observable that mirrors the source observable and calls a callback when its subscription ends.
- `flatMap()` (experimental)
    Returns a new observable that maps each value of the source observable to an inner observable and emits the inner observables' values sequentially.
- `inspect()` (experimental)
    Returns a new observable that mirrors the source observable and calls callbacks to inspect its values and subscription lifecycle.
- `map()` (experimental)
    Returns a new observable that emits the values of the source observable, each transformed by a mapping function.
- `switchMap()` (experimental)
    Returns a new observable that maps each value of the source observable to an inner observable and emits values from only the latest inner observable.
- `take()` (experimental)
    Returns a new observable that emits the given number of values from the start of the source observable and then completes.
- `takeUntil()` (experimental)
    Returns a new observable that emits values from the source observable until another observable emits a value or errors.

### Promise-returning instance methods

- `every()` (experimental)
    Returns a promise that fulfills with a boolean indicating whether every value emitted by the source observable satisfies the provided testing function.
- `find()` (experimental)
    Returns a promise that fulfills with the first value emitted by the source observable that satisfies the provided testing function, or `undefined` if the source completes without a match.
- `first()` (experimental)
    Returns a promise that fulfills with the first value emitted by the source observable.
- `forEach()` (experimental)
    Returns a promise that fulfills with `undefined` when the source observable completes, after executing a callback for each emitted value.
- `last()` (experimental)
    Returns a promise that fulfills with the last value emitted by the source observable.
- `reduce()` (experimental)
    Returns a promise that fulfills with a single value obtained by combining the source observable's values using a reducer function.
- `some()` (experimental)
    Returns a promise that fulfills with a boolean indicating whether any value emitted by the source observable satisfies the provided testing function.
- `toArray()` (experimental)
    Returns a promise that fulfills with a new array containing the source observable's values in the order they were emitted.

## Examples

### Obtaining an observable from an EventTarget

This example displays the mouse coordinates in a `` element only when the pointer moves over a `` element. The pipeline filters the body's `mousemove` events by their target and extracts the coordinates. For the page setup, see Transforming an observable.

```js
const outputElem = document.querySelector("p");

document.body
  .when("mousemove")
  .filter((e) => e.target.matches("div"))
  .map((e) => ({ x: e.clientX, y: e.clientY }))
  .subscribe((p) => {
    outputElem.textContent = `${p.x},${p.y}`;
  });
```

For more working examples, see Using observables.

### Creating a custom observable

This function creates an observable that emits an increasing count at a specified interval. It completes on the interval after the requested number of values has been emitted. The teardown callback clears the interval when the subscription ends, including when all observers unsubscribe. For a button-driven counter using this producer, see Teardown.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

```js
function makeTimer(timerInterval, iterations = Infinity) {
  return new Observable((subscriber) => {
    let i = 1;
    const interval = setInterval(() => {
      if (i === iterations + 1) {
        subscriber.complete();
      } else {
        subscriber.next(i);
      }
      i++;
    }, timerInterval);
    subscriber.addTeardown(() => {
      clearInterval(interval);
    });
  });
}
```

For more working examples, see Creating custom observables.

## See also

- Using observables
- Creating custom observables
- Observable explainer
