---
title: "PaymentRequest: securePaymentConfirmationAvailability() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/securepaymentconfirmationavailability_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: securePaymentConfirmationAvailability() static method

The **`securePaymentConfirmationAvailability()`** static method of the `PaymentRequest` interface indicates whether the Secure payment confirmation (SPC) feature is available.

## Syntax

```js
securePaymentConfirmationAvailability()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an enumerated value indicating whether SPC is available, and if not, a reason for non-availability.

Possible values are:

- `available`
    SPC is available in the calling frame. This doesn't guarantee that an SPC-compatible credential is available to authenticate against.
- `unavailable-unknown-reason`
    SPC is not available in the calling frame, for an unknown reason. The browser may return this result instead of a more specific reason, in order to protect user privacy.
- `unavailable-feature-not-enabled`
    SPC is not available in the calling frame because it is not enabled.
- `unavailable-no-permission-policy`
    SPC is not available in the calling frame, because it is blocked by a `payment` Permissions Policy.
- `unavailable-no-user-verifying-platform-authenticator`
    SPC is not available in the calling frame, because there is no user-verifying platform authenticator available (`PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()` can also be used to discern this information).

## Examples

```js
async function spcSupport() {
  const support = await PaymentRequest.securePaymentConfirmationAvailability();
  if (support === "available") {
    // Commence SPC payment flow
  } else {
    // Fallback to traditional flows
  }
}
```

## See also

- Using Secure Payment Confirmation
