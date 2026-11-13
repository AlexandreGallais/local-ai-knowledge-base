---
title: "PaymentRequest: shippingaddresschange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/shippingaddresschange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: shippingaddresschange event

The **`shippingaddresschange`** event is sent to the `PaymentRequest` object when the user selects a shipping address or changes details of their shipping address.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("shippingaddresschange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onshippingaddresschange = (event) => { }
```

## Event type

A `PaymentRequestUpdateEvent`. Inherits from `Event`.

## Usage notes

Depending on the browser, the shipping address information may be redacted for privacy reasons. That is, the `PaymentAddress` which contains the shipping address may have some portions of its content altered, obscured, or left out entirely in order to prevent identifying the user without their consent (since if they choose to have you ship products to them, you'll need their address).

## Example

In this example, a handler for the `shippingaddresschange` event is set up to validate that the address meets requirements set by the web application.

```js
const paymentRequest = new PaymentRequest(methodData, details, options);

paymentRequest.addEventListener("shippingaddresschange", (event) => {
  const detailsUpdate = checkAddress(paymentRequest.shippingAddress);
  event.updateWith(detailsUpdate);
});

function checkAddress(theAddress) {
  const detailsUpdate = {};

  // Check the address, return an object with any changes or errors.

  return detailsUpdate;
}
```

You can also establish a handler for `shippingaddresschange` using the `onshippingaddresschange` event handler property (but note that this replaces other event listeners added using `onshippingaddresschange`, if any):

```js
paymentRequest.onshippingaddresschange = (event) => {
  const detailsUpdate = checkAddress(paymentRequest.shippingAddress);
  event.updateWith(detailsUpdate);
};
```
