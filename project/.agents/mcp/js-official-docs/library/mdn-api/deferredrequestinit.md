---
title: "DeferredRequestInit"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deferredrequestinit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeferredRequestInit

The **`DeferredRequestInit`** dictionary of the Fetch API represents the set of options that can be used to configure a deferred fetch request.

The `DeferredRequestInit` object is passed directly into the `window.fetchLater()` function call as the second argument.

## Instance properties

This dictionary extends the `RequestInit` dictionary with the addition of the following properties:

- `activateAfter` (optional)
    A `DOMHighResTimeStamp` indicating a timeout in milliseconds after which the fetch request should be sent. The fetch can be sent earlier on navigating away. The _actual_ sending time is unknown, as the browser may wait for a longer or shorter time, for example, to optimize the batching of deferred fetches. If the `activateAfter` property is not provided, the deferred fetch waits until the end of the page visit (including entering the bfcache).

### Exceptions

- `RangeError`
    Raised when a negative `activateAfter` is provided.

## Examples

### Defer a `GET` request until the page is destroyed or enters the bfcache

In this example, no `DeferredRequestInit` object is provided and no timeout is used:

```js
fetchLater("/send_beacon");
```

### Defer a `POST` request for around 1 minute

In this example we create a `Request`, and provide an `activateAfter` value to delay sending the request for 60,000 milliseconds (or one minute):

```js
fetchLater("/send_beacon", {
  method: "POST",
  body: getBeaconData(),
  activateAfter: 60000, // 1 minute
});
```

> **Note:**
> The actual sending time is unknown, as the browser may wait for a longer or shorter period of time, for example to optimize batching of deferred fetches.

## See also

- Using Deferred Fetch
- ServiceWorker API
- HTTP access control (CORS)
- HTTP
