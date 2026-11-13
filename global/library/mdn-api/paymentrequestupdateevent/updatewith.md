---
title: "PaymentRequestUpdateEvent: updateWith() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestupdateevent/updatewith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestUpdateEvent: updateWith() method

The **`updateWith()`** method of the
`PaymentRequestUpdateEvent` interface updates the details of an existing
`PaymentRequest`.

## Syntax

```js
updateWith(details)
```

### Parameters

- `details`
    Either an object or a `Promise` that resolves to an object, specifying the changes applied to the payment request:
    - `displayItems` (optional)
        An array of objects, each describing one line item for the payment request. These represent the line items on a receipt or invoice, each with the following properties:
        - `amount`
            An object describing the monetary value of the item. This object includes the following fields:
            - `currency`
                A string containing a valid 3-letter ISO 4217 currency identifier (ISO 4217) indicating the currency used for the payment `value`.
            - `value`
                A string containing a valid decimal value representing the mount of currency constituting the payment amount. This string must only contain an optional leading "-" to indicate a negative value, then one or more digits from 0 to 9, and an optional decimal point (".", regardless of locale) followed by at least one more digit. No whitespace is permitted.
        - `label`
            A string specifying a human-readable name or description of the item or service being charged for. This may be displayed to the user by the user agent, depending on the design of the interface.
        - `pending`
            A Boolean value which is `true` if the specified `amount` has not yet been finalized. This can be used to show items such as shipping or tax amounts that depend upon the selection of shipping address, shipping option, or so forth. The user agent may show this information but is not required to do so.

    - `error` (optional) (deprecated) (non-standard)
        A string specifying an error message to present to the user. When calling `updateWith()`, including `error` in the updated data causes the user agent to display the text as a general error message. For address field-specific errors, use the `shippingAddressErrors` field.

    - `modifiers` (optional)
        An `Array` of `PaymentDetailsModifier` objects, whose properties are described in `PaymentRequestEvent.modifiers`.

        For example, you can use one to adjust the total payment amount based on the selected payment method ("5% cash discount!").

    - `shippingAddressErrors` (optional) (deprecated) (non-standard)
        An object which includes an error message for each property of the shipping address that could not be validated.
    - `shippingOptions` (optional) (deprecated) (non-standard)
        An array of objects, each describing one available shipping option from which the user may choose.
    - `total` (optional)
        An object with the same properties as the objects in `displayItems` providing an updated total for the payment. Make sure this equals the sum of all of the items in `displayItems`. _This is not calculated automatically_. You must update this value yourself anytime the total amount due changes. This lets you have flexibility for how to handle things like tax, discounts, and other adjustments to the total price charged.

### Return value

None (`undefined`).
