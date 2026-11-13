---
title: "Document: requestStorageAccessFor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/requeststorageaccessfor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: requestStorageAccessFor() method

The **`requestStorageAccessFor()`** method of the `Document` interface allows top-level sites to request third-party cookie access on behalf of embedded content originating from another site in the same related website set. It returns a `Promise` that resolves if the access was granted, and rejects if access was denied.

## Syntax

```js
requestStorageAccessFor(requestedOrigin)
```

### Parameters

- `requestedOrigin`
    A string representing the URL of the origin you are requesting third-party cookie access for.

### Return value

A `Promise` that fulfills with `undefined` if the access to third-party cookies was granted and rejects if access was denied.

`requestStorageAccessFor()` requests are automatically denied unless the top-level content is currently processing a user gesture such as a tap or click (transient activation), or unless permission was already granted previously. If permission was not previously granted, they must run inside a user gesture-based event handler. The user gesture behavior depends on the state of the promise:

- If the promise resolves (i.e., permission was granted), then the user gesture has not been consumed, so the script can subsequently call APIs requiring a user gesture.
- If the promise is rejected (i.e., permission was not granted), then the user gesture has been consumed, so the script can't do anything that requires a gesture. This prevents scripts from calling `requestStorageAccessFor()` again if permission is denied.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not yet active.
- `NotAllowedError` `DOMException`
    Thrown if:
    - The document's window is not a secure context.
    - The document is not the top-level document.
    - The document has a `null` origin.
    - The supplied `requestedOrigin` is opaque.
    - The top-level and embedded sites are not in the same related website set.
    - The embedding `` is sandboxed, and the `allow-storage-access-by-user-activation` token is not set.
    - Usage is blocked by a `storage-access` Permissions Policy.
    - Usage is denied by the user agent's permission request to use the API.
- `TypeError`
    Thrown if `requestedOrigin` is not a valid URL.

## Description

The `requestStorageAccessFor()` method addresses challenges in adopting the Storage Access API on top-level sites that use cross-site images or scripts requiring cookies. It is relevant to user agents that by default block access to third-party, unpartitioned cookies to improve privacy (e.g., to prevent tracking), and is a proposed extension of the Storage Access API.

`requestStorageAccessFor()` can enable third-party cookie access for cross-site resources directly embedded into a top-level site that are unable to request storage access themselves, for example `` elements. Cross-site content embedded in ``s that has its own logic and resources and needs third-party cookie access should request storage access via `Document.requestStorageAccess()`.

To check whether permission to access third-party cookies has already been granted via `requestStorageAccessFor()`, you can call `Permissions.query()`, specifying the feature name `"top-level-storage-access"`. This is different from the feature name used for the regular `Document.requestStorageAccess()` method, which is `"storage-access"`.

The `Permissions.query()` call must specify the embedded origin; for example:

```js
navigator.permissions.query({
  name: "top-level-storage-access",
  requestedOrigin: "https://www.example.com",
});
```

> **Note:**
> Usage of this feature may be blocked by a `storage-access` Permissions Policy set on your server (the same one that controls the rest of the Storage Access API). In addition, the document must pass <example-value> browser-specific checks such as allowlists, blocklists, on-device classification, user settings, or anti-clickjacking heuristics.

## Examples

```js
function rSAFor() {
  if ("requestStorageAccessFor" in document) {
    document.requestStorageAccessFor("https://example.com").then(
      (res) => {
        // Use storage access
        doThingsWithCookies();
      },
      (err) => {
        // Handle errors
      },
    );
  }
}
```

After a successful `requestStorageAccessFor()` call, cross-site requests will include cookies if they include CORS / `crossorigin`, so sites may want to wait before triggering a request. Such requests must use the `credentials: "include"` option and resources must include the `crossorigin="use-credentials"` attribute.

For example:

```js
function checkCookie() {
  fetch("https://example.com/getcookies.json", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      // Do something
    });
}
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.hasStorageAccess()`, `Document.hasUnpartitionedCookieAccess()`, `Document.requestStorageAccess()`
- Using the Storage Access API
- Introducing Storage Access API (WebKit blog)
