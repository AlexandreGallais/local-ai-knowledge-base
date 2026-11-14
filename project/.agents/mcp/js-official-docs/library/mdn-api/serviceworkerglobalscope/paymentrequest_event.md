---
title: "ServiceWorkerGlobalScope: paymentrequest event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/paymentrequest_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: paymentrequest event

The **`paymentrequest`** event of the `ServiceWorkerGlobalScope` interface is fired on a payment app when a payment flow has been initiated on the merchant website via the `PaymentRequest.show()` method.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("paymentrequest", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpaymentrequest = (event) => { }
```

## Event type

A `PaymentRequestEvent`. Inherits from `ExtendableEvent`.

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

- `Web-based Payment Handler API`
- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
