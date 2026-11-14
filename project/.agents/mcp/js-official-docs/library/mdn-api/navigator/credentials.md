---
title: "Navigator: credentials property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/credentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: credentials property

The **`credentials`** read-only property of the `Navigator` interface returns the `CredentialsContainer` object associated with the current document, which exposes methods to request credentials. The `CredentialsContainer` interface also notifies the user agent when an interesting event occurs, such as a successful sign-in or sign-out. This interface can be used for feature detection.

## Value

A `CredentialsContainer` object.

## Examples

```js
if ("credentials" in navigator) {
  navigator.credentials.get({ password: true }).then((creds) => {
    // Do something with the credentials.
  });
} else {
  // Handle sign-in the way you did before.
}
```
