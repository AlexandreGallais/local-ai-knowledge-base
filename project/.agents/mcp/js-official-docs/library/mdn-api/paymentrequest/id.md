---
title: "PaymentRequest: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: id property

The **`id`** read-only attribute of the
`PaymentRequest` interface returns a unique identifier for a particular
`PaymentRequest` instance.

When constructing an instance of the `PaymentRequest`, you are able to
supply a custom id. If none is provided, the browser automatically sets the id value to a UUID.

## Value

A string.

## Example

This example shows how to give a `PaymentRequest` instance a custom id.

```js
const details = {
  id: "super-store-order-123-12312",
  total: {
    label: "Total due",
    amount: { currency: "USD", value: "65.00" },
  },
};
const request = new PaymentRequest(methodData, details);
console.log(request.id); // super-store-order-123-12312
```

The `id` is then also available in the `PaymentResponse`
returned from the `show()` method, but under the `requestId`
attribute.

```js
const response = await request.show();
console.log(response.requestId === request.id);

// And in serialized form too
const json = response.toJSON();
console.log(json.requestId, response.requestId, request.id);
```
