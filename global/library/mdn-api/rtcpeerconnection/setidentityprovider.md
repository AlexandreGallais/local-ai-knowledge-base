---
title: "RTCPeerConnection: setIdentityProvider() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/setidentityprovider/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: setIdentityProvider() method

The **`setIdentityProvider()`** method of the `RTCPeerConnection` interface sets the Identity Provider (IdP) to the triplet given in parameter: its name, the protocol used to communicate with it (optional) and an optional username.
The IdP will be used only when an assertion is needed.

If the `signalingState` is set to `"closed"`, an `InvalidStateError` is raised.

## Syntax

```js
setIdentityProvider(domainname)
setIdentityProvider(domainname, protocol)
setIdentityProvider(domainname, protocol, username)
```

### Parameters

- `domainname`
    A string representing the domain name where the IdP is.
- `protocol` (optional)
    A string representing the protocol used to communicate with the IdP.
    It defaults to `"default"` and is used to determine the URL where the IdP is listening.
- `username` (optional)
    A string representing the username associated with the IdP.

### Return value

None (`undefined`).

## Example

```js
const pc = new RTCPeerConnection();

pc.setIdentityProvider("developer.mozilla.org");
```

## See also

- WebRTC
