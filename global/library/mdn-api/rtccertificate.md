---
title: "RTCCertificate"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccertificate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCertificate

The **`RTCCertificate`** interface of the WebRTC API provides an object representing a certificate that an `RTCPeerConnection` uses to authenticate.

`RTCCertificate` is a serializable object, so it can be cloned with `structuredClone()` or copied between Workers using `postMessage()`.

## Instance properties

- `RTCCertificate.expires` (read-only)
    Returns the expiration date of the certificate.

## Instance methods

- `RTCCertificate.getFingerprints()`
    Returns an array of certificate fingerprints, calculated using the different algorithms supported by the browser.

## See also

- `RTCPeerConnection.RTCPeerConnection()` argument `configuration.certificates`
- `RTCPeerConnection.generateCertificate()`
