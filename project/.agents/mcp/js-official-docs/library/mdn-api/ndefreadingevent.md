---
title: "NDEFReadingEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreadingevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReadingEvent

The **`NDEFReadingEvent`** interface of the Web NFC API represents events dispatched on new NFC readings obtained by `NDEFReader`.

## Constructor

- `NDEFReadingEvent.NDEFReadingEvent()` (experimental)
    Creates a new `NDEFReadingEvent`.

## Instance properties

_Inherits properties from its parent, `Event`_.

- `NDEFReadingEvent.message` (read-only) (experimental)
    Returns an `NDEFMessage` object containing the received message.
- `NDEFReadingEvent.serialNumber` (read-only) (experimental)
    Returns the serial number of the device, which is used for anti-collision and identification, or an empty string if no serial number is available.

## Instance methods

_Inherits methods from its parent, `Event`_.
