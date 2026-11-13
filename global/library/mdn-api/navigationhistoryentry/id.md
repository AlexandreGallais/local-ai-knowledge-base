---
title: "NavigationHistoryEntry: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: id property

The **`id`** read-only property of the `NavigationHistoryEntry` interface returns the `id` of the history entry, or an empty string if current document is not fully active. This is a unique, UA-generated value that always represents a specific history entry, useful to correlate it with an external resource such as a storage cache.

This differs from the `key` of a history entry. The `key` is a unique, UA-generated value that represents the history entry's slot in the entries list rather than the entry itself. It is used to navigate that particular slot via `Navigation.traverseTo()`. The `key` will be reused by other entries that replace the entry in the list (that is, if the `NavigateEvent.navigationType` is `replace`).

## Value

A string representing the `id` of the `NavigationHistoryEntry`.

## Examples

```js
const current = navigation.currentEntry;
console.log(current.id);
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
