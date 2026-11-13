---
title: "RTCPeerConnection: getIdentityAssertion() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/getidentityassertion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: getIdentityAssertion() method

The **`getIdentityAssertion()`** method of the `RTCPeerConnection` interface initiates the gathering of an identity assertion.
This has an effect only if the `signalingState` is not `"closed"`.

It is not expected for the application dealing with the `RTCPeerConnection`: this is automatically done; an explicit call only allows you to anticipate the need.

## Syntax

```js
getIdentityAssertion()
```

### Parameters

None.

### Return value

A `Promise` which resolves to an identity assertion encoded as a string.

## Example

```js
const pc = new RTCPeerConnection();

pc.setIdentityProvider("developer.mozilla.org");
const assertion = await pc.getIdentityAssertion();
```

## See also

- WebRTC
