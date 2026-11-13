---
title: "PreferenceObject: override property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/override/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject: override property

The **`override`** read-only property of the `PreferenceObject` interface returns the override of a preference if one is set, `null` otherwise.

## Value

The override of the `PreferenceObject` interface, if set, or `null` if an override is not set.

## Basic usage

This example demonstrates how to disambiguate between the color scheme preference set by the user agent vs a programmatic override.

```js
if (navigator.preferences.colorScheme.override === null) {
  console.log(
    "The user agent set the following color scheme:",
    navigator.preferences.colorScheme.value,
  );
} else {
  console.log(
    "The following color scheme was set programmatically:",
    navigator.preferences.colorScheme.override,
  );
}
```
