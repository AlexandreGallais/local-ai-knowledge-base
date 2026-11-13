---
title: "Credential: isConditionalMediationAvailable() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credential/isconditionalmediationavailable_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Credential: isConditionalMediationAvailable() static method

The **`isConditionalMediationAvailable()`** static method of the `Credential` interface returns a `Promise` which resolves to `false`.

Subclasses of `Credential` override this method if they support conditional mediation. See `PublicKeyCredential.isConditionalMediationAvailable()`, for example.

## Syntax

```js
Credential.isConditionalMediationAvailable()
```

### Parameters

None.

### Return value

A `Promise` which resolves to `false`.

## Examples

```js
await Credential.isConditionalMediationAvailable(); // false
```
