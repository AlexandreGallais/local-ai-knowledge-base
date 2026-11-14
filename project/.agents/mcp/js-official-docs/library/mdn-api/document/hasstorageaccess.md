---
title: "Document: hasStorageAccess() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/hasstorageaccess/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: hasStorageAccess() method

The **`hasStorageAccess()`** method of the `Document` interface returns a `Promise` that resolves with a boolean value indicating whether the document has access to third-party, unpartitioned cookies.

This method is part of the Storage Access API.

> **Note:**
> This method is another name for `Document.hasUnpartitionedCookieAccess()`. There are no current plans to remove this method in favor of `Document.hasUnpartitionedCookieAccess()`.

## Syntax

```js
hasStorageAccess()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a boolean value indicating whether the document has access to third-party cookies — `true` if it does, and `false` if not.

The result returned by this method can be inaccurate in a couple of circumstances:

1. The user may have active browser settings that block third-party cookies; in this case, `true` may be returned even though third-party cookies are still inaccessible. To handle such a situation, you should gracefully handle any errors resulting in cookie values being unretrievable; for example, inform the user that access to their personalized settings is blocked and invite them to sign in again to use them.
2. The browser might not block third-party cookie access by default; in this case, `false` may be returned even though third-party cookies are accessible, and storage access wouldn't need to be requested (i.e., via `Document.requestStorageAccess()`). To get around this issue, you could query `Document.cookie` to find out whether your cookies are accessible, and call `Document.requestStorageAccess()` if they are not.

> **Note:**
> If the promise gets resolved and a user gesture event was being processed when the function was originally called, the resolve handler will run as if a user gesture was being processed, so it will be able to call APIs that require user activation.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not yet active.

## Examples

```js
document.hasStorageAccess().then((hasAccess) => {
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

- `Document.hasUnpartitionedCookieAccess()`, `Document.requestStorageAccess()`, `Document.requestStorageAccessFor()`
- Using the Storage Access API
- Introducing Storage Access API (WebKit blog)
