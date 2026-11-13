---
title: "IdentityCredentialError: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredentialerror/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredentialError: url property

The **`url`** read-only property of the `IdentityCredentialError` interface is the URL pointing to human-readable information about the error to display to users, such as how to fix the error or contact customer service.

## Value

A string indicating the URL for more information about the error.

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
