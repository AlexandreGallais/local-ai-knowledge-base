---
title: "Screen: isExtended property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/isextended/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: isExtended property

The **`isExtended`** read-only property of the
`Screen` interface returns `true` if the user's device has multiple screens, and `false` if not.

This property is typically accessed via `window.screen.isExtended`, and can be used to test whether multiple screens are available before attempting to create a multi-window, multi-screen layout using the Window Management API.

## Value

A boolean value — `true` if the device has multiple screens, and `false` if not.

> **Note:**
> If a `window-management` Permissions-Policy is set that blocks use the Window Management API, `isExtended` will always return `false`.

## Examples

```js
if (window.screen.isExtended) {
  // Create multi-screen window layout
} else {
  // Create single-screen window layout
}
```

## See also

- Window Management API
