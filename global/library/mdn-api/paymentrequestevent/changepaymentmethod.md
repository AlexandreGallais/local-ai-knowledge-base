---
title: "PaymentRequestEvent: changePaymentMethod() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/changepaymentmethod/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: changePaymentMethod() method

The **`changePaymentMethod()`** method of the `PaymentRequestEvent` interface is used by the payment handler to get an updated total, given such payment method details as the billing address.

When this method is invoked, a `PaymentMethodChangeEvent` is fired.

## Syntax

```js
changePaymentMethod(methodName)
changePaymentMethod(methodName, methodDetails)
```

### Parameters

- `methodName`
    The name of the payment method to be used.
- `methodDetails` (optional)
    An object containing method-specific details that are being updated.

### Return value

A `Promise` that resolves with a `PaymentRequestDetailsUpdate` object. This object contains the following properties:

- `error`
    A string that explains why the user-selected payment method cannot be used.
- `total`
    An updated total based on the changed payment method. The total can change, for example, because the billing address of the payment method selected by the user changes the applicable sales tax.
- `modifiers`
    An `Array` of `PaymentDetailsModifier` objects, whose properties are described in `PaymentRequestEvent.modifiers`.

- `paymentMethodErrors`
    An object containing validation errors for the payment method, if any.

## Examples

The following shows a trivial code snippet that could be used in a service worker to send a payment method change notification to the main payment handler window. For a complete test example, see Payment handler for testing payment method change event.

```js
function notifyPaymentMethodChanged(e) {
  e.changePaymentMethod("someMethod")
    .then((paymentMethodChangeResponse) => {
      paymentHandlerWindow.postMessage(paymentMethodChangeResponse);
    })
    .catch((error) => {
      sendMessage({ error: error.message });
    });
}
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
