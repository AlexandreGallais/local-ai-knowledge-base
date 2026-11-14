---
title: "Window: pagehide event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/pagehide_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: pagehide event

The **`pagehide`** event is sent to a `Window` when the browser hides the current page in the process of presenting a different page from the session's history.

For example, when the user clicks the browser's Back button, the current page receives a `pagehide` event before the previous page is shown.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pagehide", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpagehide = (event) => { }
```

## Event type

A `PageTransitionEvent`. Inherits from `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `onpagehide` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Usage notes

Like the `unload` and `beforeunload` events, this event is not reliably fired by browsers, especially on mobile. For example, the `pagehide` event is not fired at all in the following scenario:

1. A mobile user visits your page.
2. The user then switches to a different app.
3. Later, the user closes the browser from the app manager.

However, this event is compatible with the back/forward cache (bfcache), so adding a listener to it doesn't prevent the page from being included in the bfcache.

The best event to use to signal the end of a user's session is the `visibilitychange` event. In browsers that don't support `visibilitychange` the `pagehide` event is the next-best alternative.

If you're specifically trying to detect page unload events, the `pagehide` event is the best option.

See the Page Lifecycle API guide for more information about how this event relates to other events in the page lifecycle.

## Examples

In this example, an event handler is established to watch for `pagehide` events and to perform special handling if the page is being persisted for possible reuse.

```js
window.addEventListener("pagehide", (event) => {
  if (event.persisted) {
    /* the page isn't being discarded, so it can be reused later */
  }
});
```

This can also be written using the `onpagehide` event handler property on the `Window` (but note that this replaces other event listeners added using `onpagehide`, if any):

```js
window.onpagehide = (event) => {
  if (event.persisted) {
    /* the page isn't being discarded, so it can be reused later */
  }
};
```

## See also

- The `pageshow` event.
- Page Lifecycle API gives best-practices guidance on handling page lifecycle behavior in your web applications.
- PageLifecycle.js: a JavaScript library that deals with cross-browser inconsistencies in page lifecycle behavior.
- Back/forward cache explains what the back/forward cache is, and its implications for various page lifecycle events.
