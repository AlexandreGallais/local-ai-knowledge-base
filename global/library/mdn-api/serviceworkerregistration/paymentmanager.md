---
title: "ServiceWorkerRegistration: paymentManager property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/paymentmanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: paymentManager property

The **`paymentManager`** read-only property of the
`ServiceWorkerRegistration` interface returns a payment app's `PaymentManager` instance, which is used to manage various payment app functionality.

## Value

A `PaymentManager` object instance.

## Examples

```js
navigator.serviceWorker.register("serviceworker.js").then((registration) => {
  registration.paymentManager.userHint = "Card number should be 16 digits";

  registration.paymentManager
    .enableDelegations(["shippingAddress", "payerName"])
    .then(() => {
      // …
    });

  // …
});
```

- `PaymentManager.userHint` is used to provide a hint for the browser to display along with the payment app's name and icon in the Web-based Payment Handler UI.
- `PaymentManager.enableDelegations()` is used to delegate responsibility for providing various parts of the required payment information to the payment app rather than collecting it from within the merchant website.

## See also

- `Web-based Payment Handler API`
- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
