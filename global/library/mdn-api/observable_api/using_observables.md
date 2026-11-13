---
title: "Using observables (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable_api/using_observables/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using observables

The Observable API provides a mechanism for handling streams of values, including asynchronous events. This guide explains how to transform, subscribe to, and unsubscribe from existing observables, using browser event streams as examples.

Before proceeding, you may wish to read the Observable API overview to familiarize yourself with the core concepts.

## Obtaining an observable

`Observable` objects (commonly called **observables**) represent a stream of values that can be observed and transformed. The code that supplies these values is the **producer**, and the code that subscribes to receive and use them is the **consumer**. There are three main ways to obtain observables:

- The `EventTarget.when()` method returns an `Observable` representing a stream of events fired on the `EventTarget`. You may also have libraries that return observables.
- You can create your own custom observables using the `Observable()` constructor. See Creating custom observables for more information.
- You can convert objects such as promises and iterables into observables using the static `Observable.from()` method.

On the web, `EventTarget` objects are perhaps the most common use case of observables. The basic idea is this: wherever you have been writing `addEventListener(eventType, handler)`, you can now write `when(eventType).subscribe(handler)` to achieve the same effect. For example, here is how you can listen for `click` events on the document body using `when()`:

```js
document.body.when("click").subscribe((event) => {
  console.log("Clicked!", event);
});
```

This not merely a syntactic difference. Observables let you compose operations such as filtering events, transforming their data, and stopping a stream when another event occurs. Beyond events, you can use the same operations with promises, iterables, and custom streams, such as the timer and element-size notifications examples shown in Creating custom observables.

## Transforming an observable

An observable is a stream of values that you can transform into a new stream. An `Observable` object has several transform methods that resemble what you may already know from `Iterator` or `Array`.

| `Observable` method      | `Iterator` equivalent | Description                                                                                         |
| ------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| `Observable.drop()`      | `Iterator.drop()`     | Skips the first `n` values from the source observable.                                              |
| `Observable.filter()`    | `Iterator.filter()`   | Skips values that don't match a predicate function.                                                 |
| `Observable.flatMap()`   | `Iterator.flatMap()`  | Maps each value to an observable, then flattens the resulting observables into a single observable. |
| `Observable.inspect()`   | N/A                               | Calls callbacks to inspect values and the subscription lifecycle, while allowing further chaining.  |
| `Observable.map()`       | `Iterator.map()`      | Maps each value to a new value using a mapping function.                                            |
| `Observable.switchMap()` | N/A                               | Maps each value to an inner observable and emits values from only the latest inner observable.      |
| `Observable.take()`      | `Iterator.take()`     | Takes only the first `n` values from the source observable.                                         |
| `Observable.takeUntil()` | N/A                               | Like `take()`, but stops when a second observable emits a value.                                    |

These methods can be chained together to apply multiple transformations. You then subscribe to the final observable to receive the transformed values.

In the following example, we print the mouse coordinates to the screen whenever the mouse is moved over a couple of `` elements. We won't show the HTML because it just includes the `` elements plus a single `` element to display the data.

```html
<div></div>
<div></div>
<p></p>
```

In the example CSS, we give the `` elements a `height`, `background-color`, and `margin-bottom`:

```css
div {
  height: 150px;
  background-color: purple;
  margin-bottom: 10px;
}
```

The JavaScript looks like this:

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

In this snippet, the page's `<body>` element is an `EventTarget`. We obtain a stream of `mousemove` events fired on it using the `when()` method.

We then specify a pipeline:

- `Observable.filter()` filters the events passed through the pipeline to only events fired on the `` element (tested using the `Element.matches()` method) and not other `body` descendants.
- `Observable.map()` maps the fired `mousemove` event objects to new objects containing the coordinates of the mouse cursor when the event was fired.

Finally, `Observable.subscribe()` subscribes to the observable. We pass a callback function to the `subscribe()` method. This callback is called each time a `mousemove` event passes the filter.

The rendered output looks like this:

Try moving the mouse over the top of the example; the coordinates are printed to the `` only when the `` elements are moved over, not the areas outside the ``s.

> **Note:**
> Observables are "lazy" — events don't start being passed through them, nor do they queue any data, until they have at least one subscriber. In the previous example, if you remove the `subscribe()` method call and add logs inside the `filter()` and `map()` methods, you will see that they don't log anything. Once `subscribe()` is called at the end of the pipeline, all previous observables in the chain also become subscribed and start processing data.

### Working with inner observables

Some operations produce another stream for each source value: a click might start an upload, or a change to a search field might start a request. These are called _inner observables_. Using `map()` alone would send the inner observable objects to your observer. `Observable.flatMap()` and `Observable.switchMap()` instead subscribe to them and forward their values.

- `flatMap()` processes source values sequentially. It waits for the current inner observable to complete before calling the mapper for the next queued source value. Use this when every operation should finish in order. If an inner observable never completes, later source values remain queued.
- `switchMap()` unsubscribes from the current inner observable when a new source value arrives, then calls the mapper and subscribes to its result. Use this when only the latest operation's results are relevant.

