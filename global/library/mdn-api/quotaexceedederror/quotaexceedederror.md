---
title: "QuotaExceededError: QuotaExceededError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/quotaexceedederror/quotaexceedederror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# QuotaExceededError: QuotaExceededError() constructor

The **`QuotaExceededError()`** constructor creates a new `QuotaExceededError` object.

## Syntax

```js
new QuotaExceededError()
new QuotaExceededError(message)
new QuotaExceededError(message, options)
```

### Parameters

- `message` (optional)
    The `message`. Defaults to `""`.
- `options` (optional)
    An object that can have the following properties:
    - `quota` (optional)
        A number representing the system-defined storage quota (in bytes) that was exceeded, or `undefined` if the information isn't available. Corresponds to `QuotaExceededError.quota`.
    - `requested` (optional)
        A number representing the amount of storage (in bytes) that was requested during the operation, or `undefined` if the information isn't available. Corresponds to `QuotaExceededError.requested`.

### Exceptions

- `RangeError`
    Thrown if `option.quota` or `options.requested` is negative, or if `option.requested < option.quota`.

## See also

- `DOMException()`
- `QuotaExceededError`
