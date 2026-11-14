---
title: "PaymentRequest: getSecurePaymentConfirmationCapabilities() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/getsecurepaymentconfirmationcapabilities_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest: getSecurePaymentConfirmationCapabilities() static method

The **`getSecurePaymentConfirmationCapabilities()`** static method of the `PaymentRequest` interface returns an object indicating which capabilities of the Secure payment confirmation feature are supported by the current browser.

## Syntax

```js
PaymentRequest.getSecurePaymentConfirmationCapabilities()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an object where the property names are strings representing secure payment confirmation feature names, and the values are booleans representing whether the feature is available (`true`) or not (`false`).

Known features are as follows:

- `browserBoundKeyHardware`
    The Secure Payment Confirmation API is capable of using browser bound keys that are stored in hardware secure elements on the device. A browser-bound key is a public-private key pair that signs over the transaction details in addition to the WebAuthn credential and is tied to a single device by the user agent.

> **Note:**
> The browser may choose to omit some or all capabilities from the object regardless if it is supported or not, for example to protect user privacy if abuse of the API is suspected.

## Examples

### Basic usage

```js
async function spcFeatures() {
  const features =
    await PaymentRequest.getSecurePaymentConfirmationCapabilities();
  for (const [key, value] of Object.entries(features)) {
    console.log(`${key}: ${value}`);
  }
}
```

## See also

- Using Secure Payment Confirmation
