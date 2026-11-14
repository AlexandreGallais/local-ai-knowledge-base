---
title: "PaymentMethodChangeEvent: PaymentMethodChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentmethodchangeevent/paymentmethodchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentMethodChangeEvent: PaymentMethodChangeEvent() constructor

The **`PaymentMethodChangeEvent()`**
constructor creates a new `PaymentMethodChangeEvent` object providing
details about a `paymentmethodchange` event.

## Syntax

```js
new PaymentMethodChangeEvent(type)
new PaymentMethodChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `paymentmethodchange`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_,
    can have the following properties:
    - `methodName` (optional)
        A string containing the payment method identifier for the
        payment handler being used. This is an empty string by default.
    - `methodDetails` (optional)
        An object providing payment method-specific information describing the changes
        made to the payment, or `null` if there is no additional information
        available or required. This is `null` by default.

### Return value

A new `PaymentMethodChangeEvent` object describing a change to
the options specified for the payment method given in the `methodName`
property.

The type of the `methodDetails` property depends on the payment method. For
example, if `methodName` is `https://example.com/pay`, indicating that the
Example Pay payment method is being used for validation, the shape of `methodDetails`
is defined by the payment method.

## See also

- Payment Request API
- Using the Payment Request API
- Payment processing concepts
