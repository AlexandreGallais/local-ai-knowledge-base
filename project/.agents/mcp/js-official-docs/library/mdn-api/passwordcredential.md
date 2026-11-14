---
title: "PasswordCredential"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/passwordcredential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PasswordCredential

The **`PasswordCredential`** interface of the Credential <example-value> API provides information about a username/password pair. In supporting browsers an instance of this class may be passed in the `credential` member of the `init` object for global `fetch()`.

> **Note:**
> This interface is restricted to top-level contexts and cannot be used from an ``.

## Constructor

- `PasswordCredential()` (experimental)
    Creates a new `PasswordCredential` object.

## Instance properties

_Inherits properties from its ancestor, `Credential`._

- `PasswordCredential.iconURL` (read-only) (experimental)
    A string containing a URL pointing to an image for an icon. This image is intended for display in a credential chooser. The URL must be accessible without authentication.
- `PasswordCredential.name` (read-only) (experimental)
    A human-readable string that provides public name for display in a credential chooser.
- `PasswordCredential.password` (read-only) (experimental)
    A string containing the password of the credential.

## Instance methods

None.

## Examples

```js
const cred = new PasswordCredential({
  id,
  password,
  name,
  iconURL,
});

navigator.credentials.store(cred).then(() => {
  // Do something else.
});
```
