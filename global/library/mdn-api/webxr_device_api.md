---
title: "WebXR Device API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebXR Device API

**WebXR** is a group of standards which are used together to support rendering 3D scenes to hardware designed for presenting virtual worlds (**virtual reality**, or **VR**), or for adding graphical imagery to the real world, (**augmented reality**, or **AR**). The **WebXR Device API** implements the core of the WebXR feature set, managing the selection of output devices, render the 3D scene to the chosen device at the appropriate frame rate, and manage motion vectors created using input controllers.

WebXR-compatible devices include fully-immersive 3D headsets with motion and orientation tracking, eyeglasses which overlay graphics atop the real-world scene passing through the frames, and handheld mobile phones which augment reality by capturing the world with a camera and augment that scene with computer-generated imagery.

To accomplish these things, the WebXR Device API provides the following key <example-value>:

- Find compatible VR or AR output devices
- Render a 3D scene to the device at an appropriate frame rate
- (Optionally) mirror the output to a 2D display
- Create vectors representing the movements of input controls

At the most basic level, a scene is presented in 3D by computing the perspective to apply to the scene in order to render it from the viewpoint of each of the user's eyes by computing the position of each eye and rendering the scene from that position, looking in the direction the user is currently facing. Each of these two images is rendered into a single framebuffer, with the left eye's rendered image on the left and the right eye's viewpoint rendered into the right half of the buffer. Once both eyes' perspectives on the scene have been rendered, the resulting framebuffer is delivered to the WebXR device to be presented to the user through their headset or other appropriate display device.

While the older WebVR API was designed solely to support Virtual Reality (VR), WebXR provides support for both VR and Augmented Reality (AR) on the web. Support for AR functionality is added by the WebXR Augmented Reality Module.

A typical XR device can have either 3 or 6 degrees of freedom and might or might not have an external positional sensor.

The equipment may also include an accelerometer, barometer, or other sensors which are used to sense when the user moves through space, rotates their head, or the like.

## WebXR reference docs

### Initialization

- `navigator.xr`
- `XRSystem`
- `XRPermissionStatus`
- `Permissions-Policy`: `xr-spatial-tracking`

### Session

- `XRSession`
- `XRSessionEvent`
- `XRRenderState`

### Frame loop

- `XRFrame`

### Spaces

- `XRSpace`
- `XRReferenceSpace`
- `XRBoundedReferenceSpace`
- `XRReferenceSpaceEvent`
- `XRJointSpace`

### Views

- `XRView`
- `XRViewport`
- `XRVisibilityMaskChangeEvent`

### Geometric primitives

- `XRRigidTransform`

### Pose

- `XRPose`
- `XRJointPose`
- `XRViewerPose`

### Input

- `XRHand`
- `XRInputSource`
- `XRInputSourceArray`
- `XRInputSourceEvent`
- `XRInputSourcesChangeEvent`

### Layers

- `XRLayer`
- `XRLayerEvent`
- `XRCompositionLayer`
- `XRCubeLayer`
- `XRCylinderLayer`
- `XREquirectLayer`
- `XRProjectionLayer`
- `XRQuadLayer`
- `XRMediaBinding`

### WebGL binding

- `XRWebGLBinding`
- `WebGLRenderingContext.makeXRCompatible()`
- `XRWebGLLayer`
- `XRSubImage`
- `XRWebGLSubImage`

### Anchors

- `XRAnchor`
- `XRAnchorSet`

### Depth sensing

- `XRDepthInformation`
- `XRCPUDepthInformation`
- `XRWebGLDepthInformation`

### Hit testing

- `XRHitTestSource`
- `XRTransientInputHitTestSource`
- `XRHitTestResult`
- `XRTransientInputHitTestResult`
- `XRRay`

### Lighting estimation

- `XRLightEstimate`
- `XRLightProbe`

## Guides and tutorials

The following guides and tutorials are a great resource to learn how to comprehend WebXR and the underlying 3D and VR/AR graphics concepts.

### Foundations and basics

- Fundamentals of WebXR
- Matrix math for the web
- WebXR application life cycle

### Creating a mixed reality experience

- Starting up and shutting down a WebXR session
- Geometry and reference spaces in WebXR
- Spatial tracking in WebXR
- Rendering and the WebXR frame animation callback
- Viewpoints and viewers: Simulating cameras in WebXR
- A perspective retrospective for WebXR developers
- Lighting a WebXR setting
- Using bounded reference spaces

### Making it interactive

- Movement, orientation, and motion: A WebXR example
- Inputs and input sources
- Targeting and hit detection

### Performance and security

- WebXR performance guide
- Permissions and security for WebXR

## See also

- Drawing graphics
- WebGL API: Accelerated 2D and 3D graphics on the web
- Canvas API: 2D drawing for the web
- Canvas tutorial
