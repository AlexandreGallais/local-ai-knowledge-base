---
title: "PaymentManager: enableDelegations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentmanager/enabledelegations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentManager: enableDelegations() method

The **`enableDelegations()`** method of the `PaymentManager` interface delegates responsibility for providing various parts of the required payment information to the payment app rather than collecting it from the browser (for example, via autofill).

For example, if the `requestShipping` option is set to `true` in the options object when invoking the `PaymentRequest()` constructor, a shipping address will be returned.

- If `enableDelegations()` was used to delegate `shippingAddress`, that address will come from the payment app.
- If not, it will come from the browser autofill.

## Syntax

```js
enableDelegations(delegations)
```

### Parameters

- `delegations` (optional)
    An array containing one or more enumerated values that specify the payment information you want to delegate to the payment app. Possible values can be:
    - `payerEmail`
        The payment app will provide the payer's email whenever it is needed.
    - `payerName`
        The payment app will provide the payer's name whenever it is needed.
    - `payerPhone`
        The payment app will provide the payer's phone number whenever it is needed.
    - `shippingAddress`
        The payment app will provide the shipping address whenever it is needed.

### Return value

A `Promise` that resolves with a value of `undefined`.

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
