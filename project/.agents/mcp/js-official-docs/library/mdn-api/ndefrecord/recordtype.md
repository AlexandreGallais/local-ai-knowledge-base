---
title: "NDEFRecord: recordType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/recordtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord: recordType property

The **`recordType`**
property of the `NDEFRecord` interface returns the record type of the record.

## Value

A string which can be one of the following:

- `"empty"`
    An empty NDEF record.
- `"text"`
    A text NDEF record.
- `"url"`
    A URI NDEF record.
- `"smart-poster"`
    A "smart poster" NDEF record.
- `"absolute-url"`
    An absolute URL NDEF record.
- `"mime"`
    A MIME type NDEF record.
- `"unknown"`
    The NDEF record type is not known.
- local type name
    Represents a local type name, frequently used to specify NDEF record embedded within
    another record.
- external type name
    A custom string consisting of a domain name and custom type name separated by a colon (":").
