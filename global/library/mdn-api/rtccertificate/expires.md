---
title: "RTCCertificate: expires property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccertificate/expires/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCertificate: expires property

The read-only **`expires`** property of the `RTCCertificate` interface returns the expiration date of the certificate.

By default a new certificate is configured with `expires` set to a value of 2592000000 milliseconds, or 30 days.
The expiration time cannot exceed 31536000000 milliseconds, or 365 days.
It's also useful to note that browsers may further restrict the expiration time of certificates if they choose.

## Value

A timestamp, given as Unix time in milliseconds, containing the expiration date of the certificate.

## Examples

```js
RTCPeerConnection.generateCertificate({
  name: "RSASSA-PKCS1-v1_5",
  hash: "SHA-256",
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
}).then((cert) => {
  const pc = new RTCPeerConnection({ certificates: [cert] });
  console.log(cert.expires); // 2592000000 (30 days, the default)
});
```

## See also

- `RTCPeerConnection.generateCertificate()`
