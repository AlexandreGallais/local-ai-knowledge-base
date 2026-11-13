---
title: "Movement, orientation, and motion: A WebXR example (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/movement_and_motion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Movement, orientation, and motion: A WebXR example

In this article, we'll make use of information introduced in the previous articles in our WebXR tutorial series to construct an example which animates a rotating cube around which the user can move freely using a VR headset, keyboard, and/or mouse. This will help to solidify your understanding of how the geometry of 3D graphics and VR work, as well as to help ensure you understand the way the functions and data that are used during XR rendering work together.

**Figure: Screenshot of this example in action**

The core of this example—the spinning, textured, lighted cube—is taken from our WebGL tutorial series; namely, the penultimate article in the series, covering lighting in WebGL.

While reading this article and the accompanying source code, it's helpful to keep in mind that the display for a 3D headset is a single screen, divided in half. The left half of the screen is seen only by the left eye, while the right half is only seen by the right eye. Rendering the scene for immersive presentation requires multiple renders of the scene—once from the perspective of each eye.

When rendering the left eye, the `XRWebGLLayer` has its viewport configured to restrict drawing to the left half of the drawing surface. Contrarily, when rendering the right eye, the viewport is set to restrict drawing to the right half of the surface.

This example demonstrates this by showing the canvas on the screen, even when presenting a scene as an immersive display using an XR device.

## Dependencies

While we will not rely upon any 3D graphics frameworks such as `three.js` or the like for this example, we do use the `glMatrix` library for matrix math, which we've used in other examples in the past. This example also imports the WebXR polyfill maintained by the Immersive Web Working Group, which is the team responsible for the WebXR API's specification. By importing this polyfill, we allow the example to work on many browsers that don't yet have WebXR implementations in place, and we smooth out any transient deviations from the specification that occur during these still somewhat experimental days of the WebXR specification.

## Options

This example has a number of options you can configure by adjusting the values of constants before you load it in the browser. The code looks like this:

```js
const xRotationDegreesPerSecond = 25;
const yRotationDegreesPerSecond = 15;
const zRotationDegreesPerSecond = 35;
const enableRotation = true;
const allowMouseRotation = true;
const allowKeyboardMotion = true;
const enableForcePolyfill = false;
const SESSION_TYPE = "inline";
const MOUSE_SPEED = 0.003;
```

- `xRotationDegreesPerSecond`
    The number of degrees of rotation to apply around the X axis per second.
- `yRotationDegreesPerSecond`
    The number of degrees to rotate around the Y axis each second.
- `zRotationDegreesPerSecond`
    The number of degrees per second to rotate around the Z axis.
- `enableRotation`
    A Boolean indicating whether or not to enable the rotation of the cube at all.
- `allowMouseRotation`
    If `true`, you can use the mouse to pitch and yaw the view angle.
- `allowKeyboardMotion`
    If `true`, the W, A, S, and D keys move the viewer up, left, down, and to the right, while the up and down arrow keys move forward and backward. If `false`, only XR device changes to the view are permitted.
- `enableForcePolyfill`
    If this Boolean is `true`, the example will attempt to use the WebXR polyfill even if the browser actually has support for WebXR. If `false`, the polyfill is only used if the browser doesn't implement `navigator.xr`.
- `SESSION_TYPE`
    The type of XR session to create: `inline` for an inline session presented in the context of the document and `immersive-vr` to present the scene to an immersive VR headset.
- `MOUSE_SPEED`
    A multiplier used to scale the inputs from the mouse used for pitch and yaw control.
- `MOVE_DISTANCE`
    The distance to move in response to any of the keys used to move the viewer through the scene.

> **Note:**
> This example always displays what it renders on the screen, even if using `immersive-vr` mode. This lets you compare any differences in rendering between the two modes, and lets you see output from immersive mode even if you don't have a headset.

## Setup and utility functions

Next, we declare the variables and constants used throughout the application, starting with those used to store WebGL and WebXR specific information:

```js
let polyfill = null;
let xrSession = null;
let xrInputSources = null;
let xrReferenceSpace = null;
const xrButton = document.querySelector("#enter-xr");
const projectionMatrixOut = document.querySelector("#projection-matrix div");
const modelMatrixOut = document.querySelector("#model-view-matrix div");
const cameraMatrixOut = document.querySelector("#camera-matrix div");
const mouseMatrixOut = document.querySelector("#mouse-matrix div");

let gl = null;
let animationFrameRequestID = 0;
let shaderProgram = null;
let programInfo = null;
let buffers = null;
let texture = null;
let mouseYaw = 0;
let mousePitch = 0;
```

This is followed by a set of constants, mostly to contain various vectors and matrices used while rendering the scene.

```js
const viewerStartPosition = vec3.fromValues(0, 0, -10);
const viewerStartOrientation = vec3.fromValues(0, 0, 1.0);

const cubeOrientation = vec3.create();
const cubeMatrix = mat4.create();
const mouseMatrix = mat4.create();
const inverseOrientation = quat.create();
const RADIANS_PER_DEGREE = Math.PI / 180.0;
```

The first two—`viewerStartPosition` and `viewerStartOrientation`—indicate where the viewer will be placed relative to the center of the space, and the direction in which they'll initially be looking. `cubeOrientation` will store the current orientation of the cube, while `cubeMatrix` and `mouseMatrix` are storage for matrices used during the rendering of the scene. `inverseOrientation` is a quaternion which will be used to represent the rotation to apply to the reference space for the object in the frame being rendered.

`RADIANS_PER_DEGREE` is the value to multiply an angle in degrees by to convert the angle into radians.

The last four variables declared are storage for references to the `` elements into which we'll output the matrices when we want to show them to the user.

### Logging errors

A function called `LogGLError()` is implemented to provide an easily customized way to output logging information for errors that occur while executing WebGL functions.

```js
function LogGLError(where) {
  let err = gl.getError();
  if (err) {
    console.error(`WebGL error returned by ${where}: ${err}`);
  }
}
```

This takes as its only input a string, `where`, which is used to indicate what part of the program generated the error, since similar errors can have in multiple situations.

### The vertex and fragment shaders

The vertex and fragment shaders are both exactly the same as those used in the example for our article Lighting in WebGL. Refer to that if you're interested in the GLSL source code for the basic <example-value> used here.

Suffice it to say that the vertex shader computes the position of each vertex given the initial positions of each vertex and the transforms that need to be applied to convert them to simulate the viewer's current position and orientation. The fragment shader returns the color of each vertex, interpolating as needed from the values found in the texture and applying the lighting effects.
