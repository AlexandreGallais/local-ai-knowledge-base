---
title: "Document: hasUnpartitionedCookieAccess() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/hasunpartitionedcookieaccess/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: hasUnpartitionedCookieAccess() method

The **`hasUnpartitionedCookieAccess()`** method of the `Document` interface returns a `Promise` that resolves with a boolean value indicating whether the document has access to third-party, unpartitioned cookies.

This method is part of the Storage Access API.

This method is a new name for `Document.hasStorageAccess()`.

## Syntax

```js
hasUnpartitionedCookieAccess()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a boolean value indicating whether the document has access to third-party cookies — `true` if it does, and `false` if not.

See `Document.hasStorageAccess()` for more details.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not yet active.

## Examples

```js
document.hasUnpartitionedCookieAccess().then((hasAccess) => {
  if (hasAccess) {
    // storage access has been granted already.
    console.log("cookie access granted");
  } else {
    // storage access hasn't been granted already;
    // you may want to call requestStorageAccess().
    console.log("cookie access denied");
  }
});
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.hasStorageAccess()`, `Document.requestStorageAccess()`, `Document.requestStorageAccessFor()`
- Using the Storage Access API
- Introducing Storage Access API (WebKit blog)
