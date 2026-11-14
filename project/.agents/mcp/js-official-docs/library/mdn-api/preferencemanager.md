---
title: "PreferenceManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferencemanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceManager

The **`PreferenceManager`** interface of the User Preferences API provides access to `PreferenceObject` objects used to query and modify user preferences.

The `PreferenceManager` for the current document can be accessed via the `Navigator.preferences` property.

The `PreferenceManager` interface inherits from `EventTarget`.

## Instance properties

- `PreferenceManager.colorScheme` (read-only) (experimental)
    A `PreferenceObject` used to override the user's preference for the color scheme of the site.
- `PreferenceManager.contrast` (read-only) (experimental)
    A `PreferenceObject` used to override the user's preference for the contrast of the site.
- `PreferenceManager.reducedMotion` (read-only) (experimental)
    A `PreferenceObject` used to override the user's preference for the reduced motion of the site.
- `PreferenceManager.reducedTransparency` (read-only) (experimental)
    A `PreferenceObject` used to override the user's preference for the reduced transparency of the site.
- `PreferenceManager.reducedData` (read-only) (experimental)
    A `PreferenceObject` used to override the user's preference for the reduced data of the site.

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
