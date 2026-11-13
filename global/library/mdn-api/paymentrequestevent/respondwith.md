---
title: "PaymentRequestEvent: respondWith() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/respondwith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: respondWith() method

The **`respondWith()`** method of the `PaymentRequestEvent` interface prevents the default event handling and allows you to provide a `Promise` for a payment handler response object yourself.

## Syntax

```js
respondWith(promise)
```

### Parameters

- `promise`
    A payment handler response object or a `Promise` that resolves to one. This object should contain the following properties:
    - `methodName`
        The payment method identifier for the payment method that the user selected to fulfill the transaction.
    - `details`
        A JSON-serializable object that provides a payment method-specific message used by the merchant to process the transaction and determine a successful fund transfer. See 8.1.2 `details` attribute for more details.

    The `promise` can be rejected with the following values to indicate a failure of the payment app:

    - `AbortError` `DOMException`
        Indicates that the user canceled the payment request.
    - `OperationError` `DOMException`
        Indicates an internal error in the underlying app that is handling the payment.

    If the `promise` is rejected with any other value, it is mapped to `AbortError`.

### Return value

None (`undefined`).

## Examples

The example below is taken from Open the payment handler window to display the web-based payment app frontend. Read the article to understand the context of the code.

```js
self.addEventListener("paymentrequest", async (e) => {
  // Retain a promise for future resolution
  resolver = new PromiseResolver();

  // Pass a promise that resolves when payment is done.
  e.respondWith(resolver.promise);
  // Open the checkout page.
  try {
    // Open the window and preserve the client
    client = await e.openWindow(checkoutURL);
    if (!client) {
      // Reject if the window fails to open
      throw new Error("Failed to open window");
    }
  } catch (err) {
    // Reject the promise on failure
    resolver.reject(err);
  }
});
```

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
