---
title: "NavigationCurrentEntryChangeEvent: from property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationcurrententrychangeevent/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationCurrentEntryChangeEvent: from property

The **`from`** read-only property of the `NavigationCurrentEntryChangeEvent` interface returns the `NavigationHistoryEntry` that was navigated from.

## Value

A `NavigationHistoryEntry` object.

## Examples

```js
navigation.addEventListener("currententrychange", (event) => {
  console.log(event.from);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
