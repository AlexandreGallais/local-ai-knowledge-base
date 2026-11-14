---
title: "NavigationTransition"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationtransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationTransition

The **`NavigationTransition`** interface of the `Navigation API` represents an ongoing navigation — a navigation that hasn't yet reached the `navigatesuccess` or `navigateerror` stage.

It is accessed via the `Navigation.transition` property.
Note that this property is only populated while the `intercept()` handler is unresolved (i.e., during a navigation interception), and is otherwise `null`.

## Instance properties

- `committed` (read-only)
    Returns a `Promise` that fulfills when `Navigation.currentEntry` is updated and the new URL is displayed in the browser, marking the navigation as committed.
- `finished` (read-only)
    Returns a `Promise` that fulfills at the same time the `navigatesuccess` event fires, or rejects at the same time the `navigateerror` event fires.
- `from` (read-only)
    Returns the `NavigationHistoryEntry` that the transition is coming from.
- `navigationType` (read-only)
    Returns the type of the ongoing navigation.
- `to` (read-only) (experimental)
    Returns the `NavigationDestination` that the transition is navigating to.

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
- Navigation API live demo (view demo source)
