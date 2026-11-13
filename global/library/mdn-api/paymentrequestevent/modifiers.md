---
title: "PaymentRequestEvent: modifiers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/modifiers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: modifiers property

The **`modifiers`** read-only property of the
`PaymentRequestEvent` interface returns an `Array` of `PaymentDetailsModifier` objects containing modifiers for payment details.

## Value

An array of objects containing modifiers for payment details. These objects contain the following properties:

- `supportedMethods`
    A payment method identifier. The members of the object only apply to the payment if the user selects this payment method.
- `total`
    A `PaymentItem` object containing the following properties:
    - `label`
        A string containing a human-readable description of the item, which may be displayed to the user.
    - `amount`
        A `PaymentCurrencyAmount` object (see `total` > Value).
    - `pending`
        A boolean. When set to true it means that the `amount` member is not final. This is commonly used to show items such as shipping or tax amounts that depend upon selection of shipping address or shipping option.
- `additionalDisplayItems`
    An array of `PaymentItem` objects providing additional display items to be included in the payment details. This member is commonly used to add a discount or surcharge line item indicating the reason for the different total amount for the selected payment method that the user agent MAY display.
- `data`
    An object that provides optional information that might be needed by the supported payment methods. If supplied, it will be JSON-serialized.

## Examples

```js
self.addEventListener("paymentrequest", (e) => {
  console.log(e.modifiers);
});
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
