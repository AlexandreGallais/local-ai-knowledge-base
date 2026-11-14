---
title: "BackgroundFetchRegistration: matchAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/matchall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: matchAll() method

The **`matchAll()`** method of the `BackgroundFetchRegistration` interface returns an array of matching `BackgroundFetchRecord` objects.

## Syntax

```js
matchAll()
matchAll(request)
matchAll(request,options)
```

### Parameters

- `request` (optional)
    The `Request` for which you are attempting to find records.
    This can be a `Request` object or a URL. If this parameter is omitted, all records are included in the result.
- `options` (optional)
    An object that sets options for the `match` operation. The available
    options are:
    - `ignoreSearch` (optional)
        A boolean value that specifies whether to
        ignore the query string in the URL. For example, if set to
        `true` the `?value=bar` part of
        `https://example.com/?value=bar` would be ignored when performing a match.
        It defaults to `false`.
    - `ignoreMethod` (optional)
        A boolean value. When `true`,
        prevents matching operations from validating the `Request` `http` method.
        If `false` (the default) only `GET` and `HEAD` are allowed.
    - `ignoreVary` (optional)
        A boolean value. When `true` indicates that the `Vary` header should be ignored.
        It defaults to `false`.

### Return value

A `Promise` that resolves with an array of all matching `BackgroundFetchRecord` objects.

### Exceptions

- `InvalidStateError` `DOMException`
    Returned if the `recordsAvailable` flag is `false`, indicating that there is no fetch in progress.

## Examples

Use `matchAll()` with no parameters to return all of the records in a background fetch.

```js
const records = await bgFetch.matchAll();
console.log(records); // an array of BackgroundFetchRecord objects
```
