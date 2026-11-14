---
title: "NavigationCurrentEntryChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationcurrententrychangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationCurrentEntryChangeEvent

The **`NavigationCurrentEntryChangeEvent`** interface of the `Navigation API` is the event object for the `currententrychange` event, which fires when the `Navigation.currentEntry` has changed.

This event will fire for same-document navigations (e.g., `back()` or `traverseTo()`), replacements (i.e., a `navigate()` call with `history` set to `replace`), or other calls that change the entry's state (e.g., `updateCurrentEntry()`, or the `History API`'s `History.replaceState()`).

This event fires after the navigation is committed, meaning that the visible URL has changed and the `NavigationHistoryEntry` update has occurred. It is useful for migrating from usage of older API features like the `hashchange` or `popstate` events.

## Constructor

- `NavigationCurrentEntryChangeEvent()`
    Creates a new `NavigationCurrentEntryChangeEvent` object instance.

## Instance properties

_Inherits properties from its parent, `Event`._

- `from` (read-only)
    Returns the `NavigationHistoryEntry` that was navigated from.
- `navigationType` (read-only)
    Returns the type of the navigation that resulted in the change.

## Examples

Navigation data reporting:

```js
navigation.addEventListener("currententrychange", () => {
  const data = navigation.currentEntry.getState();
  submitAnalyticsData(data.analytics);
});
```

Setting up a per-entry event:

```js
navigation.addEventListener("currententrychange", () => {
  navigation.currentEntry.addEventListener("dispose", genericDisposeHandler);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
- Navigation API live demo (view demo source)
