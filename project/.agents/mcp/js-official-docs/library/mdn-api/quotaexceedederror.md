---
title: "QuotaExceededError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/quotaexceedederror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# QuotaExceededError

The **`QuotaExceededError`** interface represents an error when a requested operation would exceed a system-imposed storage quota.

> **Note:**
> In browser versions before this interface was implemented, it was a regular `DOMException`. The subclassing allows for extra information like `quota` and `requested` to be included.

## Constructor

- `QuotaExceededError()` (experimental)
    Creates a `QuotaExceededError` object.

## Instance properties

_Also inherits properties from its ancestor `DOMException`._

- `QuotaExceededError.quota` (read-only) (experimental)
    Returns the system-defined storage limit (in bytes) that was exceeded.
- `requested` (read-only) (experimental)
    Returns the amount of storage (in bytes) that was requested during the operation.

## See also

- `DOMException`
- `StorageManager.estimate()`
- Storage quotas and eviction criteria
