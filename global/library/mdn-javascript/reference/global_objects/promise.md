---
title: "Promise (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/promise/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Promise

The **`Promise`** object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

To learn about the way promises work and how you can use them, we advise you to read Using promises first.

## Description

A `Promise` is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a _promise_ to supply the value at some point in the future.

A `Promise` is in one of these states:

- _pending_: initial state, neither fulfilled nor rejected.
- _fulfilled_: meaning that the operation was completed successfully.
- _rejected_: meaning that the operation failed.

The _eventual state_ of a pending promise can either be _fulfilled_ with a value or _rejected_ with a reason (error).
When either of these options occurs, the associated handlers queued up by a promise's `then` method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

A promise is said to be _settled_ if it is either fulfilled or rejected, but not pending.

You will also hear the term _resolved_ used with promises — this means that the promise is settled or "locked-in" to match the eventual state of another promise, and further resolving or rejecting it has no effect. The States and fates document from the original Promise proposal contains more details about promise terminology. Colloquially, "resolved" promises are often equivalent to "fulfilled" promises, but as illustrated in "States and fates", resolved promises can be pending or rejected as well. For example:

```js
new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000);
    }),
  );
});
```

This promise is already _resolved_ at the time when it's created (because the `resolveOuter` is called synchronously), but it is resolved with another promise, and therefore won't be _fulfilled_ until 1 second later, when the inner promise fulfills. In practice, the "resolution" is often done behind the scenes and not observable, and only its fulfillment or rejection are.

> **Note:**
> Several other languages have mechanisms for lazy evaluation and deferring a computation, which they also call "promises", e.g., Scheme. Promises in JavaScript represent processes that are already happening, which can be chained with callback functions. If you are looking to lazily evaluate an expression, consider using a function with no arguments e.g., `f = () => expression` to create the lazily-evaluated expression, and `f()` to evaluate the expression immediately.

`Promise` itself has no first-class protocol for cancellation, but you may be able to directly cancel the underlying asynchronous operation, typically using `AbortController`.

### Chained Promises

The promise methods `then()`, `catch()`, and `finally()` are used to associate further action with a promise that becomes settled. The `then()` method takes up to two arguments; the first argument is a callback function for the fulfilled case of the promise, and the second argument is a callback function for the rejected case. The `catch()` and `finally()` methods call `then()` internally and make error handling less verbose. For example, a `catch()` is really just a `then()` without passing the fulfillment handler. As these methods return promises, they can be chained. For example:

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC);
```

We will use the following terminology: _initial promise_ is the promise on which `then` is called; _new promise_ is the promise returned by `then`. The two callbacks passed to `then` are called _fulfillment handler_ and _rejection handler_, respectively.

The settled state of the initial promise determines which handler to execute.

- If the initial promise is fulfilled, the fulfillment handler is called with the fulfillment value.
- If the initial promise is rejected, the rejection handler is called with the rejection reason.

The completion of the handler determines the settled state of the new promise.

- If the handler returns a thenable value, the new promise settles in the same state as the returned value.
- If the handler returns a non-thenable value, the new promise is fulfilled with the returned value.
- If the handler throws an error, the new promise is rejected with the thrown error.
- If the initial promise has no corresponding handler attached, the new promise will settle to the same state as the initial promise — that is, without a rejection handler, a rejected promise stays rejected with the same reason.

For example, in the code above, if `myPromise` rejects, `handleRejectedA` will be called, and if `handleRejectedA` completes normally (without throwing or returning a rejected promise), the promise returned by the first `then` will be fulfilled instead of staying rejected. Therefore, if an error must be handled immediately, but we want to maintain the error state down the chain, we must throw an error of some type in the rejection handler. On the other hand, in the absence of an immediate need, we can leave out error handling until the final `catch()` handler.

```js
myPromise
  .then(handleFulfilledA)
  .then(handleFulfilledB)
  .then(handleFulfilledC)
  .catch(handleRejectedAny);
```

Using arrow functions for the callback functions, implementation of the promise chain might look something like this:

```js
myPromise
  .then((value) => `${value} and bar`)
  .then((value) => `${value} and bar again`)
  .then((value) => `${value} and again`)
  .then((value) => `${value} and again`)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err);
  });
