---
title: "`:xr-overlay` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_xr-overlay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:xr-overlay` CSS pseudo-class

The **`:xr-overlay`** CSS pseudo-class, defined in the WebXR DOM overlays module, matches the DOM overlay element when a web page is being viewed in an immersive AR or VR environment.

## Syntax

```css
:xr-overlay {
  /* ... */
}
```

## Description

The `:xr-overlay` pseudo-class matches the overlay element for the duration of an immersive session using a DOM overlay.

The overlay element is a backdrop root. Any `backdrop-filter` effects on the DOM overlay element or its descendants do not modify the AR camera image (if applicable) or the rendered content drawn to the immersive session's `XRWebGLLayer`.

The overlay element itself is a stacking context due to its fixed `position`. The stacking contexts for ancestors of the overlay element, if any, do not paint to the immersive session's display.

> **Note:**
> On a multi-display system, the stacking contexts for ancestors or sibling trees of the overlay element may be displayed on separate displays.

## Examples

### Basic usage

In this example, we define the overlay to be semi-transparent black, enabling content behind the overlay to be partially visible. To ensure enough contrast between content and its background, we set the `color` to `white`.

```css
:xr-overlay {
  background-color: rgb(0 0 0 / 0.5);
  color: white;
}
```

### Targeting an overlay's contents

In this example, we use the `:xr-overlay` selector to style the `` elements within an XR DOM overlay.

```css
:xr-overlay button {
  background-color: white;
  color: black;
}
```

## See also

- `:modal`
- `:fullscreen`
- `:picture-in-picture`
- CSS pseudo-classes
- WebXR DOM overlays module
- WebXR device API fundamentals
- `XRSession.domOverlayState`
