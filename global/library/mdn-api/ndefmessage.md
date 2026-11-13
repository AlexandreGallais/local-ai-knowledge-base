---
title: "NDEFMessage"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFMessage

The **`NDEFMessage`** interface of the Web NFC API represents the content of an NDEF message that has been read from or could be written to an NFC tag. An instance is acquired by calling the `NDEFMessage()` constructor or from the `NDEFReadingEvent.message` property, which is passed to the `reading` event.

## Constructor

- `NDEFMessage()` (experimental)
    Creates a new `NDEFMessage` object, initialized with the given NDEF records.

## Attributes

- `NDEFMessage.records` (read-only) (experimental)
    Returns the list of NDEF records contained in the message.
