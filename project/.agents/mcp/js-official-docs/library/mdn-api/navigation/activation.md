---
title: "Navigation: activation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/activation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: activation property

The **`activation`** read-only property of the `Navigation` interface returns a `NavigationActivation` object containing information about the most recent cross-document navigation, which "activated" this Document. The property will stay constant during same-document navigations.

## Value

A `NavigationActivation` object, or `null` if current document is the initial `about:blank` document.

## Examples

```js
if (navigation.activation) {
  console.log(navigation.activation.entry.url);
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
