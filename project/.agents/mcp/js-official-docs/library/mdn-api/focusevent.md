---
title: "FocusEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/focusevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FocusEvent

The **`FocusEvent`** interface represents focus-related events, including `focus`, `blur`, `focusin`, and `focusout`.

## Constructor

- `FocusEvent()`
    Creates a `FocusEvent` event with the given parameters.

## Instance properties

_This interface also inherits properties from its parent `UIEvent`, and indirectly from `Event`_.

- `FocusEvent.relatedTarget` (read-only)
    An `EventTarget` representing a secondary target for this event. In some cases (such as when tabbing in or out a page), this property may be set to `null` for security reasons.

## Instance methods

_This interface has no specific methods. It inherits methods from its parent `UIEvent`, and indirectly from `Event`._

## Order of events

When focus is shifted from element A to element B, focus events are dispatched in the following order:

1. `blur`: sent after element A loses focus.
2. `focusout`: sent after the `blur` event.
3. `focus`: sent after element B receives focus.
4. `focusin`: sent after the `focus` event.

## See also

- The `Event` base interface
