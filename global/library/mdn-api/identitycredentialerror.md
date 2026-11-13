---
title: "IdentityCredentialError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredentialerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredentialError

The **`IdentityCredentialError`** interface of the `FedCM API` describes an authentication error indicating that the user agent did not receive an identity assertion after the user has requested to use a federated account. This can happen if the client is unauthorized or if the server is temporarily unavailable, for example.

Browsers can use this error type to show the error message in the user interface.

## Constructor

- `IdentityCredentialError()` (experimental)
    Creates a new `IdentityCredentialError` object instance.

## Instance properties

_In addition to the properties below, `IdentityCredentialError` inherits properties from its parent, `DOMException`_.

- `error` (experimental) (read-only)
    A string. This can be either one of the values listed in the OAuth 2.0 specified error list or an arbitrary string.
- `url` (experimental) (read-only)
    A URL pointing to human-readable information about the error to display to users, such as how to fix the error or contact customer service.

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
