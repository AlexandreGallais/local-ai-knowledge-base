---
title: "BackgroundFetchRegistration: match() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/match/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: match() method

The **`match()`** method of the `BackgroundFetchRegistration` interface returns the first matching `BackgroundFetchRecord`.

## Syntax

```js
match(request)
match(request, options)
```

### Parameters

- `request`
    The `Request` for which you are attempting to find records.
    This can be a `Request` object or a URL.
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

A `Promise` that resolves with the first `BackgroundFetchRecord` that matches
the request or `undefined` if no match is found.

> **Note:**
> `BackgroundFetchRegistration.match()` is basically identical to
> `BackgroundFetchRegistration.matchAll()`, except that rather than resolving with an array of
> all matching records, it resolves with the first matching record only.

### Exceptions

- `InvalidStateError` `DOMException`
    Returned if you call `match()` when there are no fetches in progress. This state will be reflected by `BackgroundFetchRegistration.recordsAvailable` being set to `false`.

## Examples

In this example we look for a record with the URL "/ep-5.mp3". If a `BackgroundFetchRecord` is found then we can return some information about it.

```js
bgFetch.match("/ep-5.mp3").then(async (record) => {
  if (!record) {
    console.log("No record found");
    return;
  }

  console.log(`Here's the request`, record.request);
  const response = await record.responseReady;
  console.log(`And here's the response`, response);
});
```
