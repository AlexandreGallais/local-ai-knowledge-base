---
title: "CanMakePaymentEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canmakepaymentevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanMakePaymentEvent

The **`CanMakePaymentEvent`** interface of the `Web-based Payment Handler API` is the event object for the `canmakepayment` event, fired on a payment app's service worker to check whether it is ready to handle a payment. Specifically, it is fired when the merchant website calls the `PaymentRequest()` constructor.

## Constructor

- `CanMakePaymentEvent()` (experimental)
    Creates a new `CanMakePaymentEvent` object instance.

## Instance methods

- `respondWith()` (experimental)
    Enables the service worker to respond appropriately to signal whether it is ready to handle payments.

## Examples

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

## See also

- `Web-based Payment Handler API`
- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
