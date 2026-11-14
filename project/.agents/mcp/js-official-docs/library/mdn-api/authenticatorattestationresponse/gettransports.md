---
title: "AuthenticatorAttestationResponse: getTransports() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorattestationresponse/gettransports/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAttestationResponse: getTransports() method

The **`getTransports()`** method of the `AuthenticatorAttestationResponse` interface returns an array of strings describing the different transports which may be used by the authenticator.

Such transports may be USB, NFC, BLE, internal (applicable when the authenticator is not removable from the device), or a hybrid approach. Sites should not interpret this array but instead store it along with the rest of the credential information. In a subsequent `navigator.credentials.get()` call, the `transports` value(s) specified inside `publicKey.allowCredentials` should be set to the stored array value. This provides a hint to the browser as to which types of authenticators to try when making an assertion for this credential.

## Syntax

```js
getTransports()
```

### Parameters

None.

### Return value

An `Array` of strings representing the different transports supported by the authenticator, in lexicographical order.
Values may include:

- `"ble"`
    The authenticator may be used over BLE (Bluetooth Low Energy).
- `"hybrid"`
    The authenticator can be used over a combination of (often separate) data transport and proximity mechanisms. This supports, for example, authentication on a desktop computer using a smartphone.
- `"internal"`
    The authenticator is specifically bound to the client device (cannot be removed).
- `"nfc"`
    The authenticator may be used over NFC (Near Field Communication).
- `"usb"`
    The authenticator can be contacted over USB.

## Examples

See Creating a public key <example-value> for a detailed example.
