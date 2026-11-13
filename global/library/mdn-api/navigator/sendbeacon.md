---
title: "Navigator: sendBeacon() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/sendbeacon/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: sendBeacon() method

The **`navigator.sendBeacon()`**
method asynchronously sends an HTTP POST request containing a small amount of data to a web server.

It's intended to be used for
sending analytics data to a web server, and avoids some of the problems with
legacy techniques for sending analytics, such as the use of
`XMLHttpRequest`.

> **Note:**
> For use cases that need the ability to send requests with methods other than `POST`, or to change any request properties, or that need access to the server response, instead use the `fetch()` method with `keepalive` set to true.

## Syntax

```js
sendBeacon(url)
sendBeacon(url, data)
```

### Parameters

- `url`
    The URL that will receive the _data_. Can be relative or absolute.
- `data` (optional)
    An `ArrayBuffer`, a `TypedArray`, a `DataView`, a `Blob`, a string literal or object, a `FormData` or a `URLSearchParams` object containing the data to send. The total size of queued data is limited to 64 KiB (65,536 bytes).

### Return value

Returns `true` if the user agent successfully queued the `data` for transfer. Otherwise, it returns `false`.

## Description

This method is intended for analytics and diagnostics code to send data to a server.

A problem with sending analytics is that a site often wants to send analytics
when the user has finished with a page: for example, when the user navigates
to another page. In this situation the browser may be about to unload the page,
and in that case the browser may choose not to send asynchronous
`XMLHttpRequest` requests.

In the past, web pages have tried to delay page unload long enough to send data. To do this they have
used workarounds such as:

- Submitting the data with a blocking synchronous `XMLHttpRequest` call.
- Creating an `` element and setting its `src`. Most user agents will delay the unload to load the image.
- Creating a no-op loop for several seconds.

All these methods block unloading the document, which slows down navigation to the next page.
There's nothing the next page can do to avoid this, so the new page seems
slow, even though it's the fault of the previous page.

With the `sendBeacon()` method, the data is transmitted asynchronously when the user
agent has an opportunity to do so, without delaying unload or the next navigation.
This means:

- The data is sent reliably
- It's sent asynchronously
- It doesn't impact the loading of the next page

The data is sent as an HTTP POST request.

The limitation, however, is that the payload size is limited to about 64 KiB. For larger data transfers, consider using `fetch()` instead.

### Sending analytics at the end of a session

Websites often want to send analytics or diagnostics to the server when the user has finished with the page.
The most reliable way to do this is to send the data on the `visibilitychange` event:

```js
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon("/log", analyticsData);
  }
});
```

#### Legacy events

In the past, many websites have used the `unload`, `beforeunload`, or `pagehide` events to send analytics at the end of a session.
However, this is unreliable. In many situations, especially on mobile, the browser will not fire these events. For example, they will not fire in the following situation:

1. The user loads the page and interacts with it.
2. When they are finished, they switch to a different app, instead of closing the tab.
3. Later, they close the browser app using the phone's app manager.

Additionally, the `unload` event is incompatible with the back/forward cache (bfcache)
implemented in modern browsers. Some browsers, such as Firefox, handle this incompatibility by excluding pages from the bfcache if they contain unload handlers,
thus hurting performance. Others, such as Safari and Chrome on Android, handle it by not firing the `unload` event when the user navigates to another page in the same tab.

The `pagehide` event is not as problematic as `unload`, because it is compatible with the bfcache. However, it suffers from the same reliability problems. Developers should use `visibilitychange` instead.

## Examples

The following example specifies a handler for the `visibilitychange` event. The handler calls `sendBeacon()` to send analytics.

```js
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon("/log", analyticsData);
  }
});
```

## See also

- The `visibilitychange` event.
- `Beacon API` overview page.
- Don't lose user and app state, use Page Visibility explains in
  detail why you should use `visibilitychange`, not
  `beforeunload`/`unload`.
- Page Lifecycle API gives best-practices guidance on handling
  page lifecycle behavior in your web applications.
- PageLifecycle.js: a JavaScript library that deals with cross-browser inconsistencies in page lifecycle behavior.
- Back/forward cache explains what the back/forward cache is, and its implications for various page lifecycle events.
