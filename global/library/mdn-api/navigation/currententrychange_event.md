---
title: "Navigation: currententrychange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/currententrychange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: currententrychange event

The **`currententrychange`** event of the `Navigation` interface is fired when the `Navigation.currentEntry` has changed.

This event will fire for:

- Same-document navigations (e.g., `back()` or `traverseTo()`).

- Replacements (i.e., a `navigate()` call with `history` set to `replace`).

- Other calls that change the entry's state (e.g., `updateCurrentEntry()`, or the `History API`'s `History.replaceState()`).

This event fires after the navigation is committed, meaning that the visible URL has changed and the `NavigationHistoryEntry` update has occurred. It is useful for migrating from usage of older API features like the `hashchange` or `popstate` events.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("currententrychange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncurrententrychange = (event) => { }
```

## Event type

A `NavigationCurrentEntryChangeEvent`. Inherits from `Event`.

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
