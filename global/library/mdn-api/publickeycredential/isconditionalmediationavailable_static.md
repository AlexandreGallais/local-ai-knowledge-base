---
title: "PublicKeyCredential: isConditionalMediationAvailable() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/isconditionalmediationavailable_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: isConditionalMediationAvailable() static method

The **`isConditionalMediationAvailable()`** static method of the `PublicKeyCredential` interface returns a `Promise` which resolves to `true` if the device supports conditional get.

This method is equivalent to the object returned by `PublicKeyCredential.getClientCapabilities()` containing a `true` value for its `conditionalGet` property, and developers are encouraged to prefer this API.

> **Note:**
> This method does **not** indicate whether conditional create is supported. For this, check the value of `conditionalCreate` in the object returned by `PublicKeyCredential.getClientCapabilities()`.

## Syntax

```js
PublicKeyCredential.isConditionalMediationAvailable()
```

### Parameters

None.

### Return value

A `Promise` which resolves to a boolean value indicating whether or not conditional get is available.

### Exceptions

The returned `Promise` may be rejected with the following values:

- `SecurityError` `DOMException`
    The RP domain is not valid.

## Examples

Before invoking a conditional WebAuthn API call, check if:

- The browser supports the Web Authentication API.
- The browser supports conditional get.

```js
// Availability of `window.PublicKeyCredential` means WebAuthn is usable.
if (
  window.PublicKeyCredential &&
  PublicKeyCredential.isConditionalMediationAvailable
) {
  // Check if conditional get is available.
  const isCMA = await PublicKeyCredential.isConditionalMediationAvailable();
  if (isCMA) {
    // Call WebAuthn authentication
    const publicKeyCredentialRequestOptions = {
      // Server generated challenge
      challenge: challengeFromServer,
      // The same RP ID as used during registration
      rpId: "example.com",
    };

    const credential = await navigator.credentials.get({
      publicKey: <example-value>,
      signal: abortController.signal,
      // Specify 'conditional' to activate conditional UI
      mediation: "conditional",
    });
  }
}
```
