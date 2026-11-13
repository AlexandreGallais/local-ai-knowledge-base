---
title: "MerchantValidationEvent: complete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/merchantvalidationevent/complete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MerchantValidationEvent: complete() method

The `MerchantValidationEvent` method **`complete()`** takes merchant-specific information previously received from the `validationURL` and uses it to validate the merchant.

All you have to do is call `complete()` from your handler for the `merchantvalidation` event, passing in the data fetched from the `validationURL`.

## Syntax

```js
complete(validationData)
complete(merchantSessionPromise)
```

### Parameters

- `validationData` or `merchantSessionPromise`
    An object containing the data needed to complete the merchant validation process, or a `Promise` which resolves to the validation data.

### Return value

None (`undefined`).

### Exceptions

This exception may be passed into the rejection handler for the promise:

- `InvalidStateError` `DOMException`
    Returned if the event did not come directly from the user agent, but was instead dispatched by other code. Another payment request is currently being processed, the current payment request is not currently being displayed to the user, or payment information is currently being updated.

## Examples

In this example, we see the client-side code needed to support merchant validation for a payment request called `payRequest`:

```js
payRequest.onmerchantvalidation = (event) => {
  const validationDataPromise = getValidationData(event.validationURL);
  event.complete(validationDataPromise);
};

function getValidationData(url) {
  // Retrieve the validation data from the URL
  // …
}
```

This code sets up a handler for the `merchantvalidation` event. The event handler calls a function, `getValidationData()`, which retrieves the data from the validation URL, then passes that data (or a promise to deliver the data) into `complete()`.

## See also

- Payment Request API
- Using the Payment Request API
- Payment processing concepts
