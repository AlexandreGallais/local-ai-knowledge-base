---
title: "PaymentResponse: details property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentresponse/details/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentResponse: details property

The **`details`** read-only property of the
`PaymentResponse` interface returns a JSON-serializable object that
provides a payment method specific message used by the merchant to process the
transaction and determine a successful funds transfer.

## Value

An object. This data is returned by the payment app that satisfies the payment request. Developers need to consult whomever controls the URL for the expected shape of the details object.

## Examples

The following example extracts the details from the `PaymentResponse`
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
