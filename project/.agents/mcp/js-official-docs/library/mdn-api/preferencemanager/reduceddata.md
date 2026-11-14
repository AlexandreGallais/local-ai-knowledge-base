---
title: "PreferenceManager: reducedData property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferencemanager/reduceddata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceManager: reducedData property

The **`reducedData`** read-only property of the `PreferenceManager` interface returns a `PreferenceObject` used to override the user's preference for the reduced data of the site.

Valid `reducedData` `PreferenceObject.value` settings are `reduce` and `no-preference`.

## Value

A `PreferenceObject` used to override the user's preference for the reduced data of the site.

## Examples

### Basic usage

This example demonstrates how to query the user's reduced data preference.

```js
if (navigator.preferences.reducedData.value === "reduce") {
  // The user prefers you use less data.
} else {
  // The user has stated no preference regarding data use.
}
```
