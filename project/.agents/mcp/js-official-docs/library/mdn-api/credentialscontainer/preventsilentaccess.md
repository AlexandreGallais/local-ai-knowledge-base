---
title: "CredentialsContainer: preventSilentAccess() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credentialscontainer/preventsilentaccess/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CredentialsContainer: preventSilentAccess() method

The **`preventSilentAccess()`** method of the `CredentialsContainer` interface sets a flag that specifies whether automatic log in is allowed for future visits to the current origin, then returns a `Promise` that resolves to `undefined`.
For example, you might call this, after a user signs out of a website to ensure that they aren't automatically signed in on the next site visit.
Mediation varies by origin, and is an added check point of browser stored credentials, informing a user of an account login status. This method is typically called after a user signs out of a website, ensuring this user's login information is not automatically passed on the next site visit.

When using a `PublicKeyCredential`, this method generally has no effect; such authenticators typically require user interaction. However, it _is possible_ that certain authenticators may be excluded, which could otherwise have operated silently.

Earlier versions of the spec called this method `requireUserMediation()`.
The Browser compatibility section has support details.

## Syntax

```js
preventSilentAccess()
```

### Parameters

None.

### Return value

A `Promise` that resolves to `undefined`.
