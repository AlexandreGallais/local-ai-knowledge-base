---
title: "PaymentRequest: merchantvalidation event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/merchantvalidation_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: merchantvalidation event

**`merchantvalidation`** events are delivered by the Payment Request API to a `PaymentRequest` object when a payment handler requires that the merchant requesting the purchase validate itself as permitted to use the payment handler.

Learn how the merchant validation process works.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("merchantvalidation", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmerchantvalidation = (event) => { }
```

## Event type

A `MerchantValidationEvent`. Inherits from `Event`.

## Examples

In this example, an event handler is established for the `merchantvalidation` event. It uses the `fetch()` to send a request to its own server with an argument of the payment method's validation URL, obtained from the event's `validationURL` property. The merchant server should access the validation URL in accordance with the payment method documentation. Typically, a client should not access the validation URL.

```js
request.addEventListener("merchantvalidation", (event) => {
  event.complete(async () => {
    const merchantServerUrl = `${
      window.location.origin
    }/validate?url=${encodeURIComponent(event.validationURL)}`;
    // get validation data, and complete validation;
    return await fetch(merchantServerUrl).then((response) => response.text());
  }, false);
});

const response = await request.show();
```

How merchant server handles the validation depends on the server implementation and payment method documentation. The content delivered by the validation server is forwarded to the merchant server and is then returned from the `fetch()` call's fulfillment handler to the `complete()` method on the event. This response lets the payment handler know if the merchant is validated.

You can also use the `onmerchantvalidation` event handler property to set up the handler for this event (but note that this replaces other event listeners added using `onmerchantvalidation`, if any):

```js
request.onmerchantvalidation = (event) => {
  event.complete(async () => {
    const merchantServerUrl = `${
      window.location.origin
    }/validate?url=${encodeURIComponent(event.validationURL)}`;
    // get validation data, and complete validation;
    return await fetch(merchantServerUrl).then((response) => response.text());
  });
};

const response = await request.show();
```

For more information, see Merchant validation.

## See also

- Payment Request API
- Using the Payment Request API
- `onmerchantvalidation` event handler property
- Merchant validation
- `paymentmethodchange` event
- `shippingaddresschange` event
- `shippingoptionchange` event
