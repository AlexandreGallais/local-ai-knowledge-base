---
title: "InterestEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interestevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InterestEvent

The **`InterestEvent`** interface represents an event that fires when interest is shown or lost on an interest invoker.

This is the event object for the `interest` and `loseinterest` events, which fire on the target element when interest is shown or lost, respectively.

## Constructor

- `InterestEvent()` (experimental) (non-standard)
    Creates an `InterestEvent` object.

## Instance properties

_This interface inherits properties from its parent, `Event`._

- `InterestEvent.source` (read-only) (experimental) (non-standard)
    An `Element` object instance that represents the interest invoker element on which interest was shown or lost to fire the event.

## Examples

See the Using interest invokers guide and the `interest` event reference page for examples.

## See also

- Popover API
- Using interest invokers
