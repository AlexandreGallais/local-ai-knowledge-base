---
title: "XRSystem: devicechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsystem/devicechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSystem: devicechange event

A **`devicechange`** event is fired on an `XRSystem` object whenever the availability of immersive XR devices has changed; for example, a VR headset or AR goggles have been connected or disconnected. It's a generic `Event` with no added properties.

> **Note:**
> Not to be confused with the `MediaDevices` `devicechange` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("devicechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondevicechange = (event) => { }
```

If the use of WebXR has been blocked by an `xr-spatial-tracking` Permissions Policy, `devicechange` events will not fire.

## Event type

A generic `Event` with no added properties.

## Description

### Trigger

Triggered whenever the availability of immersive XR devices has changed. For example, when a VR headset or AR goggles have been connected or disconnected.

### Use cases

You can use this event to, for example, monitor for the availability of a WebXR-compatible device so that you can enable a UI element which the user can use to activate immersive mode. This is shown in the example below.

## Examples

The example shown here handles the `devicechange` event by toggling the availability of the "Enter XR" button based on whether or not any immersive devices are currently available.

```js
if (navigator.xr) {
  navigator.xr.addEventListener("devicechange", (event) => {
    navigator.xr.isSessionSupported("immersive-vr").then((immersiveOK) => {
      enableXRButton.disabled = !immersiveOK;
    });
  });
}
```

When `devicechange` is received, the handler set up in this code calls the `XR` method `isSessionSupported()` to find out if there's a device available that can handle immersive VR presentations. If there is, the button to enter XR mode is enabled; otherwise it's disabled.

You can also use the `ondevicechange` event handler property to set a single handler for `devicechange` events (but note that this replaces other event listeners added using `ondevicechange`, if any):

```js
if (navigator.xr) {
  navigator.xr.ondevicechange = (event) => {
    // …
  };
}
```
