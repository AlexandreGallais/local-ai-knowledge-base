---
title: "RTCCertificateStats: fingerprint property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccertificatestats/fingerprint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCertificateStats: fingerprint property

The **`fingerprint`** property of the `RTCCertificateStats` dictionary is a string containing the fingerprint value of the associated `RTCCertificate`.

## Value

A string containing the fingerprint of the associated certificate.

This is a lowercase hex string, calculated using the hash function specified in the `fingerprintAlgorithm` property.
The format is more precisely defined in RFC4572, Section 5.
