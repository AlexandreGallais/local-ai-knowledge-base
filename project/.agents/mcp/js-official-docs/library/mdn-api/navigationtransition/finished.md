---
title: "NavigationTransition: finished property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationtransition/finished/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationTransition: finished property

The **`finished`** read-only property of the
`NavigationTransition` interface returns a `Promise` that fulfills at the same time the `navigatesuccess` event fires, or rejects at the same time the `navigateerror` event fires.

## Value

A `Promise` that resolves to `undefined`.

## Examples

```js
async function cleanupNavigation() {
  await navigation.transition.finished;
  // Navigation has completed successfully
  // Cleanup any ongoing monitoring
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
