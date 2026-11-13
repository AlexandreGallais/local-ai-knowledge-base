---
title: "NavigationCurrentEntryChangeEvent: navigationType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationcurrententrychangeevent/navigationtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationCurrentEntryChangeEvent: navigationType property

The **`navigationType`** read-only property of the `NavigationCurrentEntryChangeEvent` interface returns the type of the navigation that resulted in the change. The property may be `null` if the change occurs due to `Navigation.updateCurrentEntry()`.

## Value

An enumerated value representing the type of navigation.

The possible values are:

- `push`: A new location is navigated to, causing a new entry to be pushed onto the history list.
- `reload`: The `Navigation.currentEntry` is reloaded.
- `replace`: The `Navigation.currentEntry` is replaced with a new history entry. This new entry will reuse the same `key`, but be assigned a different `id`.
- `traverse`: The browser navigates from one existing history entry to another existing history entry.

## Examples

```js
navigation.addEventListener("currententrychange", (event) => {
  console.log(event.navigationType);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
