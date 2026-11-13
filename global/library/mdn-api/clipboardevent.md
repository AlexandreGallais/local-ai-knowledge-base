---
title: "ClipboardEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardEvent

The **`ClipboardEvent`** interface of the Clipboard API represents events providing information related to modification of the clipboard, that is `cut`, `copy`, and `paste` events.

## Constructor

- `ClipboardEvent()`
    Creates a `ClipboardEvent` event with the given parameters.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `ClipboardEvent.clipboardData` (read-only)
    A `DataTransfer` object containing the data affected by the user-initiated `cut`, `copy`, or `paste` operation, along with its MIME type.

## Instance methods

_No specific methods; inherits methods from its parent `Event`_.

## See also

- Copy-related events: `copy`, `cut`, `paste`
- `ClipboardChangeEvent`
- Clipboard API
- Image support for Async Clipboard article
