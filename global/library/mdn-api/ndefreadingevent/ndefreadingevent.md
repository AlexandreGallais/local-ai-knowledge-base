---
title: "NDEFReadingEvent: NDEFReadingEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreadingevent/ndefreadingevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReadingEvent: NDEFReadingEvent() constructor

The **`NDEFReadingEvent()`** constructor creates a new `NDEFReadingEvent` object which represents events dispatched on new NFC readings obtained by `NDEFReader`.

## Syntax

```js
new NDEFReadingEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `reading`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `serialNumber` (optional)
        The serial number of the device a message was read from. It default to `""`, and can be set to `null`.
    - `message`
        An object with the following members:
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

A new `NDEFReadingEvent` object.
