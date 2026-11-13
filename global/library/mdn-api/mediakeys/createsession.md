---
title: "MediaKeys: createSession() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeys/createsession/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeys: createSession() method

The `createSession()` method of the `MediaKeys` interface returns a new `MediaKeySession` object, which represents a context for message exchange with a content decryption module (CDM).

## Syntax

```js
createSession()
createSession(mediaKeySessionType)
```

### Parameters

- `mediaKeySessionType` (optional)
    A string. Either "temporary" or "persistent-license". The default value is "temporary".

### Return value

A new `MediaKeySession` object.
