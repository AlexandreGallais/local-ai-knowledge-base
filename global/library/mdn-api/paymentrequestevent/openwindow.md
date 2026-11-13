---
title: "PaymentRequestEvent: openWindow() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestevent/openwindow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestEvent: openWindow() method

The **`openWindow()`** method of the `PaymentRequestEvent` interface opens the specified URL in a new window, only if the given URL is on the same origin as the calling page. It returns a `Promise` that resolves with a reference to a `WindowClient`.

## Syntax

```js
openWindow(url)
```

### Parameters

- `url`
    The URL to open in the new window. It must be on the same origin as the calling
    page.

### Return value

A `Promise` that resolves with a reference to a
`WindowClient`.

## Examples

```js
self.addEventListener("paymentrequest", async (e) => {
  // …
  // Retain a promise for future resolution
  // Polyfill for PromiseResolver at link below.
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

See Open the payment handler window to display the web-based payment app frontend for more details about how this would be used.

## See also

- Web-based payment apps overview
- Setting up a payment method
- Life of a payment transaction
- Using the Payment Request API
- Payment processing concepts
