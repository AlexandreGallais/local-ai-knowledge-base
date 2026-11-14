---
title: "MediaKeySystemAccess"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysystemaccess/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySystemAccess

The **`MediaKeySystemAccess`** interface of the Encrypted Media Extensions API provides access to a Key <example-value> for decryption and/or a content protection provider. You can request an instance of this object using the `Navigator.requestMediaKeySystemAccess()` method.

## Instance properties

- `MediaKeySystemAccess.keySystem` (read-only)
    Returns a string identifying the key <example-value> being used.

## Instance methods

- `MediaKeySystemAccess.createMediaKeys()`
    Returns a `Promise` that resolves to a new `MediaKeys` object.
- `MediaKeySystemAccess.getConfiguration()`
    Returns an object with the supported combination of configuration options.
