---
title: "MediaKeySession: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysession/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySession: close() method

The `close()` method of the `MediaKeySession` interface notifies that the current media session is no longer needed, and that the content decryption module should release any resources associated with this object and close it.
Then, it returns a `Promise`.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

A `Promise`.
