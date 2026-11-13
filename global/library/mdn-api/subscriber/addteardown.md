---
title: "Subscriber: addTeardown() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subscriber/addteardown/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Subscriber: addTeardown() method

The **`addTeardown()`** method of the `Subscriber` interface registers a callback to clean up resources when the subscription ends. This happens when either `Subscriber.complete()` or `Subscriber.error()` is called, or when all observers unsubscribe.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

The producer calls this method from the callback supplied to the `Observable()` constructor. Calling `addTeardown()` registers the cleanup function; it does not end the subscription.

## Syntax

```js
addTeardown(callback)
```

### Parameters

- `callback`
    A callback function that takes no arguments and runs when the subscription ends. Its return value is ignored, so a returned promise is not awaited.

### Return value

None (`undefined`).

## Description

Callbacks registered while the subscriber is active run synchronously, in reverse registration order, after `active` becomes `false` and `signal` is aborted. When the producer calls `complete()` or `error()`, teardown callbacks run before the corresponding observer callbacks.

If the subscriber is already inactive when `addTeardown()` is called, the supplied callback runs immediately. If a teardown callback throws, the exception is reported to the global object and the remaining teardown callbacks still run.

## Examples

### Callback order

This example registers two teardown callbacks before completion and one afterward. The first two run in reverse registration order, before the observer's `complete()` callback; the last runs immediately when it is registered.

```js
const observable = new Observable((subscriber) => {
  subscriber.addTeardown(() => console.log("First registered"));
  subscriber.addTeardown(() => console.log("Second registered"));
  subscriber.complete();
  subscriber.addTeardown(() => console.log("Registered after completion"));
});

observable.subscribe({
  complete() {
    console.log("Complete");
  },
});

// Second registered
// First registered
// Complete
// Registered after completion
```

See the main `Subscriber` reference page for a basic <example-value>, and Creating custom observables for additional examples.

## See also

- Creating custom observables
- Observable explainer
