---
title: "Navigation: reload() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/reload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: reload() method

The **`reload()`** method of the `Navigation` interface reloads the current URL, updating any provided state in the history entries list.

Note that `reload()` does not trigger the `popstate` event, as this is only fired for soft navigations that cause a "traversal" of the history entries.

## Syntax

```js
reload()
reload(options)
```

### Parameters

- `options` (optional)
    An options object containing the following properties:
    - `state` (optional)
        Developer-defined information to be stored in the associated `NavigationHistoryEntry` once the navigation is complete, retrievable via `getState()`.
        This can be any data type. You might, for example, wish to store a page visit count for analytics purposes, or store UI state details so the view can be shown exactly as the user last left it.
        Any data stored in `state` must be structured-cloneable.
    - `info` (optional)
        Developer-defined information to be passed along to the `navigate` event, made available in `NavigateEvent.info`.
        This can be any data type. You might, for example, wish to display newly-navigated content with a different animation depending on how it was navigated to (swipe left, swipe right, or go home).
        A string indicating which animation to use may be passed in as `info`.

### Return value

An object with the following properties:

- `committed`
    A `Promise` which will fulfill when the visible URL has changed and a new `NavigationHistoryEntry` has been created.
- `finished`
    A `Promise` which will fulfill when all promises returned by the `intercept()` handler are fulfilled. This is equivalent to the `NavigationTransition.finished` promise fulfilling, when the `navigatesuccess` event fires.

Either one of these promises rejects if the navigation has failed for some reason.

### Exceptions

- `DataCloneError` `DOMException`
    Thrown if the `state` parameter had values included in it that are not structured-cloneable.

## Examples

### Using info and state

```js
async function handleReload() {
  await navigation.reload({
    info: { animation: "fade-in" },
    state: { infoPaneOpen: true },
  }).finished;

  // Update application state
  // …
}
```

Reload page and add a new state item:

```js
async function handleReload() {
  await navigation.reload({
    state: { ...navigation.currentEntry.getState(), newState: 3 },
  }).finished;

  // Update application state
  // …
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
