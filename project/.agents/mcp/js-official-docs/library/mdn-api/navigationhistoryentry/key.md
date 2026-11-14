---
title: "NavigationHistoryEntry: key property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/key/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: key property

The **`key`** read-only property of the `NavigationHistoryEntry` interface returns the `key` of the history entry, or an empty string if current document is not fully active. This is a unique, UA-generated value that represents the history entry's slot in the entries list. It is used to navigate that particular slot via `Navigation.traverseTo()`. The `key` will be reused by other entries that replace the entry in the list (that is, if the `NavigateEvent.navigationType` is `replace`).

This differs from the `id` of a history entry. The `id` is a unique, UA-generated value that always represents a specific history entry rather than its slot in the entries list. This is useful to correlate it with an external resource such as a storage cache.

## Value

A string representing the `key` of the `NavigationHistoryEntry`.

## Examples

### Basic usage

```js
const current = navigation.currentEntry;
console.log(current.key);
```

### Set up a home button

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
