---
title: "PaymentRequestEvent: PaymentRequestEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/paymentrequestevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: PaymentRequestEvent() constructor

The **`PaymentRequestEvent`** constructor creates a new `PaymentRequestEvent` object instance.

## Syntax

```js
new PaymentRequestEvent(type)
new PaymentRequestEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `paymentrequest`.
- `options` (optional)
    An object that, in addition of the properties defined in `ExtendableEvent()`, can have the following properties:
    - `methodData`
        An array of `PaymentMethodData` objects (see `methodData` > Value) containing payment method identifiers for the payment methods
        that the website accepts and any associated payment method-specific data.
    - `modifiers`
        An array of objects containing changes to payment details.
    - `paymentRequestId`
        The ID of the `PaymentRequest` object.
    - `paymentRequestOrigin`
        The origin where the `PaymentRequest` object was initialized.
    - `topOrigin`
        The top-level origin where the `PaymentRequest` object was initialized.
    - `total`
        The total amount being requested for payment.

### Return value

A new `PaymentRequestEvent` object.

## Examples

A developer would not use this constructor manually. A new `PaymentRequestEvent` object is constructed when a handler is invoked as a result of the `paymentrequest` event firing.

```js
self.addEventListener("paymentrequest", (e) => {
  // …
});
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
