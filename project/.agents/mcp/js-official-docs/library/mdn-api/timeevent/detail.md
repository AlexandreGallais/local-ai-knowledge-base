---
title: "TimeEvent: detail property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/timeevent/detail/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TimeEvent: detail property

The **`TimeEvent.detail`** read-only property provides contextual information about the event, depending on the event type.

For `repeatEvent` events, `detail` contains the current repeat iteration as a non-negative integer. Because the event is not raised for the first iteration, the value will always be 1 or greater.

For `beginEvent` and `endEvent` events, `detail` is always `0`.

## Value

A `long`.

## See also

- `TimeEvent`
