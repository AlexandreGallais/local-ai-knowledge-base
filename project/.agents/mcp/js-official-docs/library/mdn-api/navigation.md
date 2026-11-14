---
title: "Navigation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation

The **`Navigation`** interface of the `Navigation API` allows control over all navigation actions for the current `window` in one central place, including initiating navigations programmatically, examining navigation history entries, and managing navigations as they happen.

It is accessed via the `Window.navigation` property.

The Navigation API only exposes history entries created in the current browsing context that have the same origin as the current page (e.g., not navigations inside embedded ``s, or cross-origin navigations), providing an accurate list of all previous history entries just for your app. This makes traversing the history a much less fragile proposition than with the older `History API`.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `activation` (read-only)
    Returns a `NavigationActivation` object containing information about the most recent cross-document navigation, which "activated" this Document.
- `canGoBack` (read-only)
    Returns `true` if it is possible to navigate backwards in the navigation history
    (i.e., the `currentEntry` is not the first one in the history entry list),
    and `false` if it is not.
- `canGoForward` (read-only)
    Returns `true` if it is possible to navigate forwards in the navigation history
    (i.e., the `currentEntry` is not the last one in the history entry list),
    and `false` if it is not.
- `currentEntry` (read-only)
    Returns a `NavigationHistoryEntry` object representing the location the user is currently
    navigated to right now.
- `transition` (read-only)
    Returns a `NavigationTransition` object representing the status of an in-progress navigation,
    which can be used to track it. Returns `null` if no navigation is currently in progress.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `back()`
    Navigates backwards by one entry in the navigation history.
- `entries()`
    Returns an array of `NavigationHistoryEntry` objects representing all existing history entries.
- `forward()`
    Navigates forwards by one entry in the navigation history.
- `navigate()`
    Navigates to a specific URL, updating any provided state in the history entries list.
- `reload()`
    Reloads the current URL, updating any provided state in the history entries list.
- `traverseTo()`
    Navigates to a specific `NavigationHistoryEntry` identified by `key`.
- `updateCurrentEntry()`
    Updates the state of the `currentEntry`; used
    in cases where the state change will be independent from a navigation or reload.

## Events

_Inherits events from its parent, `EventTarget`._

- `currententrychange`
    Fired when the `Navigation.currentEntry` has changed.
- `navigate`
    Fired when any type of navigation is initiated, allowing you to intercept as required.
- `navigateerror`
    Fired when a navigation fails.
- `navigatesuccess`
    Fired when a successful navigation has finished.

## Examples

### Moving forwards and backwards in the history

```js
async function backHandler() {
  if (navigation.canGoBack) {
    await navigation.back().finished;
    // Handle any required clean-up after
    // navigation has finished
  } else {
    displayBanner("You are on the first page");
  }
}

async function forwardHandler() {
  if (navigation.canGoForward) {
    await navigation.forward().finished;
    // Handle any required clean-up after
    // navigation has finished
  } else {
    displayBanner("You are on the last page");
  }
}
```

### Traversing to a specific history entry

```js
// On JS startup, get the key of the first loaded page
// so the user can always go back there.
const { key } = navigation.currentEntry;
backToHomeButton.onclick = () => navigation.traverseTo(key);

// Navigate away, but the button will always work.
await navigation.navigate("/another_url").finished;
```

### Navigating and updating state

```js
navigation.navigate(url, { state: newState });
```

Or

```js
navigation.reload({ state: newState });
```

Or if the state is independent from a navigation or reload:

```js
navigation.updateCurrentEntry({ state: newState });
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
- Navigation API live demo (view demo source)
