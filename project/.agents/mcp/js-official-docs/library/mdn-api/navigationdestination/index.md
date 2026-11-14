---
title: "NavigationDestination: index property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationdestination/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationDestination: index property

The **`index`** read-only property of the
`NavigationDestination` interface returns the `index` value of the destination `NavigationHistoryEntry` if the `NavigateEvent.navigationType` is `traverse`, or `-1` otherwise.

## Value

A number representing the `index` of the destination `NavigationHistoryEntry`, or -1.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.destination.index);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
