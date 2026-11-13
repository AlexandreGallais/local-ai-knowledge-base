---
title: "WebXR DOM overlays"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/webxr_dom_overlays/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebXR DOM overlays

The **WebXR DOM overlays** module, an immersive web specification, expands the WebXR Device API to allow HTML content — such as text and controls — to be displayed during an immersive virtual reality (VR) or augmented reality (AR) session.

In a typical WebXR session, content is rendered to a WebGL canvas superimposed on the real-world camera feed (in AR) or displayed as the full immersive view (in VR), with the device tracking the user's position and orientation.
The DOM overlay renders a single DOM element and its descendants as a transparent-background 2D rectangle on top of this view, enabling interactive, stylable elements such as menus and dialogs to appear within the immersive experience.

The `:xr-overlay` pseudo-class matches the DOM overlay element when a web page is being viewed in an immersive AR or VR environment, allowing it to be styled appropriately for its underlying content.

## Reference

### Pseudo-classes

- `:xr-overlay`

### Events

- `Element` events
  - `beforexrselect`

### Interfaces

- `XRSession`
  - `domOverlayState` property

## Guides

- Fundamentals of WebXR
    Introduction to WebXR device API fundamentals.

## Related concepts

- CSS pseudo-classes
  - `:modal`
  - `:fullscreen`
  - `:picture-in-picture`

- WebXR Device API
  - `XRWebGLLayer` interface

## See also

- Stacking context
- CSSOM view module
- CSSOM View API
