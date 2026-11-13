---
title: "CanMakePaymentEvent: CanMakePaymentEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canmakepaymentevent/canmakepaymentevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanMakePaymentEvent: CanMakePaymentEvent() constructor

The **`CanMakePaymentEvent()`** constructor creates a new `CanMakePaymentEvent` object instance.

## Syntax

```js
new CanMakePaymentEvent(type)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `CanMakePaymentEvent` this is always `canmakepayment`.

## Examples

A developer would not use this constructor manually. A new `CanMakePaymentEvent` object is constructed when a handler is invoked as a result of the `canmakepayment` event firing.

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
