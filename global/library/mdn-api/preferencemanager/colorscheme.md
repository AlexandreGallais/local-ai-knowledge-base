---
title: "PreferenceManager: colorScheme property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferencemanager/colorscheme/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceManager: colorScheme property

The **`colorScheme`** read-only property of the `PreferenceManager` interface returns a `PreferenceObject` used to override the user's preference for the color scheme of the site.

Valid `colorScheme` `PreferenceObject.value` settings are `dark` and `light`.

## Value

A `PreferenceObject` used to override the user's preference for the color scheme of the site.

## Examples

### Basic usage

This example demonstrates how to query the user's preferred color scheme.

```js
if (navigator.preferences.colorScheme.value === "dark") {
  // The user prefers a dark color scheme.
} else {
  // The user prefers a light color scheme.
}
```
