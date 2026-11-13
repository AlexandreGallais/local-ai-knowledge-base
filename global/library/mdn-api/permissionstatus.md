---
title: "PermissionStatus"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/permissionstatus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PermissionStatus

The **`PermissionStatus`** interface of the Permissions API provides the state of an object and an event handler for monitoring changes to said state.

## Instance properties

- `PermissionStatus.name` (read-only)
    Returns the name of a requested permission, identical to the `name` passed to `Permissions.query`.
- `PermissionStatus.state` (read-only)
    Returns the state of a requested permission; one of `'granted'`, `'denied'`, or `'prompt'`.

### Events

- `change`
    Invoked upon changes to `PermissionStatus.state`.

## Example

```js
navigator.permissions
  .query({ name: "geolocation" })
  .then((permissionStatus) => {
    console.log(`geolocation permission status is ${permissionStatus.state}`);
    permissionStatus.onchange = () => {
      console.log(
        `geolocation permission status has changed to ${permissionStatus.state}`,
      );
    };
  });
```
