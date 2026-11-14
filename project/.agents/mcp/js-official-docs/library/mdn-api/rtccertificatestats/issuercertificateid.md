---
title: "RTCCertificateStats: issuerCertificateId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccertificatestats/issuercertificateid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCertificateStats: issuerCertificateId property

The **`issuerCertificateId`** property of the `RTCCertificateStats` dictionary is a string containing the `id` of the `RTCCertificateStats` object in this report that contains the next certificate in the certificate chain.

If there are no further certificates in the chain, such as if this is the root certificate or a self-signed certificate, the value is `undefined`.

Note that WebRTC uses certificates when establishing a DTLS connection.
By default connections use self-signed certificates, but in enterprise or WebRTC gateway setups signed certificate chains from intermediate and root certificate authorities (CAs) may be used instead.
This property allows you to walk the chain of certificates if needed.

## Value

A string, or `undefined` if the current certificate is at the end of the certificate chain.
