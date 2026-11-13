---
title: "NavigationDestination: key property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationdestination/key/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationDestination: key property

The **`key`** read-only property of the
`NavigationDestination` interface returns the `key` value of the destination `NavigationHistoryEntry` if the `NavigateEvent.navigationType` is `traverse`, or an empty string otherwise.

The `key` is a unique, UA-generated value that represents the history entry's slot in the history entries list, used to navigate to this place in the history via `Navigation.traverseTo()`. It will be reused by other entries that replace the entry in the list (i.e., if the `NavigateEvent.navigationType` is `replace`).

## Value

A string representing the `key` of the destination `NavigationHistoryEntry`, or an empty string.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.destination.key);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
