---
title: "Window: fetchLater() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/fetchlater/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: fetchLater() method

The **`fetchLater()`** method of the `Window` interface creates a deferred fetch.

A `fetchLater()` request is sent once the page is navigated away from (it is destroyed or enters the bfcache), or after a provided `activateAfter` timeout — whichever comes first.

The `fetchLater()` method returns a `FetchLaterResult` object containing a single `activated` value stating whether the request has been sent yet. Note the method does not return the result of the actual fetch when that happens (since it is often sent after the document has been destroyed) and the whole response of the fetch, including body and headers, is ignored.

Requests whose body is a `ReadableStream` cannot be deferred.

The `fetchLater()` method is controlled by the `connect-src` Content Security Policy directive rather than the directive of the retrieved resources.

## Syntax

```js
fetchLater(resource)
fetchLater(resource, options)
```

### Parameters

The `fetchLater()` method takes all the same parameters as `fetch()`, but with one additional `activateAfter` option.

- `resource`
    This defines the resource that you wish to fetch. Identical to `fetch()`, this can either be:
    - A string or any other object with a stringifier — including a `URL` object — that provides the URL of the resource you want to fetch. The URL may be relative to the base URL, which is the document's `baseURI` in a window context.
    - A `Request` object.

- `options` (optional)
    A `DeferredRequestInit` object containing any custom settings that you want to apply to the request, including an `activateAfter` timeout value that defines how long the result should be deferred for before sending.

### Exceptions

The same exceptions for `fetch()` can be raised for `fetchLater()`, along with the following additional exceptions:

- `QuotaExceededError`
    Use of this feature was blocked due to exceeding the available quota. See `fetchLater()` quotas for more details. Callers of `fetchLater()` should be defensive and catch `QuotaExceededError` errors in almost all cases, especially if they are embedding third-party JavaScript.

- `RangeError`
    Thrown when a negative `activateAfter` value is specified.

- `TypeError`
    In addition to the reasons for `fetch()`, this exception will also be thrown for a `ReadableStream` request (which cannot be deferred) or for use of untrustworthy URLs (such as `http://`).

### Return value

A `FetchLaterResult` containing an `activated` boolean property indicating if the request has been sent yet.

> **Note:**
> Once the fetch request is sent, its response — including the body and headers — is not made available and will be ignored.

## Examples

The `fetchLater()` quotas article provides examples of how the quotas are applied.

### Defer a `GET` request until the page is navigated away from or closed

```js
fetchLater("/send_beacon");
```

### Defer a `POST` request for around one minute

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

### Defer a `POST` request for around one minute with a try/catch

The same example as above, but the best practice is to enclose this in a try/catch:

```js
try {
  fetchLater("/send_beacon", {
    method: "POST",
    body: getBeaconData(),
    activateAfter: 60000, // 1 minute
  });
} catch (e) {
  if (e instanceof QuotaExceededError) {
    // Handle the quota error
  } else {
    // Handle other errors
  }
}
```

### Defer a `POST` request for around one minute and create a function to check if sent

```js
const result = fetchLater("https://report.example.com", {
  method: "POST",
  body: JSON.stringify(myReport),
  activateAfter: 60000 /* 1 minute */,
});

function checkIfFetched() {
  return result.activated;
}
```

### Update a pending request

In this example we use an `AbortController` to cancel and recreate the request:

```js
let beaconResult = null;
let beaconAbort = null;

function updateBeacon(data) {
  const pending = !beaconResult || !beaconResult.activated;
  if (pending && beaconAbort) {
    beaconAbort.abort();
  }

  createBeacon(data);
}

function createBeacon(data) {
  if (beaconResult && !beaconResult.activated) {
    // Avoid creating duplicated beacon if the previous one is still pending.
    return;
  }

  beaconAbort = new AbortController();
  beaconResult = fetchLater({
    url: data,
    signal: beaconAbort.signal,
  });
}
```

### Invalid examples

Any of the following calls to `fetchLater()` would throw:

```js
// Only potentially trustworthy URLs are supported
fetchLater("http://untrusted.example.com");

// The length of the deferred request has to be known
fetchLater("https://origin.example.com", { body: someDynamicStream });

// Deferred fetching only works on active windows
const detachedWindow = iframe.contentWindow;
iframe.remove();
detachedWindow.fetchLater("https://origin.example.com");
```

## See also

- Using Deferred Fetch
- `FetchLaterResult`
- Fetch API
