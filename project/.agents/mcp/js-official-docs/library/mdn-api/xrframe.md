---
title: "XRFrame"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame

A WebXR Device API **`XRFrame`** object is passed into the `requestAnimationFrame()` callback function and provides access to the information needed in order to render a single frame of animation for an `XRSession` describing a VR or AR scene. Events which communicate the tracking state of objects also provide an `XRFrame` reference as part of their structure.

In addition to providing a reference to the `XRSession` for which this frame is to be rendered, the `getViewerPose()` method is provided to obtain the `XRViewerPose` describing the viewer's position and orientation in space, and `getPose()` can be used to create an `XRPose` describing the relative position of one `XRSpace` relative to another.

## Instance properties

- `session` (read-only) (experimental)
    The `XRSession` that for which this `XRFrame` describes the tracking details for all objects. The information about a specific object can be obtained by calling one of the methods on the object.
- `trackedAnchors` (read-only) (experimental)
    An `XRAnchorSet` containing all anchors still tracked in the frame.

## Instance methods

- `createAnchor()` (experimental)
    Returns a `Promise` which resolves to a free-floating `XRAnchor` object.
- `fillJointRadii()` (experimental)
    Populates a `Float32Array` with radii for a list of hand joint spaces. Returns `true` if successful for all spaces.
- `fillPoses()` (experimental)
    Populates a `Float32Array` with the matrices of the poses, relative to a given base space. Returns `true` if all spaces have a valid pose.
- `getDepthInformation()` (experimental)
    Returns an `XRCPUDepthInformation` object containing CPU depth information for the frame.
- `getHitTestResults()` (experimental)
    Returns an array of `XRHitTestResult` objects containing hit test results for a given `XRHitTestSource`.
- `getHitTestResultsForTransientInput()` (experimental)
    Returns an array of `XRTransientInputHitTestResult` objects containing hit test results for a given `XRTransientInputHitTestSource`.
- `getJointPose()` (experimental)
    Returns an `XRJointPose` object providing the pose of a hand joint (see `XRHand`) relative to a given base space.
- `getLightEstimate()` (experimental)
    Returns an `XRLightEstimate` object containing estimated lighting values for an `XRLightProbe`.
- `getPose()` (experimental)
    Returns an `XRPose` object representing the spatial relationship between the two specified `XRSpace` objects.
- `getViewerPose()` (experimental)
    Returns an `XRViewerPose` describing the viewer's position and orientation in a given `XRReferenceSpace`.

## See also

- WebXR Device API
- Spatial tracking in WebXR
