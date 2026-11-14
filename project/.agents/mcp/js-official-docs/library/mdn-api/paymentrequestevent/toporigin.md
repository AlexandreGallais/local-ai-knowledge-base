---
title: "PaymentRequestEvent: topOrigin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/toporigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: topOrigin property

The **`topOrigin`** read-only property of the
`PaymentRequestEvent` interface returns the top-level payee origin where
the `PaymentRequest` object was initialized.

## Value

A string.

## Examples

```js
self.addEventListener("paymentrequest", (e) => {
  console.log(e.topOrigin);
});
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
