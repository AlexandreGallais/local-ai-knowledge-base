---
title: "PaymentRequest: shippingOption property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/shippingoption/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: shippingOption property

The **`shippingOption`** read-only attribute of the `PaymentRequest` interface returns either the id of a selected shipping option, null (if no shipping option was set to be selected) or a shipping option selected by the user.
It is initially `null` by when no "selected" shipping options are provided.

This attribute is only populated if the constructor is called with the `requestShipping` flag set to `true`.
If `requestShipping` was `false` (or missing), `shippingOption` returns `null`, even the developer provides a selected a shipping option.

## Value

An object or `null`.

## Examples

In the example below, the `shippingaddresschange` and the `shippingoptionchange` events are dispatched.
In each event, `updateWith()` is called, one using a promise, and the other with a plain JS object.
This demonstrates synchronous and asynchronous updates to a payment sheet.

```js
const request = new PaymentRequest(methodData, details, options);
// Async update to details
request.onshippingaddresschange = (ev) => {
  ev.updateWith(checkShipping(request));
};
// Sync update to the total
request.onshippingoptionchange = (ev) => {
  const shippingOption = shippingOptions.find(
    (option) => option.id === request.id,
  );
  const newTotal = {
    currency: "USD",
    label: "Total due",
    value: calculateNewTotal(shippingOption),
  };
  ev.updateWith({ ...details, total: newTotal });
};
async function checkShipping(request) {
  try {
    const json = request.shippingAddress.toJSON();

    await ensureCanShipTo(json);
    const { shippingOptions, total } = await calculateShipping(json);

    return { ...details, shippingOptions, total };
  } catch (err) {
    return { ...details, error: `Sorry! we can't ship to your address.` };
  }
}
```
