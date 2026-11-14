---
title: "CaptureController: forwardWheel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/forwardwheel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: forwardWheel() method

The `CaptureController` interface's **`forwardWheel()`** method starts forwarding `wheel` events fired on the referenced element to the viewport of an associated captured display surface.

The `forwardWheel()` method must be invoked via transient activation. Specifically, the only events that can successfully invoke it are `click` and `input`. In addition, the user is asked for permission to share tabs when screen capture is first attempted; if the user grants permission, this also includes permission to scroll captured tabs. If the relevant permission is already `"granted"`, transient activation is not needed.

## Syntax

```js
forwardWheel(element)
```

### Parameters

- `element`
    A reference to the element whose `wheel` events you want to forward to the associated captured display surface.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown when:
    - The capturing `MediaStream` returned by the originating `MediaDevices.getDisplayMedia()` call is no longer capturing, for example because the associated `MediaStreamTrack` objects have had `stop()` called on them.
    - The application is capturing itself.
    - An attempt is made to invoke `forwardWheel()` without transient activation, when permission to use it has not been granted by the user.
- `NotAllowedError` `DOMException`
    Thrown when:
    - The page's `captured-surface-control` Permissions Policy does not permit the page to use the Captured Surface Control API.
    - Permission to capture the display surface is explicitly denied by the user.
- `NotSupportedError` `DOMException`
    The surface type being captured is not a browser tab.

## Examples

### Basic `forwardWheel()` usage

In our live demo, explained in Using the Captured Surface Control API, we call a function called `startForwarding()` after the capturing `getDisplayMedia()` promise fulfills:

```js
// Create controller and start capture
const controller = new CaptureController();
videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia({
  controller,
});

// ...

startForwarding();
```

This function calls the `forwardWheel()` method, passing it a reference to the `` element the captured stream is being displayed in:

```js
async function startForwarding() {
  try {
    await controller.forwardWheel(videoElem);
  } catch (e) {
    console.log(e);
  }
}
```

This results in the `wheel` events fired on the referenced element being forwarded to the captured display surface, allowing the capturing app to scroll it.

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Using the Captured Surface Control API
