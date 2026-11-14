---
title: "BackgroundFetchRegistration: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: abort() method

The **`abort()`** method of the `BackgroundFetchRegistration` interface aborts an active background fetch.

## Syntax

```js
abort()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `true` if the fetch is successfully aborted.

## Examples

Use `abort()` to terminate a background fetch that is in progress.

```js
bgFetch.abort();
```
