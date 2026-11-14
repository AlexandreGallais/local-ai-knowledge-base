---
title: "NavigationHistoryEntry: dispose event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/dispose_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: dispose event

The **`dispose`** event of the `NavigationHistoryEntry` interface is fired when the entry is no longer part of the history entry list.

Disposal occurs when:

- Forward history entries are cleared. See the example at Notifications on entry disposal for more information.
- The user clears their browser history using settings or provided UI controls.
- The history limit is exceeded. This is not specified anywhere, but browsers tend to have a history limit of 50 pages.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("dispose", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondispose = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
navigation.addEventListener("currententrychange", () => {
  navigation.currentEntry.addEventListener("dispose", disposeHandler);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
