---
title: "MediaKeySession: generateRequest() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysession/generaterequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySession: generateRequest() method

The `generateRequest()` method of the `MediaKeySession` interface returns a `Promise` after generating a license request based on initialization data.

## Syntax

```js
generateRequest(initDataType, initData)
```

### Parameters

- `initDataType`
    A string that specifies the format of the `initData` parameter. This must be one of the following values:
    - `"cenc"`: The `initData` parameter uses the `"cenc"` format.
    - `"keyids"`: The `initData` parameter uses the `"keyids"` format.
    - `"webm"`: The `initData` parameter uses the `"webm"` format.
- `initData`
    Initialization data for the request, in the format specified by `initDataType`. It is an instance of any of the following types:
    - `ArrayBuffer`
    - `DataView`
    - `TypedArray`

### Return value

A `Promise`.

### Exceptions

- `TypeError`
    Raised if `initDataType` is an empty string, if `initData` is an empty array, or if the provided `initData` is not valid according to the specified `initDataType`.
- `NotSupportedError` `DOMException`
    Raised if the Key <example-value> implementation associated with the `MediaKeySession` object does not support the provided `initDataType`, if the sanitized initialization data is empty, or if the sanitized initialization data is not supported by the content decryption module (CDM).
- `QuotaExceededError`
    Raised if the operation fails due to a lack of resources on the user agent or CDM.
- `InvalidStateError` `DOMException`
    Raised if the `MediaKeySession` object is in a `closing` or `closed` state, or if it has already been initialized.
