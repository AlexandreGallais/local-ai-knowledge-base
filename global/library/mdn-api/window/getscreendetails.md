---
title: "Window: getScreenDetails() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/getscreendetails/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: getScreenDetails() method

The **`getScreenDetails()`** method of the
`Window` interface returns a `Promise` that fulfills with a `ScreenDetails` object instance representing the details of all the screens available to the user's device.

## Syntax

```js
getScreenDetails()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a `ScreenDetails` object instance.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if a `window-management` Permissions-Policy is set that blocks use of the Window Management API, or if the user has explicitly denied the browser's permission request to use the API.

## Examples

When `getScreenDetails()` is invoked, the user will be asked for permission to manage windows on all their displays (the status of this permission can be checked using `Permissions.query()` to query `window-management`). Provided they grant permission, the resulting `ScreenDetails` object contains details of all the screens available to the user's system.

The below example opens a full-size window on each available display.

```js
const screenDetails = await window.getScreenDetails();

// Open a full-size window on each screen available to the device
for (const screen of screenDetails.screens) {
  window.open(
    "https://example.com",
    "_blank",
    `left=${screen.availLeft},
    top=${screen.availTop},
    width=${screen.availWidth},
    height=${screen.availHeight}`,
  );
}
```

> **Note:**
> See Multi-window learning environment for a full example (see the source code also).

## See also

- Window Management API
