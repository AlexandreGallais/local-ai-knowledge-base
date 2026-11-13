---
title: "XMLHttpRequest: upload property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/upload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: upload property

The **`upload`** read-only property of the `XMLHttpRequest` interface returns an `XMLHttpRequestUpload` object that can be observed to monitor an upload's progress.

It is an opaque object, but because it's also an `XMLHttpRequestEventTarget`, event listeners can be attached to track its process.

> **Note:**
> Attaching event listeners to this object prevents the request from being a "simple request" and will cause a preflight request to be issued if cross-origin; see CORS. Because of this, event listeners need to be registered before calling `send()` or upload events won't be dispatched.

> **Note:**
> The spec also seems to indicate that event listeners should be attached after `open()`. However, browsers are buggy on this matter, and often need the listeners to be registered _before_ `open()` to work.

The following events can be triggered on an upload object and used to monitor the upload:

       | Event
       | Description

       | `loadstart`
       | The upload has begun.

       | `progress`
       |
        Periodically delivered to indicate the amount of progress made so far.

       | `abort`
       | The upload operation was aborted.

       | `error`
       | The upload failed due to an error.

       | `load`
       | The upload completed successfully.

       | `timeout`
       |
        The upload timed out because a reply did not arrive within the time
        interval specified by the
        `XMLHttpRequest.timeout`.

       | `loadend`
       |
        The upload finished. This event does not differentiate between success
        or failure, and is sent at the end of the upload regardless of the
        outcome. Prior to this event, one of `load`,
        `error`, `abort`, or `timeout` will
        already have been delivered to indicate why the upload ended.

## See also

- Using XMLHttpRequest
- `XMLHttpRequestUpload`
