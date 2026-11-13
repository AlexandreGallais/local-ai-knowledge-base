---
title: "NavigationHistoryEntry: sameDocument property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/samedocument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: sameDocument property

The **`sameDocument`** read-only property of the `NavigationHistoryEntry` interface returns `true` if this history entry is for the same `document` as the current `Document` value and current document is fully active, or `false` otherwise.

## Value

A boolean.

## Examples

```js
const current = navigation.currentEntry;
console.log(current.sameDocument);
// Will always return true
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
