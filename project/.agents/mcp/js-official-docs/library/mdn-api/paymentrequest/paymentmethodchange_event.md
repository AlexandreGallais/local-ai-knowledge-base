---
title: "PaymentRequest: paymentmethodchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/paymentmethodchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: paymentmethodchange event

The **`paymentmethodchange`** event is delivered the Payment Request API to a `PaymentRequest` object when the user changes the payment method within a given payment handler.

For example, if the user switches from one credit card to another on their Apple Pay account, a `paymentmethodchange` event is fired to let you know about the change.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("paymentmethodchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpaymentmethodchange = (event) => { }
```

## Event type

A `PaymentMethodChangeEvent`. Inherits from `Event`.

## Examples

Let's take a look at an example. This code creates a new `PaymentRequest`, adds a handler for the `paymentmethodchange` event by calling the request's `addEventListener()`, then calls `show()` to present the payment interface to the user.

The code assumes the existence of a method `detailsForTransaction()`, which will return an object that can be passed as the `details` argument to the `PaymentRequest` constructor.

```js
const paymentRequest = new PaymentRequest(
  paymentMethods,
  detailsForTransaction(),
);

paymentRequest.addEventListener("paymentmethodchange", handlePaymentChange);

paymentRequest
  .show()
  .then((response) => response.complete("success"))
  .catch((err) => console.error(`Error handling payment request: ${err}`));
```

The event handler function itself, `handlePaymentChange()`, looks like this:

```js
handlePaymentChange = (event) => {
  const detailsUpdate = {};

  if (event.methodName === "https://apple.com/apple-pay") {
    const serviceFeeInfo = calculateServiceFee(event.methodDetails);
    Object.assign(detailsUpdate, serviceFeeInfo);
  }

  event.updateWith(detailsUpdate);
};
```

This begins by looking at the event's `methodName` property; if that indicates that the user is trying to use Apple Pay, we pass the `methodDetails` into a function called `calculateServiceFee()`, which we might create to take the information about the transaction, such as the underlying credit card being used to service the Apple Pay request, and compute and return an object that specifies changes to be applied to the `PaymentRequest` in order to add any service fees that the payment method might require.

Before the event handler returns, it calls the event's `updateWith()` method to integrate the changes into the request.

## See also

- Payment Request API
- Using the Payment Request API
- `merchantvalidation` event
- `shippingaddresschange` event
- `shippingoptionchange` event
