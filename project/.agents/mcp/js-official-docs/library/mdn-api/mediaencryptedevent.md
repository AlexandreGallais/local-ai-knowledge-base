---
title: "MediaEncryptedEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaencryptedevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaEncryptedEvent

The **`MediaEncryptedEvent`** interface of the Encrypted Media Extensions API contains the information associated with an `encrypted` event sent to a `HTMLMediaElement` when some initialization data is encountered in the media.

## Constructor

- `MediaEncryptedEvent()`
    Creates a new instance of a `MediaEncryptedEvent` object.

## Instance properties

_This interface also inherits properties from its parent, `Event`._

- `MediaEncryptedEvent.initDataType` (read-only)
    Returns a case-sensitive string with the _type_ of the format of the initialization data found.
- `MediaEncryptedEvent.initData` (read-only)
    Returns an `ArrayBuffer` containing the initialization data found. If there is no initialization data associated with the format, it returns `null`.

## Instance methods

_This interface doesn't provide any specific methods, but inherits methods from its parent, `Event`._
