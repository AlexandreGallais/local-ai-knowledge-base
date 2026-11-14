---
title: "NDEFRecord: NDEFRecord() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/ndefrecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord: NDEFRecord() constructor

The **`NDEFRecord()`**
constructor of the Web NFC API returns a
newly constructed `NDEFRecord` object that represents data that can be
read from, or written to, compatible NFC devices; e.g., NFC tags supporting NDEF.

## Syntax

```js
new NDEFRecord(options)
```

### Parameters

- `options`
    An object with the following properties:
    - `data` (optional)
        Contains the data to be transmitted. It can be a string, an `ArrayBuffer`, a `TypedArray`, a `DataView`, or an array of nested records.
    - `encoding` (optional)
        A string specifying the record's encoding.
    - `id` (optional)
        A developer-defined identifier for the record.
    - `lang` (optional)
        A valid BCP 47 language tag.
    - `mediaType` (optional)
        A valid MIME type.
    - `recordType`
        A string indicating the type of data stored in `data`. It must be one of the following values:
        - `"absolute-url"`
            An absolute URL to the data.
        - `"empty"`
            An empty `NDEFRecord`.
        - `"mime"`
            A valid MIME type.
        - `"smart-poster"`
            A smart poster as defined by the NDEF-SMARTPOSTER specification.
        - `"text"`
            Text as defined by the NDEF-TEXT specification.
        - `"unknown"`
            The record type is not known.
        - `"URL"`
            A URL as defined by the NDEF-URI specification.

### Return value

A new `NDEFRecord`.
