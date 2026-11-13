---
title: "Encrypted Media Extensions API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encrypted_media_extensions_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Encrypted Media Extensions API

The **Encrypted Media Extensions API** provides interfaces for controlling the playback of content which is subject to a digital restrictions management scheme.

Access to this API is provided through `Navigator.requestMediaKeySystemAccess()`.

## Interfaces

- `MediaEncryptedEvent`
    Represents a specific `encrypted` event thrown when a `HTMLMediaElement` encounters some initialization data.
- `MediaKeyMessageEvent`
    Contains the content and related data when the content decryption module (CDM) generates a message for the session.
- `MediaKeys`
    Represents a set of keys that an associated `HTMLMediaElement` can use for decryption of media data during playback.
- `MediaKeySession`
    Represents a context for message exchange with a content decryption module (CDM).
- `MediaKeyStatusMap`
    A read-only map of media key <example-value> by key IDs.
- `MediaKeySystemAccess`
    Provides access to a key <example-value> for decryption and/or a content protection provider.

### Extensions to other interfaces

The Encrypted Media Extensions API extends the following APIs, adding the listed features.

#### HTMLMediaElement

- `HTMLMediaElement.mediaKeys` (read-only)
    Provides a `MediaKeys` object that represents the set of keys that the element can use for decryption of media data during playback.
- `HTMLMediaElement.setMediaKeys()`
    Sets the `MediaKeys` that will be used to decrypt media during playback.
- `encrypted` event
    Event that is fired on a `HTMLMediaElement` when initialization data is encountered in the media, indicating that it is encrypted.

#### Navigator

- `Navigator.requestMediaKeySystemAccess()`
    Returns a `Promise` that fulfills to a `MediaKeySystemAccess` object that can be used to access a particular media key <example-value>, which can in turn be used to create keys for decrypting a media stream.
