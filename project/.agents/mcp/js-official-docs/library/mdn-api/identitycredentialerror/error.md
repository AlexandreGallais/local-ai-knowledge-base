---
title: "IdentityCredentialError: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredentialerror/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredentialError: error property

The **`error`** read-only property of the `IdentityCredentialError` interface is either one of the values listed in the OAuth 2.0 specified error list or an arbitrary string giving more information about the error.

## Value

One of the values listed in the OAuth 2.0 specified error list or an arbitrary string.

## Examples

```js
try {
  const cred = await navigator.credentials.get({
    identity: {
      providers: [
        {
          configURL: "https://idp.example/manifest.json",
          clientId: "1234",
        },
      ],
    },
  });
} catch (e) {
  const error = e.error;
  const url = e.url;
}
```

## See also

- `CredentialsContainer.get()`
- ID assertion error responses
