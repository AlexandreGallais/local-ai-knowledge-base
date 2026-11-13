---
title: "Navigation: navigateerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/navigateerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: navigateerror event

The **`navigateerror`** event of the `Navigation` interface is fired when a navigation fails.

For example, if the network is down, any `fetch()` method invoked to handle a navigation will fail, and the error will be routed to `navigateerror`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("navigateerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnavigateerror = (event) => { }
```

## Event type

An `ErrorEvent`. Inherits from `Event`.

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
