---
title: "PreferenceManager: contrast property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferencemanager/contrast/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceManager: contrast property

The **`contrast`** read-only property of the `PreferenceManager` interface returns a `PreferenceObject` used to override the user's preference for the contrast of the site.

Valid `contrast` `PreferenceObject.value` settings are `more`, `less`, and `no-preference`.

## Value

A `PreferenceObject` used to override the user's preference for the contrast of the site.

## Examples

### Basic usage

This example demonstrates how to query the user's contrast preference.

```js
if (navigator.preferences.contrast.value === "more") {
  // The user prefers a high color contrast.
} else if (navigator.preferences.contrast.value === "less") {
  // The user prefers a low color contrast.
} else {
  // The user has stated no preference regarding color contrast.
}
```
