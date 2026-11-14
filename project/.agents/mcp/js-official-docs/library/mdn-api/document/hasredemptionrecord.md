---
title: "Document: hasRedemptionRecord() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/hasredemptionrecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: hasRedemptionRecord() method

The **`hasRedemptionRecord()`** method of the `Document` interface returns a promise that fulfills with a boolean indicating whether the browser has a redemption record originating from a particular issuer.

## Syntax

```js
hasRedemptionRecord(issuer)
```

### Parameters

- `issuer`
    A string representing the URL of an issuer server.

### Return value

A `Promise` that resolves with a boolean value indicating whether the browser has a redemption record stored that originates from the specified issuer server.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not yet active.
- `NotAllowedError` `DOMException`
    Thrown if the current `Document` is not loaded in a secure context.
- `TypeError`
    Thrown if `issuer` is not a valid URL.

## Examples

```js
const hasRR = await Document.hasRedemptionRecord(`issuer.example`);
if (hasRR) {
  await fetch("some-resource.example", {
    method: "POST",
    privateToken: {
      version: 1,
      operation: "send-redemption-record",
      issuers: ["https://issuer.example"],
    },
  });
}
```

## See also

- Private State Token API
