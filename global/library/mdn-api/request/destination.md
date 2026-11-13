---
title: "Request: destination property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/destination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: destination property

The **`destination`** read-only property of the **`Request`** interface returns a string describing the type of content being requested.

The string must be one of the `audio`, `audioworklet`, `document`, `embed`, `fencedframe`, `font`, `frame`, `iframe`, `image`, `json`, `manifest`, `object`, `paintworklet`, `report`, `script`, `sharedworker`, `speculationrules`, `style`, `text`, `track`, `video`, `worker` or `xslt` strings, or the empty string, which is the default value.

The `destination` is used by the user agent to, for example, help determine which set of rules to follow for CORS purposes, or how to navigate any complicated code paths that affect how specific types of request get handled.

These destinations vary substantially in how they operate. Some are data receptacles, where the received data is stored for processing later. Others are script-based, in which case the received data is delivered to a script by calling it and passing the data along.
Script-based destinations include `<script>` elements, as well as any of the `Worklet`-based destinations (including subclasses like `AudioWorklet`), and the `Worker`-based destinations, including `ServiceWorker` and `SharedWorker`.

## Value

A string which indicates the type of content the request is asking for. This type is much broader than the usual document type values (such as `"document"` or `"manifest"`), and may include contextual cues such as `"image"` or `"worker"` or `"audioworklet"`.

Possible values are:

- `""`
    The empty string is the default value, and is used for destinations that do not have their own value. This is the value when requests are made using the following APIs (among others):
    - ``
    - `<area ping>`
    - `Cache`
    - `EventSource`
    - `fetch()`
    - `navigator.sendBeacon()`
    - `WebSocket`
    - `XMLHttpRequest`

- `"audio"`
    The target is audio data.
- `"audioworklet"`
    The target is data being fetched for use by an audio worklet.
- `"document"`
    The target is a document (HTML or XML).
- `"embed"`
    The target is embedded content.
- `"fencedframe"`
    The target is a fenced frame.
- `"font"`
    The target is a font.
- `"image"`
    The target is an image.
- `"json"`
    The target is a JSON file.
- `"manifest"`
    The target is a manifest.
- `"object"`
    The target is an object.
- `"paintworklet"`
    The target is a paint worklet.
- `"report"`
    The target is a report.
- `"script"`
    The target is a script.
- `"serviceworker"`
    The target is a service worker.
- `"sharedworker"`
    The target is a shared worker.
- `"speculationrules"` (experimental)
    The target is a speculation rules JSON document.
- `"style"`
    The target is a style
- `"text"` (experimental)
    The target is a text file.
- `"track"`
    The target is an HTML `<track>`.
- `"video"`
    The target is video data.
- `"worker"`
    The target is a worker.
- `"xslt"`
    The target is an XSLT transform.

## Examples

In the following snippet, we create a new request using the `Request()` constructor (for an image file in the same directory as the script), then save the request's destination:

```js
const myRequest = new Request("flowers.jpg");
const myDestination = myRequest.destination; // returns the empty string by default
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
