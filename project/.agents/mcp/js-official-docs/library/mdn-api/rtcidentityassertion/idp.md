---
title: "RTCIdentityAssertion: idp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcidentityassertion/idp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIdentityAssertion: idp property

The **`idp`** property of the `RTCIdentityAssertion` interface indicates the domain name of the identity provider (IdP) that validated the identity assertion (a verified claim of the remote peer's identity).

## Value

A string containing the domain name of the identity provider that validated this identity.

## Examples

### Displaying the identity provider domain

In this example, the `RTCPeerConnection.peerIdentity` promise resolves with an `RTCIdentityAssertion` whose `idp` property is logged to the console.

```js
const pc = new RTCPeerConnection();

// …

async function getIdentityProvider() {
  try {
    const identity = await pc.peerIdentity;
    console.log(`Identity provider: ${identity.idp}`);
  } catch (err) {
    console.error("Failed to get peer identity:", err);
  }
}

getIdentityProvider();
```

## See also

- `RTCIdentityAssertion.name`
- `RTCPeerConnection.peerIdentity`
- WebRTC API
