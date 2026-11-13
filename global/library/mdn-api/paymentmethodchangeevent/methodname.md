---
title: "PaymentMethodChangeEvent: methodName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentmethodchangeevent/methodname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentMethodChangeEvent: methodName property

The read-only **`methodName`** property of the `PaymentMethodChangeEvent` interface is a string which
uniquely identifies the payment handler currently selected by the user. The
payment handler may be a payment technology, such as Apple Pay or Android Pay, and each
payment handler may support multiple payment methods; changes to the payment method
within the payment handler are described by the `PaymentMethodChangeEvent`.

## Value

A string which uniquely identifies the currently-selected payment
handler. This may be a string chosen from the list of standardized payment method
identifiers, or a URL used by the payment processing service. See
Payment method identifiers for more information.

The default value is the empty string, `""`.

## Examples

This example uses the `paymentmethodchange` event to watch for changes to
the payment method selected for Apple Pay, in order to compute a discount if the user
chooses to use a Visa card as their payment method.

```js
request.onpaymentmethodchange = (ev) => {
  const { type: cardType } = ev.methodDetails;
  const newStuff = {};
  if (ev.methodName === "https://apple.com/apple-pay") {
    switch (cardType) {
      case "visa": {
        // do Apple Pay specific handling for Visa card…
        // methodDetails contains the card information
        const discount = calculateDiscount(ev.methodDetails);
        Object.assign(newStuff, discount);
        break;
      }
    }
  }
  // finally…
  ev.updateWith(newStuff);
};
const response = await request.show();
```

Note that the `methodDetails` property is being used by the `calculateDiscount()` function to compute any payment discount, then `updateWith()` is called to update the event with the computed update.
