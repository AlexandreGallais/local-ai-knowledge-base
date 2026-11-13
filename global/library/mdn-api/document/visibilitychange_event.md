---
title: "Document: visibilitychange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/visibilitychange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: visibilitychange event

The `visibilitychange` event is fired at the document when its visibility status changes — for example, when the user switches browser tabs, navigates to a new page, minimizes or closes the browser, or on mobile, switches to a different app.

The event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("visibilitychange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvisibilitychange = (event) => { }
```

## Event type

A generic `Event`.

## Usage notes

The event doesn't include the document's updated visibility status, but you can get that information from the document's `visibilityState` property.

This event fires with a `visibilityState` of `hidden` when a user navigates to a new page, switches tabs, closes the tab, minimizes or closes the browser, or, on mobile, switches from the browser to a different app. Transitioning to `hidden` is the last event that's reliably observable by the page, so developers should treat it as the likely end of the user's session (for example, for sending analytics data).

The transition to `hidden` is also a good point at which pages can stop making UI updates and stop any tasks that the user doesn't want to have running in the background.

## Examples

### Pausing music on transitioning to hidden

This example pauses playing audio when the page is hidden and resumes playing when the page becomes visible again.
For a full example, see the Page Visibility API: Pausing audio on page hide documentation.

```js
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    playingOnHide = !audio.paused;
    audio.pause();
  } else if (playingOnHide) {
    // Resume playing if audio was "playing on hide"
    audio.play();
  }
});
```

### Sending end-of-session analytics on transitioning to hidden

This example treats the transition to `hidden` as the end of the user's session, and sends the appropriate analytics using the `Navigator.sendBeacon()`
API:

```js
document.onvisibilitychange = () => {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon("/log", analyticsData);
  }
};
```

## See also

- Page Visibility API
- `Document.visibilityState`
- `Document.hidden`
- Don't lose user and app state, use Page Visibility explains in detail why you should use `visibilitychange`, not `beforeunload`/`unload`.
- Page Lifecycle API gives best-practices guidance on handling page lifecycle behavior in your web applications.
