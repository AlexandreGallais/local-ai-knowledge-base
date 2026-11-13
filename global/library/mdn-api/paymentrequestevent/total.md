---
title: "PaymentRequestEvent: total property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/total/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: total property

The **`total`** read-only property of the `PaymentRequestEvent` interface returns a
`PaymentCurrencyAmount` object containing the total amount being requested for payment.

## Value

A `PaymentCurrencyAmount` object. This object contains the following properties:

- `currency`
    A string containing a three-letter ISO 4217 standard currency code representing the currency of the payment. Examples include `USD`, `CAN`, and `GBP`.
- `value`
    A string containing a decimal monetary value, e.g., `2.55`.

## Examples

```js
self.addEventListener("paymentrequest", (e) => {
  console.log(e.total);
});
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
