---
title: "PreferenceObject: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject: value property

The **`value`** read-only property of the `PreferenceManager` interface returns the override value of a preference if one is set, or the UA-defined value if an override value is not set.

## Value

The override of the `PreferenceObject` interface if one is set, or the UA-defined value otherwise.

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
