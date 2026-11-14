---
title: "PaymentRequestEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent

The **`PaymentRequestEvent`** interface of the `Web-based Payment Handler API` is the object passed to a payment handler when a `PaymentRequest` is made.

## Constructor

- `PaymentRequestEvent()` (experimental)
    Creates a new `PaymentRequestEvent` object instance.

## Instance properties

- `methodData` (read-only) (experimental)
    Returns an array of objects containing payment method identifiers for the payment methods that the website accepts and any associated payment method specific data.
- `modifiers` (read-only) (experimental)
    Returns an array of objects containing changes to payment details.
- `paymentRequestId` (read-only) (experimental)
    Returns the ID of the `PaymentRequest` object.
- `paymentRequestOrigin` (read-only) (experimental)
    Returns the origin where the `PaymentRequest` object was initialized.
- `topOrigin` (read-only) (experimental)
    Returns the top-level origin where the `PaymentRequest` object was initialized.
- `total` (read-only) (experimental)
    Returns the total amount being requested for payment.

## Instance methods

- `changePaymentMethod()` (experimental)
    Gets an updated total, given payment method details.
- `openWindow()` (experimental)
    Opens the specified URL in a new window, if and only if the given URL is on the same origin as the calling page. It returns a `Promise` that resolves with a reference to a `WindowClient`.
- `respondWith()` (experimental)
    Prevents the default event handling and allows you to provide a `Promise` for a `PaymentResponse` object yourself.

## Examples

When the `PaymentRequest.show()` method is invoked, a `paymentrequest` event is fired on the service worker of the payment app. This event is listened for inside the payment app's service worker to begin the next stage of the payment process.

```js
let paymentRequestEvent;
const resolver = Promise.withResolvers();
let client;

// `self` is the global object in service worker
self.addEventListener("paymentrequest", async (e) => {
  if (paymentRequestEvent) {
    // If there's an ongoing payment transaction, reject it.
    resolver.reject();
  }
  // Preserve the event for future use
  paymentRequestEvent = e;

  // …
});
```

When a `paymentrequest` event is received, the payment app can open a payment handler window by calling `PaymentRequestEvent.openWindow()`. The payment handler window will present the customers with a payment app interface where they can authenticate, choose shipping address and options, and authorize the payment.

When the payment has been handled, `PaymentRequestEvent.respondWith()` is used to pass the payment result back to the merchant website.

See Receive a payment request event from the merchant for more details of this stage.

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