```

> **Note:**
> For faster execution, all synchronous actions should preferably be done within one handler, otherwise it would take several ticks to execute all handlers in sequence.

JavaScript maintains a job queue. Each time, JavaScript picks a job from the queue and executes it to completion. The jobs are defined by the executor of the `Promise()` constructor, the handlers passed to `then`, or any platform API that returns a promise. The promises in a chain represent the dependency relationship between these jobs. When a promise settles, the respective handlers associated with it are added to the back of the job queue.

A promise can participate in more than one chain. For the following code, the fulfillment of `promiseA` will cause both `handleFulfilled1` and `handleFulfilled2` to be added to the job queue. Because `handleFulfilled1` is registered first, it will be invoked first.

```js
const promiseA = new Promise(myExecutorFunc);
const promiseB = promiseA.then(handleFulfilled1, handleRejected1);
const promiseC = promiseA.then(handleFulfilled2, handleRejected2);
```

An action can be assigned to an already settled promise. In this case, the action is added immediately to the back of the job queue and will be performed when all existing jobs are completed. Therefore, an action for an already "settled" promise will occur only after the current synchronous code completes and at least one loop-tick has passed. This guarantees that promise actions are asynchronous.

```js
const promiseA = new Promise((resolve, reject) => {
  resolve(777);
});
// At this point, "promiseA" is already settled.
promiseA.then((val) => console.log("asynchronous logging has val:", val));
console.log("immediate logging");

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777
```

### Thenables

The JavaScript ecosystem had made multiple Promise implementations long before it became part of the language. Despite being represented differently internally, at the minimum, all Promise-like objects implement the _Thenable_ interface. A thenable implements the `.then()` method, which is called with two callbacks: one for when the promise is fulfilled, one for when it's rejected. Promises are thenables as well.

To interoperate with the existing Promise implementations, the language allows using thenables in place of promises. For example, `Promise.resolve` will not only resolve promises, but also trace thenables.

```js
// This is not a Promises/A+ compliant thenable! It calls onFulfilled
// synchronously. For demonstration only.
const thenable = {
  then(onFulfilled, onRejected) {
    onFulfilled({
      // The thenable is fulfilled with another thenable
      then(onFulfilled, onRejected) {
        onFulfilled(42);
      },
    });
  },
};

Promise.resolve(thenable); // A promise fulfilled with 42
```

The `then()` method is responsible for scheduling the execution of the provided `onFulfilled` and `onRejected` callbacks. Its semantics, including error handling and asynchronicity, are precisely defined in the Promises/A+ specification, and we shall not repeat them here. It's very rare that you need to implement a thenable yourself; even if you are not using native promises, you would probably be using a Promise library such as Bluebird.

### Promise concurrency

The `Promise` class offers four main static methods to facilitate async task concurrency:

- `Promise.all()`
    Fulfills when **all** of the promises fulfill; rejects when **any** of the promises rejects.
- `Promise.allSettled()`
    Fulfills when **all** promises settle.
- `Promise.any()`
    Fulfills when **any** of the promises fulfills; rejects when **all** of the promises reject.
- `Promise.race()`
    Settles when **any** of the promises settles. In other words, fulfills when any of the promises fulfills; rejects when any of the promises rejects.

All these methods take an iterable of promises (thenables, to be exact) and return a new promise. They all support subclassing, which means they can be called on subclasses of `Promise`, and the result will be a promise of the subclass type. To do so, the subclass's constructor must implement the same signature as the `Promise()` constructor — accepting a single `executor` function that can be called with the `resolve` and `reject` callbacks as parameters. The subclass must also have a `resolve` static method that can be called like `Promise.resolve()` to resolve values to promises.

There are two other convenience static methods: `Promise.allKeyed()` and `Promise.allSettledKeyed()`, that behave like `Promise.all()` and `Promise.allSettled()`, but take _objects_ of promises and return promises that fulfill with _objects_ of the same shape. By working with objects instead of arrays, you can associate results with semantically meaningful keys, instead of arbitrary array ordering which can be difficult to maintain.

These methods attach handlers to each input promise using `then()`. Even when the resulting promise has settled early (such as when one input in `Promise.race()` settles), the other handlers are not removed. Repeatedly passing the same pending promise to concurrency methods can accumulate handlers even when those handlers are never used:

```js
const pendingPromise = new Promise(() => {});

for (let i = 0; i < 1000; i++) {
  await Promise.race([Promise.resolve(0), pendingPromise]);
}
// All tasks have completed, but pendingPromise retains the
// handlers attached by all 1000 races.
```

Promises do not provide a way to unsubscribe these handlers; they remain attached while the input promise is pending and reachable. Where possible, cancel the underlying operation by using an `AbortSignal` when the pending promise is no longer useful.

Note that JavaScript is single-threaded by nature, so at a given instant, only one task will be executing, although control can shift between different promises, making execution of the promises appear concurrent. Parallel execution in JavaScript can only be achieved through worker threads.

## Constructor

- `Promise()`
    Creates a new `Promise` object. The constructor is primarily used to wrap functions that do not already support promises.

## Static properties

- `Promise[Symbol.species]`
    Returns the constructor used to construct return values from promise methods.
