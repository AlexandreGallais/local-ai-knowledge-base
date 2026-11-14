---
title: "PreferenceObject: validValues property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/validvalues/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject: validValues property

The **`validValues`** read-only property of the `PreferenceObject` interface returns a read-only array of values that are accepted by the override.

## validValues

An array containing the valid values to override the `PreferenceObject` value with.

## Examples

### Basic usage

This example demonstrates how to log all possible contrast values.

```js
console.log(navigator.preferences.contrast.validValues);
```
