---
title: "NDEFRecord: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord: id property

The **`id`** property of the
`NDEFRecord` interface returns the record identifier, which is an
absolute or relative URL used to identify the record.

This identifier is created by the generator of the record which is solely responsible
for enforcing record identifier uniqueness. Web NFC does not sign the NFC content, thus
record consumer should not make any assumptions about integrity or authenticity of the
identifier or any other part of the records.

## Value

A string.
