---
title: "WorkerNavigator: clearAppBadge() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/clearappbadge/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: clearAppBadge() method

The **`clearAppBadge()`** method of the `WorkerNavigator` interface clears a badge on the current app's icon by setting it to `nothing`. The value `nothing` indicates that no badge is currently set, and the status of the badge is _cleared_.

## Syntax

```js
clearAppBadge()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the document is not fully active.
- `SecurityError` `DOMException`
    Thrown if the call was blocked by the same-origin policy.
- `NotAllowedError` `DOMException`
    Thrown if `PermissionStatus.state` is not `granted`.

## Examples

Once all messages in an application have been read, call `clearAppBadge()` to clear the badge and remove the notification.

```js
navigator.clearAppBadge();
```

## See also

- Badging for app icons
