---
title: "RTCCertificateStats"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccertificatestats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCertificateStats

The **`RTCCertificateStats`** dictionary of the WebRTC API is used to report information about a certificate used by an `RTCDtlsTransport` and its underlying `RTCIceTransport`.

The report can be obtained by iterating the `RTCStatsReport` returned by `RTCPeerConnection.getStats()` until you find an entry with the `type` of `certificate`.

## Instance properties

- `base64Certificate`
    A string containing the base-64 representation of the DER-encoded certificate.
- `fingerprint`
    A string containing the certificate fingerprint, which is calculated using the hash function specified in `fingerprintAlgorithm`.
- `fingerprintAlgorithm`
    A string containing the hash function used to compute the certificate `fingerprint`, such as "sha-256".
- `issuerCertificateId` (experimental)
    A string containing the `id` of the `RTCCertificateStats` object in this report that contains the next certificate in the certificate chain.
    This will not be set if the current certificate is a self-signed certificate or the end of the certificate chain (a root certificate).

### Common instance properties

The following properties are common to all WebRTC statistics objects (See `RTCStatsReport` for more information).

- `id`
    A string that uniquely identifies the object that is being monitored to produce this set of statistics.
- `timestamp`
    A `DOMHighResTimeStamp` object indicating the time at which the sample was taken for this statistics object.
- `type`
    A string with the value `"certificate"`, indicating the type of statistics that the object contains.

## Examples

### Basic usage

Given a variable `myPeerConnection`, which is an instance of `RTCPeerConnection`, the code below uses `await` to wait for the statistics report, and then iterates it using `RTCStatsReport.forEach()`.
It then filters the dictionaries for just those reports that have the type of `certificate` and logs the result.

```js
const stats = await myPeerConnection.getStats();

stats.forEach((report) => {
  if (report.type === "certificate") {
    // Log the certificate information
    console.log(report);
  }
});
```

## See also

- `RTCStatsReport`
- `RTCCertificate`
