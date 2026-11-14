---
title: "PaymentRequest: shippingoptionchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/shippingoptionchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: shippingoptionchange event

For payment requests that request shipping information, and for which shipping options are offered, the **`shippingoptionchange`** event is sent to the `PaymentRequest` whenever the user chooses a shipping option from the list of available options.

The string identifying the currently-selected shipping option can be found in the `shippingOption` property.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("shippingoptionchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onshippingoptionchange = (event) => { }
```

## Event type

A `PaymentRequestUpdateEvent`. Inherits from `Event`.

## Examples

This code snippet sets up a handler for the `shippingoptionchange` event. The code recalculates the total charge for the payment based on the selected shipping option. For example, if there are three options (such as "Free ground shipping", "2-day air", and "Next day"), each time the user chooses one of those options, this event handler is called to recalculate the total based on the changed shipping option.

```js
paymentRequest.addEventListener("shippingoptionchange", (event) => {
  const value = calculateNewTotal(paymentRequest.shippingOption);
  const total = {
    label: "Total due",
    amount: { currency: "EUR", value },
  };
  event.updateWith({ total });
});
```

After calling a custom function, `calculateNewTotal()`, to compute the updated total based on the newly-selected shipping option as specified by the `shippingOption`. The revised total is submitted back to the payment request by calling the event's `updateWith()` method.

You can also create an event handler for `shippingoptionchange` using its corresponding event handler property, `onshippingoptionchange` (but note that this replaces other event listeners added using `onshippingoptionchange`, if any):

```js
paymentRequest.onshippingoptionchange = (event) => {
  const value = calculateNewTotal(paymentRequest.shippingOption);
  const total = {
    label: "Total due",
    amount: { currency: "EUR", value },
  };
  event.updateWith({ total });
};
```
