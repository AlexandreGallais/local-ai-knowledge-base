---
title: "XMLHttpRequest: open() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: open() method

The `XMLHttpRequest` method **`open()`**
initializes a newly-created request, or re-initializes an existing one.

> **Note:**
> Calling this method for an already active request
> (one for which `open()` has already been called) is the equivalent of calling
> `abort()`.

## Syntax

```js
open(method, url)
open(method, url, async)
open(method, url, async, user)
open(method, url, async, user, password)
```

### Parameters

- `method`
    The HTTP request method to use, such as
    `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`,
    etc. Ignored for non-HTTP(S) URLs.
- `url`
    A string or any other object with a stringifier — including a `URL` object — that provides the URL of the resource to send the request to.
- `async` (optional)
    An optional Boolean parameter, defaulting to `true`, indicating whether
    or not to perform the operation asynchronously. If this value is `false`,
    the `send()` method does not return until the response is received. If
    `true`, notification of a completed transaction is provided using event
    listeners. This _must_ be true if the `multipart` attribute is
    `true`, or an exception will be thrown.

    > **Note:**
    > Synchronous requests on the main thread can
    > be easily disruptive to the user experience and should be avoided; in fact, many
    > browsers have deprecated synchronous XHR support on the main thread entirely.
    > Synchronous requests are permitted in `Worker`s.

- `user` (optional)
    The optional user name to use for authentication purposes; by default, this is the
    `null` value.
- `password` (optional)
    The optional password to use for authentication purposes; by default, this is the
    `null` value.

### Return value

None (`undefined`).

## See also

- Using XMLHttpRequest
- Related `XMLHttpRequest` methods:
  `setRequestHeader()`,
  `send()`, and
  `abort()`
