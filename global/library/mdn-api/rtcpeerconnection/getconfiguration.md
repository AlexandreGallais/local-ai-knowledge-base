---
title: "RTCPeerConnection: getConfiguration() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/getconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: getConfiguration() method

The **`getConfiguration()`** method of the `RTCPeerConnection` interface returns an object which indicates the current configuration of the `RTCPeerConnection` on which the method is called.

The returned configuration is the last configuration applied via `setConfiguration()`, or if
`setConfiguration()` hasn't been called, the configuration the `RTCPeerConnection` was constructed with.
The configuration includes a list of the ICE servers used by the connection, information about transport policies, and identity information.

## Syntax

```js
getConfiguration()
```

### Parameters

None.

### Return value

An object describing the `RTCPeerConnection`'s current configuration.
See `RTCPeerConnection()` for more information on what options are allowed.

## Examples

This example adds a new certificate to an active connection if it doesn't already have
one in use.

```js
let configuration = myPeerConnection.getConfiguration();

if (configuration.certificates?.length === 0) {
  RTCPeerConnection.generateCertificate({
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  }).then((cert) => {
    configuration.certificates = [cert];
    myPeerConnection.setConfiguration(configuration);
  });
}
```

This example fetches the current configuration of the `RTCPeerConnection`, then looks to see if it has any certificates set by examining whether or not (a) the configuration has a value for `certificates`, and (b) whether its length is zero.

If it's determined that there are no certificates in place, `RTCPeerConnection.generateCertificate()` is called to create a new certificate; we provide a fulfillment handler which adds a new array containing the one newly-created certificate to the current configuration and passes it to `setConfiguration()` to add the certificate to the connection.

## See also

- `RTCPeerConnection.setConfiguration()`
- `RTCPeerConnection()`
- `RTCPeerConnection`
