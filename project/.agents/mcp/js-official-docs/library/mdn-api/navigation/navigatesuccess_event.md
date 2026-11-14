---
title: "Navigation: navigatesuccess event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/navigatesuccess_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: navigatesuccess event

The **`navigatesuccess`** event of the `Navigation` interface is fired when a successful navigation has finished.

In the case of an intercepted navigation, this would occur after any promises returned by your `intercept()` handler are fulfilled. The `NavigationTransition.finished` promise will also fulfill at the same time.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("navigatesuccess", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnavigatesuccess = (event) => { }
```

## Event type

A generic `Event`.

## Examples

You might deal with a successful navigation by hiding a previously displayed progress indicator, like this:

```js
navigation.addEventListener("navigatesuccess", (event) => {
  loadingIndicator.hidden = true;
});
```

Or you might show an error message on failure:

```js
navigation.addEventListener("navigateerror", (event) => {
  loadingIndicator.hidden = true; // also hide indicator
  showMessage(`Failed to load page: ${event.message}`);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
