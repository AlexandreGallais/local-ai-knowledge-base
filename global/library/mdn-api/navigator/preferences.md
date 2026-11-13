---
title: "Navigator: preferences property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/preferences/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: preferences property

The **`preferences`** read-only property of the `Navigator` interface returns a `PreferenceManager` object for the current document. This is the entry point for the User Preferences API functionality.

## Value

A `PreferenceManager` object.

## Examples

### Get color scheme preference

This example demonstrates how to query the user's preferred color scheme.

```js
if (navigator.preferences.colorScheme.value === "dark") {
  // The user prefers a dark color scheme.
} else {
  // The user prefers a light color scheme.
}
```

## See also

- User Preferences API
