---
title: "XRMediaBinding: XRMediaBinding() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrmediabinding/xrmediabinding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRMediaBinding: XRMediaBinding() constructor

The **`XRMediaBinding()`** constructor creates and returns a new `XRMediaBinding` object.

## Syntax

```js
new XRMediaBinding(session)
```

### Parameters

- `session`
    An `XRSession` object specifying the WebXR session for which to create the media binding.

### Return value

A newly-created `XRMediaBinding`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the new `XRMediaBinding` could not be created due to one of a number of possible state errors:
    - The `XRSession` specified by `session` has already been stopped.
    - The specified `session` is not immersive.

## Examples

### Creating a new `XRMediaBinding`

The following example creates a new media binding for a session to create an `XRQuadLayer` to display a video layer in the scene.

```js
const xrMediaBinding = new XRMediaBinding(xrSession);

const video = document.createElement("video");
video.src = "just-fascination.mp4";
const layer = xrMediaBinding.createQuadLayer(video);
```

## See also

- `XRWebGLBinding`
