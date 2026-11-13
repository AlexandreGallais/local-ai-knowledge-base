---
title: "TimeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/timeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TimeEvent

The **`TimeEvent`** interface, a part of SVG SMIL animation, provides specific contextual information associated with Time events.

## Instance properties

- `TimeEvent.detail` (read-only)
    A `long` that specifies some detail information about the Event, depending on the type of the event. For this event type, indicates the repeat number for the animation.
- `TimeEvent.view` (read-only)
    A WindowProxy that identifies the Window from which the event was generated.

## Instance methods

- `TimeEvent.initTimeEvent()`
    Initializes the value of a `TimeEvent` created using `Document.createEvent()`.
