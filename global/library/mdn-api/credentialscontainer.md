---
title: "CredentialsContainer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credentialscontainer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CredentialsContainer

The **`CredentialsContainer`** interface of the Credential <example-value> API exposes methods to request credentials and notify the user agent when events such as successful sign in or sign out happen. This interface is accessible from `Navigator.credentials`.

## Instance properties

None.

## Instance methods

- `CredentialsContainer.create()`
    Returns a `Promise` that resolves with a new `Credential` instance based on the provided options, or `null` if no `Credential` object can be created. In exceptional circumstances, the `Promise` may reject.
- `CredentialsContainer.get()`
    Returns a `Promise` that resolves with the `Credential` instance that matches the provided parameters.
- `CredentialsContainer.preventSilentAccess()`
    Sets a flag that specifies whether automatic log in is allowed for future visits to the current origin, then returns an empty `Promise`. For example, you might call this, after a user signs out of a website to ensure that they aren't automatically signed in on the next site visit. Earlier versions of the spec called this method `requireUserMediation()`. See Browser compatibility for support details.
- `CredentialsContainer.store()`
    Stores a set of credentials for a user, inside a provided `Credential` instance and returns that instance in a `Promise`.
