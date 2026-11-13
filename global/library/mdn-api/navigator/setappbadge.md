---
title: "Navigator: setAppBadge() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/setappbadge/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: setAppBadge() method

The **`setAppBadge()`** method of the `Navigator` interface sets a badge on the icon associated with this app. If a value is passed to the method, this will be set as the value of the badge. Otherwise the badge will display as a dot, or other indicator as defined by the platform.

## Syntax

```js
setAppBadge()
setAppBadge(contents)
```

### Parameters

- `contents` (optional)
    A `Number` which will be used as the value of the badge. If `contents` is `0` then the badge will be set to `nothing`, indicating a cleared badge.

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

In the example below an unread count is passed to `setAppBadge()`. The badge should then display `30`.

```js
const unread = 30;
navigator.setAppBadge(unread);
```

## See also

- Badging for app icons
