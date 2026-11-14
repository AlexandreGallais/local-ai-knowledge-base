---
title: "Navigation: traverseTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/traverseto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: traverseTo() method

The **`traverseTo()`** method of the `Navigation` interface navigates to the `NavigationHistoryEntry` identified by the given `key`.

## Syntax

```js
traverseTo(key)
traverseTo(key, options)
```

### Parameters

- `key`
    The `key` of the `NavigationHistoryEntry` to navigate to.
- `options` (optional)
    An options object containing the following properties:
    - `info` (optional)
        Developer-defined information to be passed along to the `navigate` event, made available in `NavigateEvent.info`. This can be any data type. You might, for example, wish to display newly-navigated content with a different animation depending on how it was navigated to (swipe left, swipe right, or go home). A string indicating which animation to use could be passed in as `info`.

### Return value

An object with the following properties:

- `committed`
    A `Promise` which will fulfill when the visible URL has changed and a new `NavigationHistoryEntry` has been created.
- `finished`
    A `Promise` which will fulfill when all promises returned by the `intercept()` handler are fulfilled. This is equivalent to the `NavigationTransition.finished` promise fulfilling, when the `navigatesuccess` event fires.

Either one of these promises rejects if the navigation has failed for some reason.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `Navigation.currentEntry`'s `NavigationHistoryEntry.index` value is -1, meaning the current `Document` is not yet active, or if the navigation history list does not contain a `NavigationHistoryEntry` with the specified key, or if the current `Document` is unloading.

## Examples

### Set up home button

```js
function initHomeBtn() {
  // Get the key of the first loaded entry
  // so the user can always go back to this view.
  const { key } = navigation.currentEntry;
  backToHomeButton.onclick = () => {
    navigation.traverseTo(key);
  };
}
// Intercept navigate events, such as link clicks, and
// replace them with single-page navigations
navigation.addEventListener("navigate", (event) => {
  event.intercept({
    async handler() {
      // Navigate to a different view,
      // but the "home" button will always work.
    },
  });
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
