---
title: "NavigationDestination: sameDocument property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationdestination/samedocument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationDestination: sameDocument property

The **`sameDocument`** read-only property of the
`NavigationDestination` interface returns `true` if the navigation is to the same `document` as the current `Document` value, or `false` otherwise.

This is useful for checking whether the navigation will be same-document or cross-document.

## Value

A boolean.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.destination.sameDocument);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
