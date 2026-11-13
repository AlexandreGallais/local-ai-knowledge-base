---
title: "Navigation: updateCurrentEntry() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/updatecurrententry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: updateCurrentEntry() method

The **`updateCurrentEntry()`** method of the `Navigation` interface updates the `state` of the `currentEntry`; used in cases where the state change will be independent of a navigation or reload.

## Syntax

```js
updateCurrentEntry(options)
```

### Parameters

- `options`
    An options object containing the following properties:
    - `state`
        Developer-defined information to be stored in the associated `NavigationHistoryEntry` once the navigation is complete, retrievable via `getState()`. This can be any data type. You might, for example, wish to store a page visit count for analytics purposes, or store UI state details so the view can be shown exactly as the user last left it. Any data stored in `state` must be structured-cloneable.

### Return value

None (`undefined`).

### Exceptions

- `DataCloneError` `DOMException`
    Thrown if the `state` parameter had values included in it that are not structured-cloneable.
- `InvalidStateError` `DOMException`
    Thrown if the `Navigation.currentEntry` is `null`, i.e., there is no current history entry. This could occur for example if the current page is `about:blank`.

## Examples

You could use something like the following to update the open/closed state of a `` element so that the state can be restored when reloading the page or navigating back from somewhere else.

```js
detailsElem.addEventListener("toggle", () => {
  navigation.updateCurrentEntry({ state: { detailOpen: detailsElem.open } });
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
