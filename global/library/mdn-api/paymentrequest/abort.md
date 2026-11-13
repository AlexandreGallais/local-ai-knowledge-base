---
title: "PaymentRequest: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: abort() method

The `PaymentRequest.abort()` method of the `PaymentRequest`
interface causes the user agent to end the payment request and to remove any user
interface that might be shown.

## Syntax

```js
abort()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The following example sets up a timeout to clear the payment request that might have
been abandoned or neglected.

```js
const request = new PaymentRequest(supportedInstruments, details, options);

const paymentTimeout = setTimeout(
  () => {
    clearTimeout(paymentTimeout);
    request
      .abort()
      .then(() => {
        print("Payment timed out after 20 minutes.");
      })
      .catch(() => {
        print(
          "Unable to abort, because the user is currently in the process " +
            "of paying.",
        );
      });
  },
  20 * 60 * 1000,
); /* 20 minutes */
```
