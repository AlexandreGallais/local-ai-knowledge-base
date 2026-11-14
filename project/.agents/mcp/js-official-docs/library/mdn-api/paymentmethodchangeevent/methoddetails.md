---
title: "PaymentMethodChangeEvent: methodDetails property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentmethodchangeevent/methoddetails/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentMethodChangeEvent: methodDetails property

The read-only **`methodDetails`** property of the `PaymentMethodChangeEvent` interface is an object
containing any data the payment handler may provide to describe the change the user
has made to their payment method. The value is `null` if no details
are available.

## Value

An object containing any data needed to describe the changes made to the payment
method. The contents vary depending on the actual payment method chosen, so you will
need to refer to the `methodName`
property first, then interpret the `methodDetails` after that.

The default value is `null`, indicating that no additional details are
available.

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
