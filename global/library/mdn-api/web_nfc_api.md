---
title: "Web NFC API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_nfc_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web NFC API

The Web NFC API allows exchanging data over NFC via light-weight NFC Data Exchange Format (NDEF) messages.

> **Note:**
> Devices and tags have to be formatted and recorded specifically to support NDEF record format to be used with Web NFC. Low-level operations are currently not supported by the API, however there is a public discussion about API that would add such functionality.

## Interfaces

- `NDEFMessage`
    Interface that represents NDEF messages that can be received from or sent to a compatible tag via a `NDEFReader` object. A message is composed of metadata and NDEF Records.
- `NDEFReader` (experimental)
    Interface that enables reading and writing messages from compatible NFC tags. The messages are represented as `NDEFMessage` objects.
- `NDEFRecord`
    Interface that represents NDEF records that can be included in an NDEF message.
