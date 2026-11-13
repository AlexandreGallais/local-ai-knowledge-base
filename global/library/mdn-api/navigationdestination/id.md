---
title: "NavigationDestination: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationdestination/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationDestination: id property

The **`id`** read-only property of the
`NavigationDestination` interface returns the `id` value of the destination `NavigationHistoryEntry` if the `NavigateEvent.navigationType` is `traverse`, or an empty string otherwise.

The `id` is a unique, UA-generated value that always represents the history entry, useful to correlate a history entry with an external resource such as a storage cache.

## Value

A string representing the `id` of the destination `NavigationHistoryEntry`, or an empty string.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.destination.id);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
