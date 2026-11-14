---
title: "RTCIdentityAssertion: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcidentityassertion/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIdentityAssertion: name property

The **`name`** property of the `RTCIdentityAssertion` interface indicates the verified peer identity. It is a string in an email address-like format (for example, `user@example.com`), as defined by .

## Value

A string containing the verified peer identity in an  email address-like format (for example, `user@example.com`).

## Examples

### Logging the verified peer identity name

In this example, the `RTCPeerConnection.peerIdentity` promise is awaited to obtain the identity assertion, and then the peer's verified identity name is logged.

```js
const pc = new RTCPeerConnection();

// …

async function logPeerName() {
  try {
    const identity = await pc.peerIdentity;
    console.log(`Peer identity: ${identity.name}`);
  } catch (err) {
    console.error("Could not verify peer identity:", err);
  }
}

logPeerName();
```

## See also

- `RTCIdentityAssertion.idp`
- `RTCPeerConnection.peerIdentity`
- WebRTC API