Both methods convert the mapper's result using `Observable.from()`, so the mapper can also return a promise, iterable, or async iterable. A promise contributes its fulfillment value and then completes; a rejection becomes an error in the inner observable. In contrast, `map()` forwards a returned promise as a value without awaiting it.

The following live example searches a small list of fruit names. Type into the search field to start a search; the simulated response takes one second, so you can type again while a previous search is pending. An async mapper lets us treat each search as one operation:

```html
<label>Search fruit: <input type="search" /></label>
<p id="results">Type a fruit name</p>
```

```js
const searchInput = document.querySelector("input[type='search']");
const results = document.querySelector("#results");

async function search(query) {
  const fruits = ["Apple", "Apricot", "Banana", "Cherry", "Pear"];
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fruits.filter((fruit) =>
    fruit.toLowerCase().includes(query.toLowerCase()),
  );
}

const queries = searchInput.when("input").map(() => searchInput.value);

queries.switchMap(search).subscribe({
  next(data) {
    results.textContent = JSON.stringify(data);
  },
  error(error) {
    results.textContent = error.message;
  },
});
```

In a real search app, `search()` could fetch and parse a JSON response instead:

```js
async function search(query) {
  const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }
  return response.json();
}
```

If another input event arrives before the previous search finishes, the previous result is no longer forwarded. However, unsubscribing from an observable created from a promise does not cancel the work behind that promise: the previous request can still finish. To cancel the request itself, return a custom observable that passes `subscriber.signal` to `fetch()`, as shown in Canceling asynchronous work.

### Inspecting a pipeline

`Observable.inspect()` lets you run a side effect, such as logging, while forwarding values unchanged. Unlike `subscribe()`, it returns an observable and does not start the pipeline by itself:

```js
document.body
  .when("click")
  .inspect((event) => console.log("Click:", event.target))
  .map((event) => ({ x: event.clientX, y: event.clientY }))
  .subscribe((point) => console.log("Coordinates:", point));
```

You can also pass an object with `subscribe`, `next`, `error`, `complete`, and `abort` callbacks to inspect the subscription's lifecycle. An `inspect()` callback can affect the pipeline if it throws; for example, an exception in its `next` callback becomes an error in the returned observable.

See the `inspect()` reference for details.

## Aggregating values

The previously introduced group of methods return another observable, allowing you to chain multiple transformations together. You can then subscribe to the final observable to receive the transformed values.

But you don't always want to process each value individually. Sometimes you are just interested in getting a single aggregated value from the entire stream. For this purpose, the Observable API provides the following methods:

| `Observable` method    | `Iterator` equivalent | Description                                                                         |
| ----------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| `Observable.every()`   | `Iterator.every()`    | Returns `false` when the predicate returns `false` for any value; `true` otherwise. |
| `Observable.find()`    | `Iterator.find()`     | Returns the first value that matches a predicate.                                   |
| `Observable.first()`   | N/A                               | Returns the first value from the observable.                                        |
| `Observable.forEach()` | `Iterator.forEach()`  | Calls a function for each value.                                                    |
| `Observable.last()`    | N/A                               | Returns the last value from the observable.                                         |
| `Observable.reduce()`  | `Iterator.reduce()`   | Aggregates the values to a single value.                                            |
| `Observable.some()`    | `Iterator.some()`     | Returns `true` when the predicate returns `true` for any value; `false` otherwise.  |
| `Observable.toArray()` | `Iterator.toArray()`  | Collects all values into an array.                                                  |

All these methods return promises that fulfill with the described results. Depending on the method, the promise fulfills as soon as the result is determined or when the observable completes. It can also reject, for example, if the observable errors or the subscription is aborted.

Unlike the transformation methods, these aggregation methods implicitly subscribe: the pipeline starts receiving values as soon as one of these methods is called.

This example searches for the first mouse position beyond `200` on both axes within a single panel. Until a match is found, it displays the current position (also demonstrating how `inspect()` works). Click Restart after finding a match to try again.

```html
<div id="target">Move the pointer beyond 200,200.</div>
<p></p>
<button disabled>Restart</button>
```

```css
#target {
  height: 300px;
  background-color: lavender;
}
```

```js
const target = document.querySelector("#target");
const outputElem = document.querySelector("p");
const restart = document.querySelector("button");

function start() {
  restart.disabled = true;
  outputElem.textContent = "Move the mouse around...";
  target
    .when("mousemove")
    .map((event) => ({ x: event.offsetX, y: event.offsetY }))
    .inspect(({ x, y }) => {
      outputElem.textContent = `Target of 200,200 not yet reached (current ${x},${y})`;
    })
    .find(({ x, y }) => x > 200 && y > 200)
    .then(({ x, y }) => {
      outputElem.textContent = `Target coordinates found: ${x},${y}`;
      restart.disabled = false;
    });
}

restart.when("click").subscribe(start);
start();
```

The rendered output looks like this:
