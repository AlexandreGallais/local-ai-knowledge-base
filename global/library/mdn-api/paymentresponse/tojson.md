---
title: "PaymentResponse: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentresponse/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentResponse: toJSON() method

The **`toJSON()`** method of the `PaymentResponse` interface returns a JSON-serializable plain object representing the `PaymentResponse` object.

The method is automatically called by `JSON.stringify()` when a `PaymentResponse` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `requestId`
- `methodName`
- `details`
- `shippingAddress`
- `shippingOption`
- `payerName`
- `payerEmail`
- `payerPhone`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the `shippingAddress` property is further serialized using `PaymentAddress.toJSON()` when it is not `null`.

## Examples

### Calling toJSON() directly

This example obtains a `PaymentResponse` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
payment.show().then((paymentResponse) => {
  const json = paymentResponse.toJSON();
  console.log(json); // A plain object
  console.log(typeof json); // "object"
  console.log(json.methodName); // Same value as paymentResponse.methodName
});
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(paymentResponse));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "requestId": "checkout-123",
  "methodName": "https://example.com/pay",
  "details": {
    "transactionId": "12345"
  },
  "shippingAddress": null,
  "shippingOption": null,
  "payerName": null,
  "payerEmail": null,
  "payerPhone": null
}
```

## See also

- `JSON`
