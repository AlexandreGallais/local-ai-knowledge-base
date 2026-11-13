---
title: "PermissionStatus: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/permissionstatus/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PermissionStatus: change event

The **`change`** event of the `PermissionStatus` interface fires whenever the `PermissionStatus.state` property changes.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A generic `Event`.

## Example

```js
navigator.permissions
  .query({ name: "geolocation" })
  .then((permissionStatus) => {
    console.log(`geolocation permission state is ${permissionStatus.state}`);
    permissionStatus.onchange = () => {
      console.log(
        `geolocation permission state has changed to ${permissionStatus.state}`,
      );
    };
  });
```
