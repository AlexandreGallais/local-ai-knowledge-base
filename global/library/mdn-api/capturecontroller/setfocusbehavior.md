---
title: "CaptureController: setFocusBehavior() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/capturecontroller/setfocusbehavior/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaptureController: setFocusBehavior() method

The `CaptureController` interface's **`setFocusBehavior()`** method controls whether the captured tab or window will be focused when an associated `MediaDevices.getDisplayMedia()` `Promise` fulfills, or whether the focus will remain with the tab containing the capturing app.

You can set this behavior multiple times before the `MediaDevices.getDisplayMedia()` call, or once immediately after its `Promise` resolves. After that, the focus behavior is said to be finalized, and can't be changed.

## Syntax

```js
setFocusBehavior(focusBehavior)
```

### Parameters

- `focusBehavior`
    An enumerated value that describes whether the user agent should transfer focus to the captured display surface, or keep the capturing app focused. Possible values are `focus-captured-surface` (transfer focus) and `no-focus-change` (keep focus on the capturing app).

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if:
    - The capture stream has been stopped.
    - The user chose to share a screen (`displaySurface` type `monitor`) rather than a `browser` tab or `window` — you can't focus a monitor. In this case the exception is thrown after the `MediaDevices.getDisplayMedia()` `Promise` resolves.
    - Enough time has elapsed after the `MediaDevices.getDisplayMedia()` `Promise` fulfills that the focus behavior has been finalized.

## Examples

### Basic `setFocusBehavior()` usage

```js
// Create a new CaptureController instance
const controller = new CaptureController();

// Prompt the user to share a tab, window, or screen.
const stream = await navigator.mediaDevices.getDisplayMedia({ controller });

// Query the displaySurface value of the captured video track
const [track] = stream.getVideoTracks();
const displaySurface = track.getSettings().displaySurface;

if (displaySurface === "browser") {
  // Focus the captured tab.
  controller.setFocusBehavior("focus-captured-surface");
} else if (displaySurface === "window") {
  // Do not move focus to the captured window.
  // Keep the capturing page focused.
  controller.setFocusBehavior("no-focus-change");
}
```

## See also

- Screen Capture API
- `MediaDevices.getDisplayMedia()`
- Better screen sharing with Conditional Focus
