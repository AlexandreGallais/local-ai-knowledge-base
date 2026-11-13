---
title: "MediaKeySession: update() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysession/update/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySession: update() method

The `update()` method of the `MediaKeySession` interface loads messages and licenses to the CDM, and then returns a `Promise`.

## Syntax

```js
update(response)
```

### Parameters

- `response`
    An instance that is either an `ArrayBuffer`, a `TypedArray`, or a `DataView`.

### Return value

A `Promise` that resolves to `undefined`.
