---
title: "UserActivation: isActive property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/useractivation/isactive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UserActivation: isActive property

The read-only **`isActive`** property of the `UserActivation` interface indicates whether the current window has transient user activation.

## Value

A boolean.

## Examples

### Checking if a user gesture was recently performed

Use the `isActive` property to check whether the user is currently interacting with the page.

```js
if (navigator.userActivation.isActive) {
  // proceed to request playing media, for example
}
```

## See also

- `UserActivation`
- `UserActivation.hasBeenActive`
- Features gated by user activation
