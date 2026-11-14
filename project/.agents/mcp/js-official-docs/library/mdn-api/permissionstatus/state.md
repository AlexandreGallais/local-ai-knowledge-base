---
title: "PermissionStatus: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/permissionstatus/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PermissionStatus: state property

The **`state`** read-only property of the
`PermissionStatus` interface returns the state of a requested permission.
This property returns one of `'granted'`, `'denied'`, or
`'prompt'`.

## Value

One of the following:

- `'granted'`
    The user, or the user agent on the user's behalf, has given express permission to use a powerful feature. The caller can use the feature possibly without having the user agent ask the user's permission.
- `'denied'`
    The user, or the user agent on the user's behalf, has denied access to this powerful feature. The caller can't use the feature.
- `'prompt'`
    The user has not given express permission to use the feature (_i.e., it's the same as denied_). It also means that if a caller attempts to use the feature, the user agent will either be prompting the user for permission or access to the feature will be denied.

## Examples

```js
navigator.permissions
  .query({ name: "geolocation" })
  .then((permissionStatus) => {
    console.log(`geolocation permission state is ${permissionStatus.state}`);
    permissionStatus.onchange = () => {
      console.log(
        `geolocation permission status has changed to ${permissionStatus.state}`,
      );
    };
  });
```
