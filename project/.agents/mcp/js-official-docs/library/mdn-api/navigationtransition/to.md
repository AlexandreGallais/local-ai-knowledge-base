---
title: "NavigationTransition: to property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationtransition/to/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationTransition: to property

The **`to`** read-only property of the `NavigationTransition` interface returns the `NavigationDestination` that the transition is navigating to.

This mirrors the `NavigateEvent.destination` property but, unlike that, is available outside of the `navigate` event handler. It is especially useful when calling functions prior to the URL changing (e.g., during precommit or on error).

## Value

A `NavigationDestination` object.

## Examples

### Handling a navigation error

```js
navigation.onnavigateerror = (e) => {
  if (navigation.transition?.to?.url === loginPageURL) {
    /* do something when failing to go to login page */
  }
};
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
