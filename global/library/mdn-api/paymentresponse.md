---
title: "PaymentResponse"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentresponse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentResponse

The **`PaymentResponse`** interface of the Payment Request API is returned after a user selects a payment method and approves a payment request.

## Instance properties

- `PaymentResponse.details` (read-only)
    Returns a JSON-serializable object that provides a payment method specific message used by the merchant to process the transaction and determine successful fund transfer. The contents of the object depend on the payment method being used. Developers need to consult whomever controls the URL for the expected shape of the details object.
- `PaymentResponse.methodName` (read-only)
    Returns the payment method identifier for the payment method that the user selected, for example, Visa, Mastercard, PayPal, etc.
- `PaymentResponse.payerEmail` (read-only)
    Returns the email address supplied by the user. This option is only present when the `requestPayerEmail` option is set to `true` in the `options` parameter of the `PaymentRequest()` constructor.
- `PaymentResponse.payerName` (read-only)
    Returns the name supplied by the user. This option is only present when the `requestPayerName` option is set to true in the `options` parameter of the `PaymentRequest()` constructor.
- `PaymentResponse.payerPhone` (read-only)
    Returns the phone number supplied by the user. This option is only present when the `requestPayerPhone` option is set to `true` in the `options` parameter of the `PaymentRequest()` constructor.
- `PaymentResponse.requestId` (read-only)
    Returns the identifier of the `PaymentRequest` that produced the current response. This is the same value supplied in the `PaymentRequest()` constructor by `details.id`.
- `PaymentResponse.shippingAddress` (read-only)
    Returns the shipping Address supplied by the user. This option is only present when the `requestShipping` option is set to `true` in the `options` parameter of the `PaymentRequest()` constructor.
- `PaymentResponse.shippingOption` (read-only)
    Returns the ID attribute of the shipping option selected by the user. This option is only present when the `requestShipping` option is set to `true` in the `options` parameter of the `PaymentRequest()` constructor.

## Instance methods

- `PaymentResponse.retry()`
    If something is wrong with the payment response's data (and there is a recoverable error), this method allows a merchant to request that the user retry the payment. The method takes an object as argument, which is used to signal to the user exactly what is wrong with the payment response so they can try to correct any issues.
- `PaymentResponse.complete()`
    Notifies the user agent that the user interaction is over. This causes any remaining user interface to be closed. This method should only be called after the Promise returned by the `PaymentRequest.show()` method.
- `PaymentResponse.toJSON()`
    Returns a JSON-serializable plain object representing the `PaymentResponse` object. Automatically called by `JSON.stringify()`.

## Events

Listen to this event using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `payerdetailchange`
    Fired during a retry when the user makes changes to their personal information while filling out a payment request form. Allows the developer to revalidate any requested user data (e.g., the phone number or the email address) if it changes.
