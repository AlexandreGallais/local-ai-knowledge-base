---
title: "NavigationHistoryEntry: index property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: index property

The **`index`** read-only property of the `NavigationHistoryEntry` interface returns the index of the history entry in the history entries list (that is, the list returned by `Navigation.entries()`), or `-1` if the entry does not appear in the list or if current document is not fully active.

## Value

A number representing the `index` of the entry in the history entries list, or `-1` if this item does not appear in the list.

## Examples

```js
const current = navigation.currentEntry;
console.log(current.index);
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
