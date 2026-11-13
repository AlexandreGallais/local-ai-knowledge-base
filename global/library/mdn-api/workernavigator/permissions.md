---
title: "WorkerNavigator: permissions property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/permissions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: permissions property

The **`permissions`** read-only property of the `WorkerNavigator` interface
returns a `Permissions` object that can be used to query and update
permission status of APIs covered by the Permissions API.

## Value

A `Permissions` object.

## Examples

```js
navigator.permissions.query({ name: "notifications" }).then((result) => {
  if (result.state === "granted") {
    showNotification();
  } else if (result.state === "prompt") {
    requestNotificationPermission();
  }
});
```

## See also

- Permissions API
- Web Worker API
