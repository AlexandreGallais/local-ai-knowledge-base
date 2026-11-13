---
title: "Permissions"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/permissions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions

The **`Permissions`** interface of the Permissions API provides the core Permission API functionality, such as methods for querying and revoking permissions

## Instance methods

- `Permissions.query()`
    Returns the user permission status for a given API.
- `Permissions.revoke()` (deprecated)
    Revokes the permission currently set on a given API.

## Example

```js
navigator.permissions.query({ name: "geolocation" }).then((result) => {
  if (result.state === "granted") {
    showLocalNewsWithGeolocation();
  } else if (result.state === "prompt") {
    showButtonToEnableLocalNews();
  }
  // Don't do anything if the permission was denied.
});
```
