---
title: "Movement, orientation, and motion: A WebXR example (part 3 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/movement_and_motion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Movement, orientation, and motion: A WebXR example (part 3 of 4)

## Drawing a frame

Our callback for `XRSession.requestAnimationFrame()` is implemented in the `drawFrame()` function shown below. Its job is to obtain the viewer's reference space, compute how much movement needs to be applied to any animated objects given the amount of time that's elapsed since the last frame, and then to render each of the views specified by the viewer's `XRPose`.

```js
let lastFrameTime = 0;

function drawFrame(time, frame) {
  const session = frame.session;
  let adjustedRefSpace = xrReferenceSpace;
  let pose = null;

  animationFrameRequestID = session.requestAnimationFrame(drawFrame);
  adjustedRefSpace = applyViewerControls(xrReferenceSpace);
  pose = frame.getViewerPose(adjustedRefSpace);

  if (pose) {
    const glLayer = session.renderState.baseLayer;

    gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
    LogGLError("bindFrameBuffer");

    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0); // Clear everything
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    LogGLError("glClear");

    const deltaTime = (time - lastFrameTime) * 0.001; // Convert to seconds
    lastFrameTime = time;

    for (const view of pose.views) {
      const viewport = glLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      LogGLError(`Setting viewport for eye: ${view.eye}`);
      gl.canvas.width = viewport.width * pose.views.length;
      gl.canvas.height = viewport.height;
      renderScene(gl, view, programInfo, buffers, texture, deltaTime);
    }
  }
}
```

The first thing we do is call `requestAnimationFrame()` to request that `drawFrame()` be called again for the next frame to be rendered. Then we pass the object's reference space into the `applyViewerControls()` function, which returns a revised `XRReferenceSpace` that transforms the position and orientation of the object to take into account the movement, pitch, and yaw applied by the user using the keyboard and mouse. Remember that, as always, the world's objects are moved and reoriented, not the viewer. The returned reference space makes it easy for us to do just that.

