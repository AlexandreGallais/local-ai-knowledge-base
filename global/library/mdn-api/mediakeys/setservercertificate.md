---
title: "MediaKeys: setServerCertificate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeys/setservercertificate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeys: setServerCertificate() method

The **`setServerCertificate()`** method of the `MediaKeys` interface provides a server certificate to be used to encrypt messages to the license server.

## Syntax

```js
setServerCertificate(serverCertificate)
```

### Parameters

- `serverCertificate`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` object containing the server certificate.
    The contents are Key <example-value>-specific. It MUST NOT contain executable code.

### Return value

A `Promise` that resolves to a boolean. If the Key <example-value> implementation represented by this object's content decryption module's implementation value does not support server certificates, return a promise resolved with false.
