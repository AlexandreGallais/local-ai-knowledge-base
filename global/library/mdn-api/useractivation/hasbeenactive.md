---
title: "UserActivation: hasBeenActive property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/useractivation/hasbeenactive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UserActivation: hasBeenActive property

The read-only **`hasBeenActive`** property of the `UserActivation` interface indicates whether the current window has sticky user activation.

## Value

A boolean.

## Examples

### Checking if a user gesture was ever performed

Use the `hasBeenActive` property to check whether the user has interacted with the page since it was loaded.

```js
if (navigator.userActivation.hasBeenActive) {
  // proceed with auto-playing an animation, for example
}
```

## See also

- `UserActivation`
- `UserActivation.isActive`
- Features gated by user activation
