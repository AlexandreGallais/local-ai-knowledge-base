---
title: "NDEFRecord"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord

The **`NDEFRecord`** interface of the Web NFC API provides data that can be read from, or written to, compatible NFC devices, e.g., NFC tags supporting NDEF.

## Constructor

- `NDEFRecord()` (experimental)
    Returns a new `NDEFRecord`.

## Instance properties

- `NDEFRecord.recordType` (experimental) (read-only)
    Returns the record type of the record. Records must have either a standardized well-known type name such as `"empty"`, `"text"`, `"url"`, `"smart-poster"`, `"absolute-url"`, `"mime"`, or `"unknown"` or else an external type name, which consists of a domain name and custom type name separated by a colon (":").
- `NDEFRecord.mediaType` (experimental) (read-only)
    Returns the MIME type of the record. This value will be `null` if `recordType` is not equal to `"mime"`.
- `NDEFRecord.id` (experimental) (read-only)
    Returns the record identifier, which is an absolute or relative URL used to identify the record.
    > **Note:**
    > The uniqueness of the identifier is enforced only by the generator of the record.
- `NDEFRecord.data` (experimental) (read-only)
    Returns a `DataView` containing the raw bytes of the record's payload.
- `NDEFRecord.encoding` (experimental) (read-only)
    Returns the encoding of a textual payload, or `null` otherwise.
- `NDEFRecord.lang` (experimental) (read-only)
    Returns the language of a textual payload, or `null` if one was not supplied.

## Instance methods

- `NDEFRecord.toRecords()` (experimental)
    Converts `NDEFRecord.data` to a sequence of records. This allows parsing the payloads of record types which may contain nested records, such as smart poster and external type records.
