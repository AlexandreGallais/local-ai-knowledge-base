---
title: "RTCIdentityAssertion"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcidentityassertion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIdentityAssertion

The **`RTCIdentityAssertion`** interface of the WebRTC API represents the identity of a remote peer of the current connection. If no peer has yet been set and verified, then this interface returns `null`. Once set it can't be changed.

## Instance properties

- `RTCIdentityAssertion.idp` (experimental)
    Indicates the domain name of the identity provider (IdP) that validated the identity.
- `RTCIdentityAssertion.name` (experimental)
    Indicates the verified peer identity as a string in an email address-like format.

## Examples

### Accessing the remote peer's identity

In this example, a function asynchronously waits for the remote peer's identity to be verified via `RTCPeerConnection.peerIdentity`, then logs the identity provider domain and the peer's identity name.

```js
const pc = new RTCPeerConnection();

// …

async function logPeerIdentity() {
  try {
    const identity = await pc.peerIdentity;
    console.log(`IdP domain: ${identity.idp}`);
    console.log(`Peer name: ${identity.name}`);
  } catch (err) {
    console.error("Could not verify peer identity:", err);
  }
}

logPeerIdentity();
```

## See also

- `RTCPeerConnection.peerIdentity`
- `RTCPeerConnection.getIdentityAssertion()`
- WebRTC API
