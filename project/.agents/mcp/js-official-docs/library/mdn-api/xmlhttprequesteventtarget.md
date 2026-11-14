---
title: "XMLHttpRequestEventTarget"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequesteventtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequestEventTarget

`XMLHttpRequestEventTarget` is the interface that describes the event handlers shared on `XMLHttpRequest` and `XMLHttpRequestUpload`.

You don't use `XMLHttpRequestEventTarget` directly; instead you interact with the sub classes.

## Events

The following events are made available to `XMLHttpRequest` and `XMLHttpRequestUpload`:

- `abort`
    Fired when a request has been aborted, for example because the program called `XMLHttpRequest.abort()`.
    Also available via the `onabort` event handler property.
- `error`
    Fired when the request encountered an error.
    Also available via the `onerror` event handler property.
- `load`
    Fired when a request transaction completes successfully.
    Also available via the `onload` event handler property.
- `loadend`
    Fired when a request has completed, whether successfully (after `load`) or unsuccessfully (after `abort` or `error`).
    Also available via the `onloadend` event handler property.
- `loadstart`
    Fired when a request has started to load data.
    Also available via the `onloadstart` event handler property.
- `progress`
    Fired periodically when a request receives more data.
    Also available via the `onprogress` event handler property.
- `timeout`
    Fired when progress is terminated due to preset time expiring.
    Also available via the `ontimeout` event handler property.

## See also

- `XMLHttpRequest`
- `XMLHttpRequestUpload`
