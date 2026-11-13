---
title: "PaymentResponse: methodName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentresponse/methodname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentResponse: methodName property

The **`methodName`** read-only
property of the `PaymentResponse` interface returns a string uniquely
identifying the payment handler selected by the user.

This string may be either
one of the standardized payment method identifiers or a URL used by the payment handler
to process payments.

## Value

A string uniquely identifying the payment handler being used to
process the payment. This may be either a standardized identifier, or a URL used by the
payment processor to handle payments. See
how merchant validation works.

## Examples

The following example extracts the method name from the `PaymentResponse`
object to the promise returned from `PaymentRequest.show()`. In a
real-world implementation this data would then be sent to a payment server.

```js
payment.show().then((paymentResponse) => {
  const paymentData = {
    // payment method string
    method: paymentResponse.methodName,
    // payment details as you requested
    details: paymentResponse.details,
    // shipping address information
    address: toDict(paymentResponse.shippingAddress),
  };
  // Send information to the server
});
```
