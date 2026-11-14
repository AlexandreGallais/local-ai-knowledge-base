---
title: "Subscriber: complete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subscriber/complete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Subscriber: complete() method

The **`complete()`** method of the `Subscriber` interface closes the subscription and notifies observers that the stream has completed successfully.

## Syntax

```js
complete()
```

### Parameters

None.

### Return value

None (`undefined`).

## Description

Calling this method sets `active` to `false`, aborts `signal`, and runs the registered teardown callbacks. It then synchronously invokes each observer's `complete` callback, as supplied in the `observer` object passed to `Observable.subscribe()`. If the subscriber is already inactive, this method does nothing. Calling `complete()` does not stop execution of the producer's code; subsequent calls to `Subscriber.next()` on this subscriber have no effect.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

Unsubscribing does not invoke an observer's `complete` callback. Use `addTeardown()` for cleanup that must also run when observers unsubscribe or the stream errors.

## Examples

See the main `Subscriber` reference page for a basic <example-value>, and Creating custom observables for additional examples.

## See also

- Creating custom observables
- Observable explainer
