---
title: "RTCPeerConnection: idpLoginUrl property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/idploginurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: idpLoginUrl property

The **`idpLoginUrl`** read-only property of the `RTCPeerConnection` interface returns a string containing the URL endpoint the application can open to log users in to the identity provider (IdP). This value is `null` until the IdP indicates that login is needed.

When a call to `RTCPeerConnection.getIdentityAssertion()` fails because the IdP requires user authentication, the resulting promise is rejected with an `RTCError` whose `errorDetail` is `"idp-need-login"`. The browser then sets this property to the login URL provided by the IdP. The application can open this URL (for example, in a pop-up window or ``) to allow the user to complete the login process before retrying the identity assertion.

## Value

A string containing the IdP login URL, or `null` if no login is needed.

## Examples

### Handling an IdP login requirement

In this example, the application attempts to gather an identity assertion. If the IdP rejects the attempt because the user is not authenticated, the application opens the login URL provided in `idpLoginUrl`.

```js
const pc = new RTCPeerConnection();
pc.setIdentityProvider("login.example.com");

pc.getIdentityAssertion().catch((error) => {
  if (pc.idpLoginUrl) {
    console.log(`IdP login required at: ${pc.idpLoginUrl}`);
    // Open the login page in a popup window
    const loginWindow = window.open(
      pc.idpLoginUrl,
      "idp-login",
      "width=500,height=600",
    );
  } else {
    console.error("Identity assertion failed:", error);
  }
});
```

## See also

- WebRTC API
- `RTCPeerConnection.peerIdentity`
- `RTCPeerConnection.getIdentityAssertion()`
- `RTCPeerConnection.setIdentityProvider()`
- `RTCIdentityAssertion`
