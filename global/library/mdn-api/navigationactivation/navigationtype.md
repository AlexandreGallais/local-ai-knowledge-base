---
title: "NavigationActivation: navigationType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationactivation/navigationtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationActivation: navigationType property

The **`navigationType`** read-only property of the `NavigationActivation` interface contains a string indicating the type of navigation.

## Value

A string representing the type of navigation the `NavigationActivation` relates to. Possible values are:

- `push`: A new location was navigated to, causing a new entry to be pushed onto the history list.
- `reload`: The `NavigationActivation.entry` was reloaded.
- `replace`: The `NavigationActivation.entry` was replaced with a new history entry. This new entry will reuse the same `key`, but be assigned a different `id`.
- `traverse`: The browser navigated from one existing history entry to another existing history entry.

## Examples

```js
window.addEventListener("pageswap", (event) => {
  // For example, the page was hidden, or the navigation is cross-document.
  if (!event.viewTransition) return;

  // Skip the view transition for back/forward navigations.
  if (event.activation.navigationType === "traverse") {
    event.viewTransition.skipTransition();
  }
});
```

## See also

- Navigation API
- View Transition API
