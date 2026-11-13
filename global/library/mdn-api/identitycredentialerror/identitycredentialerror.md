---
title: "IdentityCredentialError: IdentityCredentialError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredentialerror/identitycredentialerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredentialError: IdentityCredentialError() constructor

The **`IdentityCredentialError()`** constructor creates a new `IdentityCredentialError` object.

## Syntax

```js
new IdentityCredentialError()
new IdentityCredentialError(message)
new IdentityCredentialError(message, options)
```

### Parameters

- `message`
    A description of the error. If not present, the empty string `''` is used.
- `options` (optional)
    An object that can have the following properties:
    - `error` (optional)
        A string. This can be either one of the values listed in the OAuth 2.0 specified error list or an arbitrary string.
    - `url` (optional)
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
