---
title: "Document: hasPrivateToken() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/hasprivatetoken/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: hasPrivateToken() method

The **`hasPrivateToken()`** method of the `Document` interface returns a promise that fulfills with a boolean indicating whether the browser has a private state token <example-value> from a particular issuer server.

## Syntax

```js
hasPrivateToken(issuer)
```

### Parameters

- `issuer`
    A string representing the URL of an issuer server.

### Return value

A `Promise` that resolves with a boolean value indicating whether the browser has a private state token <example-value> from the specified issuer server.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not yet active.
- `NotAllowedError` `DOMException`
    Thrown if:
    - The current `Document` is not loaded in a secure context.
    - The maximum number of issuers per top level origin (two) has been exceeded.
- `TypeError`
    Thrown if `issuer` is not a valid URL.

## Examples

```js
const hasToken = await Document.hasPrivateToken(`issuer.example`);
if (!hasToken) {
  await fetch(
    "<example-value>",
    {
      method: "POST",
      privateToken: {
        version: 1,
        operation: "<example-value>",
      },
    },
  );
}
```

## See also

- Private State Token API
