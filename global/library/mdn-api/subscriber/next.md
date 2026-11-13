---
title: "Subscriber: next() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subscriber/next/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Subscriber: next() method

The **`next()`** method of the `Subscriber` interface sends a value to each observer of the subscription, invoking its `next` callback synchronously. These callbacks are supplied to `Observable.subscribe()`.

## Syntax

```js
next(value)
```

### Parameters

- `value`
    The value to send to observers. This can be any JavaScript value.

### Return value

None (`undefined`).

## Description

If the subscriber is no longer `active`, this method does nothing. An exception thrown by an observer's `next` callback is reported to the global object; it does not call that observer's `error` callback or stop delivery to other observers.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

## Examples

See the main `Subscriber` reference page for a basic <example-value>, and Creating custom observables for additional examples.

## See also

- Creating custom observables
- Observable explainer
