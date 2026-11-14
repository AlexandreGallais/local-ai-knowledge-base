---
title: "XRSession"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession

The **`XRSession`** interface of the WebXR Device API represents an ongoing session between a web application and a user's XR device (such as a VR headset), providing methods and properties used to interact with and control the session. To open a WebXR session, use the `XRSystem` interface's `requestSession()` method.

With `XRSession` methods, you can poll the viewer's position and orientation (the `XRViewerPose`), gather information about the user's environment, and present imagery to the user. `XRSession` supports both inline and immersive virtual and augmented reality modes.

## Instance properties

_In addition to the properties listed below, `XRSession` inherits properties from its parent interface, `EventTarget`._

- `depthDataFormat` (experimental) (read-only)
    Returns the depth-sensing data format with which the session was configured.
- `depthUsage` (experimental) (read-only)
    Returns the depth-sensing usage with which the session was configured.
- `domOverlayState` (experimental) (read-only)
    Provides information about the DOM overlay, if the feature is enabled.
- `enabledFeatures` (experimental) (read-only)
    Returns an array of granted session features.
- `environmentBlendMode` (experimental) (read-only)
    Returns this session's blend mode which denotes how much of the real-world environment is visible through the XR device and how the device will blend the device imagery with it.
- `inputSources` (experimental) (read-only)
    Returns a list of this session's `XRInputSource`s, each representing an input device used to control the camera and/or scene.
- `interactionMode` (experimental) (read-only)
    Returns this session's interaction mode, which describes the best space (according to the user agent) for the application to draw interactive UI for the current session.
- `preferredReflectionFormat` (experimental) (read-only)
    Returns this session's preferred reflection format used for lighting estimation texture data.
- `renderState` (experimental) (read-only)
    An `XRRenderState` object which contains options affecting how the imagery is rendered. This includes things such as the near and far clipping planes (distances defining how close and how far away objects can be and still get rendered), as well as field of view information.
- `visibilityState` (experimental) (read-only)
    A string indicating whether or not the session's imagery is visible to the user, and if so, if it's being visible but not currently the target for user events.

## Instance methods

_`XRSession` provides the following methods in addition to those inherited from its parent interface, `EventTarget`._

- `cancelAnimationFrame()` (experimental)
    Removes a callback from the animation frame painting callback from `XRSession`'s set of animation frame rendering callbacks, given the identifying handle returned by a previous call to `requestAnimationFrame()`.
- `end()` (experimental)
    Ends the WebXR session. Returns a `Promise` which resolves when the session has been shut down.
- `requestAnimationFrame()` (experimental)
    Schedules the specified method to be called the next time the user agent is working on rendering an animation frame for the WebXR device. Returns an integer value which can be used to identify the request for the purposes of canceling the callback using `cancelAnimationFrame()`. This method is comparable to the `Window.requestAnimationFrame()` method.
- `requestHitTestSource()` (experimental)
    Requests an `XRHitTestSource` object that handles hit test subscription.
- `requestHitTestSourceForTransientInput()` (experimental)
    Requests an `XRTransientInputHitTestSource` object that handles hit test subscription for a transient input source.
- `requestLightProbe()` (experimental)
    Requests an `XRLightProbe` that estimates lighting information at a given point in the user's environment.
- `requestReferenceSpace()` (experimental)
    Requests that a new `XRReferenceSpace` of the specified type be created. Returns a promise which resolves with the `XRReferenceSpace` or `XRBoundedReferenceSpace` which was requested, or throws a `NotSupportedError` `DOMException` if the requested space type isn't supported by the device.
- `updateRenderState()` (experimental)
    Updates the properties of the session's render state.

## Events

_The following events are delivered to `XRSession` objects._

- `end` (experimental)
    Sent to the `XRSession` object after the WebXR session has ended and all hardware-related functions have completed. The event is represented by an object of type `XRSessionEvent`. Also available through the `onend` event handler property.
- `inputsourceschange` (experimental)
    An event of type `XRInputSourcesChangeEvent` sent to the `XRSession` when the list of active XR input sources has changed. Also available through the `oninputsourceschange` event handler property.
- `select` (experimental)
    An event of type `XRInputSourceEvent` which is sent to the session when one of the session's input sources has successfully completed a primary action. This generally corresponds to the user pressing a trigger, touchpad, or button, speaks a command, or performs a recognizable gesture. The `select` event is sent after the `selectstart` event is sent and immediately before the `selectend` event is sent. If `select` is _not_ sent, then the select action was aborted before being completed. Also available through the `onselect` event handler property.
- `selectend` (experimental)
    An event of type `XRInputSourceEvent` which gets sent to the session object when one of its input devices finishes its primary action or gets disconnected while in the process of handling a primary action. For example: for button or trigger actions, this means the button has been released; for spoken commands, it means the user has finished speaking. This is the last of the three `select*` events to be sent. Also available through the `onselectend` event handler property.
- `selectstart` (experimental)
    An event of type `XRInputSourceEvent` which is sent to the session object when one of its input devices is first engaged by the user in such a way as to cause the primary action to begin. This is the first of the `session*` event to be sent. Also available through the `onselectstart` event handler property.
- `squeeze` (experimental)
    An `XRInputSourceEvent` sent to indicate that a primary squeeze action has successfully completed. This indicates that the device being squeezed has been released, and may represent dropping a grabbed object, for example. It is sent immediately before the `squeezeend` event is sent to indicate that the squeeze action is over. Also available through the `onsqueeze` event handler property.
- `squeezeend` (experimental)
    An `XRInputSourceEvent` sent to the `XRSession` when the primary squeeze action ends, whether or not the action was successful. Also available using the `onsqueezeend` event handler property.
- `squeezestart` (experimental)
    An event of type `XRInputSourceEvent` which is sent to the `XRSession` when the user initially squeezes a squeezable controller. This may be, for example, a trigger which is used to represent grabbing objects, or might represent actual squeezing when wearing a haptic glove. Also available through the `onsqueezestart` event handler property.
- `visibilitychange` (experimental)
    An `XRSessionEvent` which is sent to the session when its visibility state as indicated by the `visibilityState` changes. Also available through the `onvisibilitychange` event handler property.
- `visibilitymaskchange` (experimental)
    An `XRVisibilityMaskChangeEvent` which is sent to the session when the portion of the `XRView` visible to the user changes, enabling performance improvements by allowing the browser to draw only the visible part of the updated view. Also available through the `onvisibilitymaskchange` event handler property.

## Example

This example establishes a new `XRSession` in `inline` mode so that it can be displayed within an HTML element, avoiding the need for a dedicated AR or VR viewing device such as a headset.

```js
const XR = navigator.xr;

if (XR) {
  XR.requestSession("inline").then((xrSession) => {
    xrSession.requestReferenceSpace("local").then((xrReferenceSpace) => {
      xrSession.requestAnimationFrame((time, xrFrame) => {
        const viewer = xrFrame.getViewerPose(xrReferenceSpace);

        gl.bindFramebuffer(xrWebGLLayer.framebuffer);

        for (const xrView of viewer.views) {
          const xrViewport = xrWebGLLayer.getViewport(xrView);
          gl.viewport(
            xrViewport.x,
            xrViewport.y,
            xrViewport.width,
            xrViewport.height,
          );
        }
      });
    });
  });
} else {
  /* WebXR is not available */
}
```

## See also

- `:xr-overlay` pseudo-class
