---
title: "NavigationTransition: committed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationtransition/committed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationTransition: committed property

The **`committed`** read-only property of the
`NavigationTransition` interface returns a `Promise` that fulfills when `Navigation.currentEntry` is updated and the new URL is displayed in the browser, marking the navigation as committed. This happens after all precommit handlers for the navigation are fulfilled.

The `committed` promise rejects if any precommit handler rejects.

## Value

A `Promise` that resolves to `undefined`.

## Examples

```js
async function lockInNavigation() {
  await navigation.transition.committed;
  // Navigation has committed successfully
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
