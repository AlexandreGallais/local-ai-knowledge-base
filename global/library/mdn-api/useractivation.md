---
title: "UserActivation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/useractivation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UserActivation

The **`UserActivation`** interface provides information about whether a user is currently interacting with the page, or has completed an interaction since page load.

This API is only available in the window context and not exposed to workers.

## Instance properties

- `UserActivation.hasBeenActive` (read-only)
    Indicates whether the current window has sticky user activation.
- `UserActivation.isActive` (read-only)
    Indicates whether the current window has transient user activation.

## Description

An object of this type is accessed via the `navigator.userActivation` property, and can be used to query information about a window's user activation state.

A user activation either implies that the user is currently interacting with the page, or has completed an interaction since page load.
User activation can be triggered by a button click, pointer touch, or some other user interaction with the page.

There are two kinds of window user activation states:

- Transient activation (user is currently interacting with the page) and
- Sticky activation (user has interacted at least once since page load).

See Features gated by user activation for more information and a list of APIs that require either sticky or transient user activation.

## Examples

### Checking if a user gesture was recently performed

Use `navigator.userActivation` to access the `UserActivation` object, and then `UserActivation.isActive` to check whether the user is currently interacting with the page (Transient activation).

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

- `navigator.userActivation`
- Features gated by user activation
