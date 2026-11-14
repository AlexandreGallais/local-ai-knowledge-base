---
title: "HTMLMediaElement: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: error property

The **`error`** read-only property of the `HTMLMediaElement` interface is the `MediaError` object for the most recent error, or `null` if there has not been an error. When an `error` event is received by the element, you can determine details about what happened by examining this object.

## Value

A `MediaError` object describing the most recent error to occur on the
media element or `null` if no errors have occurred.

## Examples

This example establishes a video element and adds an error handler to it; the error
handler logs the details to console.

```js
const videoElement = document.createElement("video");
videoElement.onerror = () => {
  console.error(
    `Error ${videoElement.error.code}; details: ${videoElement.error.message}`,
  );
};
videoElement.src = "https://example.com/bogusvideo.mp4";
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.error` property
- `<audio>` and ``