With the new reference space in hand, we get the `XRViewerPose` representing the viewer's point of view—for both of their eyes. If that's successful, we begin preparing to render by getting the `XRWebGLLayer` being used by the session and binding its frame buffer to be used as the WebGL frame buffer (so that rendering WebGL draws into the layer and therefore the XR device's display). With WebGL now configured to render to the XR device, we clear the frame to black and are ready to begin rendering.

The time elapsed since the last frame was rendered (in seconds) is computed by subtracting the previous frame's timestamp, `lastFrameTime`, from the current time as specified by the `time` parameter and then multiplying by 0.001 to convert milliseconds to seconds. The current time is then saved into `lastFrameTime`;

The `drawFrame()` function ends by iterating over every view found in the `XRViewerPose`, setting up the viewport for the view, and calling `renderScene()` to render the frame. By setting the viewport for each view, we handle the typical scenario in which the views for each eye are each rendered onto half of the WebGL frame. The XR hardware then handles ensuring that each eye only sees the portion of that image that is intended for that eye.

> **Note:**
> In this example, we're visually presenting the frame both on the XR device _and_ on the screen. To ensure that the on-screen canvas is the right size to allow us to do this, we set its width to be equal to the individual `XRView` width multiplied by the number of views; the canvas height is always the same as the viewport's height. The two lines of code that adjust the canvas size are not needed in regular WebXR rendering loops.

### Applying the user inputs

The `applyViewerControls()` function, which is called by `drawFrame()` before beginning to render anything, takes the offsets in each of the three directions, the yaw offset, and the pitch offset as recorded by the `handleKeyDown()` and `handlePointerMove()` functions in response to the user pressing keys and dragging their mouse with the right mouse button pressed. It takes as input the base reference space for the object, and returns a new reference space that alters the location and orientation of the object on match the result of the inputs.

```js
function applyViewerControls(refSpace) {
  if (
    !mouseYaw &&
    !mousePitch &&
    !axialDistance &&
    !transverseDistance &&
    !verticalDistance
  ) {
    return refSpace;
  }

  quat.identity(inverseOrientation);
  quat.rotateX(inverseOrientation, inverseOrientation, -mousePitch);
  quat.rotateY(inverseOrientation, inverseOrientation, -mouseYaw);

  let newTransform = new XRRigidTransform(
    { x: transverseDistance, y: verticalDistance, z: axialDistance },
    {
      x: inverseOrientation[0],
      y: inverseOrientation[1],
      z: inverseOrientation[2],
      w: inverseOrientation[3],
    },
  );
  mat4.copy(mouseMatrix, newTransform.matrix);

  return refSpace.getOffsetReferenceSpace(newTransform);
}
```

If all the input offsets are zero, we just return the original reference space. Otherwise, we create from the orientation changes in `mousePitch` and `mouseYaw` a quaternion specifying the inverse of that orientation, so that applying the `inverseOrientation` to the cube will correctly appear to reflect the viewer's movement.

Then it's time to create a new `XRRigidTransform` object representing the transform that will be used to create the new `XRReferenceSpace` for the moved and/or re-oriented object. The position is a new vector whose `x`, `y`, and `z` correspond to the offsets moved along each of those axes. The orientation is the `inverseOrientation` quaternion.

We copy the transform's `matrix` into `mouseMatrix`, which we'll use later to display the mouse tracking matrix to the user (so this is a step you normally can skip). Finally, we pass the `XRRigidTransform` into the object's current `XRReferenceSpace` in order to obtain the reference space that integrates this transform to represent the placement of the cube relative to the user given the user's movements. That new reference space is returned to the caller.

### Rendering the scene

The `renderScene()` function is called to actually render the parts of the world that are visible to the user at the moment. It's called once for each eye, with slightly different positions for each eye, in order to establish the 3D effect needed for XR gear.

Most of this code is typical WebGL rendering code, taken directly from the `drawScene()` function in the Lighting in WebGL article, and it's there that you should look for details on the WebGL rendering parts of this example (view the code on GitHub). But here it begins with some code specific to this example, so we'll take a deeper look at that part.

```js
const normalMatrix = mat4.create();
const modelViewMatrix = mat4.create();

function renderScene(gl, view, programInfo, buffers, texture, deltaTime) {
  const xRotationForTime =
    xRotationDegreesPerSecond * RADIANS_PER_DEGREE * deltaTime;
  const yRotationForTime =
    yRotationDegreesPerSecond * RADIANS_PER_DEGREE * deltaTime;
  const zRotationForTime =
    zRotationDegreesPerSecond * RADIANS_PER_DEGREE * deltaTime;

  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  if (enableRotation) {
    mat4.rotate(
      cubeMatrix, // destination matrix
      cubeMatrix, // matrix to rotate
      zRotationForTime, // amount to rotate in radians
      [0, 0, 1],
    ); // axis to rotate around (Z)
    mat4.rotate(
      cubeMatrix, // destination matrix
      cubeMatrix, // matrix to rotate
      yRotationForTime, // amount to rotate in radians
      [0, 1, 0],
    ); // axis to rotate around (Y)
    mat4.rotate(
      cubeMatrix, // destination matrix
      cubeMatrix, // matrix to rotate
      xRotationForTime, // amount to rotate in radians
      [1, 0, 0],
    ); // axis to rotate around (X)
  }

  mat4.multiply(modelViewMatrix, view.transform.inverse.matrix, cubeMatrix);
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  displayMatrix(view.projectionMatrix, 4, projectionMatrixOut);
  displayMatrix(modelViewMatrix, 4, modelMatrixOut);
  displayMatrix(view.transform.matrix, 4, cameraMatrixOut);
  displayMatrix(mouseMatrix, 4, mouseMatrixOut);

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  }

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    view.projectionMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix,
  );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}
```

`renderScene()` begins by calculating how much rotation should occur around each of the three axes in the amount of time that has elapsed since the previous frame was rendered. These values let us adjust the rotation of our animating cube the right amount to ensure that its movement speed stays consistent regardless of variations in the frame rate that may occur due to system load. These values are calculated as the number of radians of rotation to apply given the elapsed time and stored into the constants `xRotationForTime`, `yRotationForTime`, and `zRotationForTime`.

After enabling and configuring depth testing, we check the value of the `enableRotation` constant to see if rotation of the cube is enabled; if it is, we use glMatrix to rotate the `cubeMatrix` (representing the cube's current orientation relative to the world space) around the three axes. With the cube's global orientation established, we then multiply that by the inverse of the view's transform matrix to get the final model view matrix—the matrix to apply to the object to both rotate it for its animation purposes, but to also move and reorient it to simulate the viewer's motion through the space.

Then the view's normal matrix is computed by taking the model view matrix, inverting it, and transposing it (swapping its columns and rows).

The last few lines of code added for this example are four calls to `displayMatrix()`, a function which displays the contents of a matrix for analysis by the user. The remainder of the function is identical or essentially identical to the older WebGL sample from which this code is derived.

### Displaying a matrix

For instructive purposes, this example displays the contents of the important matrices used while rendering the scene. The `displayMatrix()` function is used for this; this function uses MathML to render the matrix, falling back to a more array-like format if MathML isn't supported by the user's browser.

```js
function displayMatrix(mat, rowLength, target) {
  let outHTML = "";

  if (mat && rowLength && rowLength <= mat.length) {
    let numRows = mat.length / rowLength;
    outHTML = "<math display='block'>\n<mrow>\n<mo>[</mo>\n<mtable>\n";

    for (let y = 0; y < numRows; y++) {
      outHTML += "<mtr>\n";
      for (let x = 0; x < rowLength; x++) {
        outHTML += `<mtd><mn>${mat[x * rowLength + y].toFixed(2)}</mn></mtd>\n`;
      }
      outHTML += "</mtr>\n";
    }

    outHTML += "</mtable>\n<mo>]</mo>\n</mrow>\n</math>";
  }

  target.innerHTML = outHTML;
}
```

This replaces the contents of the element specified by `target` with a newly-created  element which contains the 4x4 matrix. Each entry is displayed with up to two decimal places.

### Everything else

The rest of the code is identical to that found in the earlier examples:

- `initShaderProgram()`
    Initializes the GLSL shader program, calling `loadShader()` to load and compile each shader's program, then attaching each one to the WebGL context. Once they're compiled, the program is linked and returned to the caller.
- `loadShader()`
    Creates a shader object and loads the specified source code into it before compiling the code and checking to ensure that the compiler succeeded before returning the newly compiled shader to the caller. If an error occurs, `NULL` is returned instead.
- `initBuffers()`
    Initializes the buffers that contain data to be passed into WebGL. These buffers include the array of vertex positions, the array of vertex normals, the texture coordinates for each surface of the cube, and the array of vertex indices (specifying which entry in the vertex list represents each corner of the cube).
- `loadTexture()`
    Loads the image at a given URL and creates a WebGL texture from it. If the image's dimensions aren't both powers of two (see the `isPowerOf2()` function), mipmapping is disabled and wrapping is clamped to the edges. This is because optimized rendering of mipmapped textures only works for textures whose dimensions are powers of two in WebGL 1. WebGL 2 supports arbitrarily-sized textures for mipmapping.
- `isPowerOf2()`
    Returns `true` if the specified value is a power of two; otherwise returns `false`.
