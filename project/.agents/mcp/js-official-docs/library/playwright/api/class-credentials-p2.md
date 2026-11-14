---
title: "class: Credentials (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-credentials.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Credentials (part 2 of 2)

## async method: Credentials.get
* since: v1.61
- returns: "VirtualCredential" <[Array]<[Object]>>
  - `id` <[string]>
  - `rpId` <[string]>
  - `userHandle` <[string]>
  - `privateKey` <[string]>
  - `publicKey` <[string]>
  - `signCount` <[int]>

Returns every credential <example-value> held by the authenticator, optionally filtered by [`option: Credentials.get.rpId`] or
[`option: Credentials.get.id`]. This includes both credentials <example-value> with [`method: Credentials.create`] and credentials
the page registered itself by calling `navigator.credentials.create()`.

Each returned credential <example-value> its private and public keys and the current signature counter, so a passkey the app just
registered can be saved and re-seeded into a later test with [`method: Credentials.create`] — see the second example in the class overview.

### option: Credentials.get.rpId
* since: v1.61
- `rpId` <[string]>

Only return credentials for this relying party id.

### option: Credentials.get.id
* since: v1.61
- `id` <[string]>

Only return the credential with this base64url-encoded id.
