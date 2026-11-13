---
title: "PopStateEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popstateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PopStateEvent

**`PopStateEvent`** is an interface for the `popstate` event.

A `popstate` event is dispatched to the window every time the active history
entry changes between two history entries for the same document. If the history entry
being activated was created by a call to `history.pushState()` or was
affected by a call to `history.replaceState()`, the `popstate`
event's `state` property contains a copy of the history entry's state object.

## Constructor

- `PopStateEvent()`
    Creates a new `PopStateEvent` object.

## Instance properties

_This interface also inherits the properties of its parent, `Event`._

- `PopStateEvent.state` (read-only)
    Returns a copy of the information that was provided to `pushState()` or `replaceState()`.
- `hasUAVisualTransition` (read-only)
    Returns `true` if the user agent performed a visual transition for this navigation before dispatching this event, or `false` otherwise.

## Instance methods

_This interface has no methods of its own, but inherits the methods of its parent, `Event`._

## See also

- `popstate` event
- `hashchange` event
