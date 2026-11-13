---
title: "Adding 2D content to a WebGL context (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/tutorial/adding_2d_content_to_a_webgl_context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Adding 2D content to a WebGL context (part 2 of 2)

## Rendering the scene

Once the shaders are established, the locations are looked up, and the square plane's vertex positions put in a buffer, we can actually render the scene. We'll do this in a `drawScene()` function that, again, we'll implement in a separate JavaScript module.

> **Note:**
> Create a new file called "draw-scene.js", and give it the following contents:

```js
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glMatrix always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0],
  ); // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(gl, buffers, programInfo);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 2; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
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

export { drawScene };
```

The first step is to clear the canvas to our background color; then we establish the camera's perspective. We set a field of view of 45°, with a width to height ratio that matches the display dimensions of our canvas. We also specify that we only want objects between 0.1 and 100 units from the camera to be rendered.

Then we establish the position of the square plane by loading the identity position and translating away from the camera by 6 units. After that, we bind the square's vertex buffer to the attribute the shader is using for `aVertexPosition` and we tell WebGL how to pull the data out of it. Finally we draw the object by calling the `drawArrays()` method.

Finally, let's call `initBuffers()` and `drawScene()`.

> **Note:**
> Add this code to the start of your "webgl-demo.js" file:

```js
import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
```

> **Note:**
> Add this code to the end of your `main()` function:

```js
// Here's where we call the routine that builds all the
// objects we'll be drawing.
const buffers = initBuffers(gl);

// Draw the scene
drawScene(gl, programInfo, buffers);
```

The result should look like this:

View the complete code | Open this demo on a new page

## Matrix utility operations

Matrix operations might seem complicated but they are actually pretty simple if you take them one step at a time. Generally people use a matrix library rather than writing their own. In our case we're using the popular glMatrix library.

### See also

- Matrices on WebGLFundamentals
- Matrices on Wolfram MathWorld
- Matrix on Wikipedia
