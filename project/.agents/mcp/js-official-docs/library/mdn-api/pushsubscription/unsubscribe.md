---
title: "PushSubscription: unsubscribe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushsubscription/unsubscribe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushSubscription: unsubscribe() method

The `unsubscribe()` method of the `PushSubscription` interface
returns a `Promise` that resolves to a boolean value when the
current subscription is successfully unsubscribed.

## Syntax

```js
unsubscribe()
```

### Parameters

None.

### Return value

A `Promise` that resolves to a boolean value when the current
subscription is successfully unsubscribed.

## Examples

```js
navigator.serviceWorker.ready.then((reg) => {
  reg.pushManager.getSubscription().then((subscription) => {
    subscription
      .unsubscribe()
      .then((successful) => {
        // You've successfully unsubscribed
      })
      .catch((e) => {
        // Unsubscribing failed
      });
  });
});
```

## See also

- `PushManager.getSubscription`
