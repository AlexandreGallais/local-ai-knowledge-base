---
title: "WorkerGlobalScope: fetch() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/fetch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: fetch() method

The **`fetch()`** method of the `WorkerGlobalScope` interface starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response is available.

The promise resolves to the `Response` object representing the response to your request.

A `fetch()` promise only rejects when the request fails, for example, because of a badly-formed request URL or a network error.
A `fetch()` promise _does not_ reject if the server responds with HTTP status codes that indicate errors (`404`, `504`, etc.).
Instead, a `then()` handler must check the `Response.ok` and/or `Response.status` properties.

The `fetch()` method is controlled by the `connect-src` directive of Content Security Policy rather than the directive of the resources it's retrieving.

> **Note:**
> The `fetch()` method's parameters are identical to those of the `Request()` constructor.

## Syntax

```js
fetch(resource)
fetch(resource, options)
```

### Parameters

- `resource`
    This defines the resource that you wish to fetch. This can either be:
    - A string or any other object with a stringifier — including a `URL` object — that provides the URL of the resource you want to fetch. The URL may be relative to the base URL, which is the document's `baseURI` in a window context, or `WorkerGlobalScope.location` in a worker context.
    - A `Request` object.

- `options` (optional)
    A `RequestInit` object containing any custom settings that you want to apply to the request.

### Return value

A `Promise` that resolves to a `Response` object.

### Exceptions

- `AbortError` `DOMException`
    The request was aborted due to a call to the `AbortController` `abort()` method.
- `NotAllowedError` `DOMException`
    Thrown if use of the Topics API is specifically disallowed by a `browsing-topics` Permissions Policy, and a `fetch()` request was made with `browsingTopics: true`.
- `TypeError`
    An error when the fetch operation could not be performed.
    See `Window.fetch()` exceptions for a list of reasons why this error can occur.

## Examples

See `fetch()` for examples.

## See also

- `Window.fetch()`
- Fetch API
- ServiceWorker API
- HTTP access control (CORS)
- HTTP
