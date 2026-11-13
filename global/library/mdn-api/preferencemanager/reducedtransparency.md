---
title: "PreferenceManager: reducedTransparency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferencemanager/reducedtransparency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceManager: reducedTransparency property

The **`reducedTransparency`** read-only property of the `PreferenceManager` interface returns the `PreferenceObject` used to override the user's preference for the reduced transparency of the site.

Valid `reducedTransparency` `PreferenceObject.value` settings are `reduce` and `no-preference`.

## Value

A `PreferenceObject` used to override the user's preference for the reduced transparency of the site.

## Examples

### Basic usage

This example demonstrates how to query the user's reduced transparency preference.

```js
if (navigator.preferences.reducedTransparency.value === "reduce") {
  // The user prefers reduced transparency.
} else {
  // The user has stated no preference regarding transparency.
}
```
