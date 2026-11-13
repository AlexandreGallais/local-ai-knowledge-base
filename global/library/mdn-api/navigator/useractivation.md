---
title: "Navigator: userActivation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/useractivation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: userActivation property

The read-only **`userActivation`** property of the `Navigator` interface returns a `UserActivation` object which contains information about the current window's user activation state.

## Value

A `UserActivation` object.

## Examples

### Checking if a user gesture was recently performed

Use `UserActivation.isActive` to check whether the user is currently interacting with the page (Transient activation).

```js
if (navigator.userActivation.isActive) {
  // proceed to request playing media, for example
}
```

### Checking if a user gesture was ever performed

Use `UserActivation.hasBeenActive` to check whether the user has ever interacted with the page (Sticky activation).

```js
if (navigator.userActivation.hasBeenActive) {
  // proceed with auto-playing an animation, for example
}
```

## See also

- `UserActivation`
- `UserActivation.hasBeenActive`
- `UserActivation.isActive`
- Features gated by user activation
