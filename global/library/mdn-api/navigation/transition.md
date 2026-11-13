---
title: "Navigation: transition property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/transition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: transition property

The **`transition`** read-only property of the `Navigation` interface returns a `NavigationTransition` object representing the status of an in-progress navigation, which can be used to track it.

`Navigation.transition` is only populated while the `intercept()` handler is unresolved (i.e., during a navigation interception), and is otherwise `null`.

## Value

A `NavigationTransition` object, or `null` if no navigation is currently in progress.

## Examples

```js
async function handleTransition() {
  if (navigation.transition) {
    showLoadingSpinner();
    await navigation.transition.finished;
    hideLoadingSpinner();
  }
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
