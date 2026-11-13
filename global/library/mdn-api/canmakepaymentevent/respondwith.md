---
title: "CanMakePaymentEvent: respondWith() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canmakepaymentevent/respondwith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanMakePaymentEvent: respondWith() method

The **`respondWith()`** method of the `CanMakePaymentEvent` interface enables the service worker to respond appropriately to signal whether it is ready to handle payments.

## Syntax

```js
respondWith(response)
```

### Parameters

- `response`
    A `Promise` that resolves with a boolean value to signal that it is ready to handle a payment request: (`true`), or not (`false`).

### Return value

None (`undefined`).

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
