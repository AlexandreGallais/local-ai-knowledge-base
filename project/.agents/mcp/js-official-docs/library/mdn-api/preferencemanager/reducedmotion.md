---
title: "PreferenceManager: reducedMotion property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferencemanager/reducedmotion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceManager: reducedMotion property

The **`reducedMotion`** read-only property of the `PreferenceManager` interface returns the `PreferenceObject` used to override the user's preference for the reduced motion of the site.

Valid `reducedMotion` `PreferenceObject.value` settings are `reduce` and `no-preference`.

## Value

A `PreferenceObject` used to override the user's preference for the reduced motion of the site.

## Examples

### Basic usage

This example demonstrates how to query the user's reduced motion preference.

```js
if (navigator.preferences.reducedMotion.value === "reduce") {
  // The user prefers reduced motion.
} else {
  // The user has stated no preference regarding motion.
}
```
