---
title: "PaymentManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentmanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentManager

The **`PaymentManager`** interface of the `Web-based Payment Handler API` is used to manage various aspects of payment app functionality.

It is accessed via the `ServiceWorkerRegistration.paymentManager` property.

## Instance properties

- `userHint` (experimental)
    Provides a hint for the browser to display along with the payment app's name and icon in the Web-based Payment Handler UI.

## Instance methods

- `enableDelegations()` (experimental)
    Delegates responsibility for providing various parts of the required payment information to the payment app rather than collecting it from the browser (for example, via autofill).

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

## See also

- `Web-based Payment Handler API`
- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
