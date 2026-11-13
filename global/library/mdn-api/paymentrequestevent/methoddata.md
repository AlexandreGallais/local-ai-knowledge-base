---
title: "PaymentRequestEvent: methodData property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/methoddata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: methodData property

The **`methodData`** read-only property of the
`PaymentRequestEvent` interface returns an array of
`PaymentMethodData` objects containing payment method identifiers for the
payment methods that the website accepts and any associated payment method-specific
data.

## Value

An array of `PaymentMethodData` objects. Each object contains the following properties:

- `supportedMethods`
    A payment method identifier for a payment method that the merchant website accepts.
- `data`
    An object that provides optional information that might be needed by the supported payment methods. If supplied, it will be JSON-serialized.

## Examples

```js
self.addEventListener("paymentrequest", (e) => {
  console.log(e.methodData);
});
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
