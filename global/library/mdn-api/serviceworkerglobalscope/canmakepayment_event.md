---
title: "ServiceWorkerGlobalScope: canmakepayment event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/canmakepayment_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: canmakepayment event

The **`canmakepayment`** event of the `ServiceWorkerGlobalScope` interface is fired on a payment app's service worker to check whether it is ready to handle a payment. Specifically, it is fired when the merchant website calls the `PaymentRequest()` constructor.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("canmakepayment", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncanmakepayment = (event) => { }
```

## Event type

A `CanMakePaymentEvent`. Inherits from `ExtendableEvent`.

## Examples

The `canmakepayment` event is fired on a payment app's service worker to check whether it is ready to handle a payment. Specifically, it is fired when the merchant website calls the `PaymentRequest()` constructor. The service worker can then use the `CanMakePaymentEvent.respondWith()` method to respond appropriately:

```js
self.addEventListener("canmakepayment", (e) => {
  e.respondWith(
    new Promise((resolve, reject) => {
      someAppSpecificLogic()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
});
```

`respondWith()` returns a `Promise` that resolves with a boolean value to signal that the service worker is ready to handle a payment request (`true`), or not (`false`).

## See also

- `Web-based Payment Handler API`
- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
