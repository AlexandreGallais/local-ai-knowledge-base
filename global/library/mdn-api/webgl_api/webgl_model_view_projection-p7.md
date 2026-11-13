---
title: "WebGL model view projection (part 7 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_model_view_projection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL model view projection (part 7 of 8)

## Perspective projection matrix

Up to this point, we've built up our own 3D rendering setup, step by step. However the current code as we've built it has some issues. For one, it gets skewed whenever we resize our window. Another is that our simple projection doesn't handle a wide range of values for the scene data. Most scenes don't work in clip space. It would be helpful to define what distance is relevant to the scene so that precision isn't lost in converting the numbers. Finally it's very helpful to have a fine-tuned control over what points get placed inside and outside of clip space. In the previous examples the corners of the cube occasionally get clipped.

The **perspective projection matrix** is a type of projection matrix that accomplishes all of these requirements. The math also starts to get a bit more involved and won't be fully explained in these examples. In short, it combines dividing by w (as done with the previous examples) with some ingenious manipulations based on similar triangles. If you want to read a full explanation of the math behind it check out some of the following links:

- OpenGL Projection Matrix
- Perspective Projection
- Trying to understand the math behind the perspective projection matrix in WebGL

One important thing to note about the perspective projection matrix used below is that it flips the z axis. In clip space the z+ goes away from the viewer, while with this matrix it comes towards the viewer.

The reason to flip the z axis is that the clip space coordinate system is a left-handed coordinate system (wherein the z-axis points away from the viewer and into the screen), while the convention in mathematics, physics and 3D modeling, as well as for the view/eye coordinate system in OpenGL, is to use a right-handed coordinate system (z-axis points out of the screen towards the viewer). More on that in the relevant Wikipedia articles: Cartesian coordinate system, Right-hand rule.

Let's take a look at a `perspective()` function, which computes the perspective projection matrix.

```js
function perspective(fieldOfViewInRadians, aspectRatio, near, far) {
  const f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
  const rangeInv = 1 / (near - far);

  // prettier-ignore
  return [
    f / aspectRatio, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0,
  ];
}
```

The four parameters into this function are:

- `fieldOfViewInRadians`
    An angle, given in radians, indicating how much of the scene is visible to the viewer at once. The larger the number is, the more is visible by the camera. The geometry at the edges becomes more and more distorted, equivalent to a wide angle lens. When the field of view is larger, the objects typically get smaller. When the field of view is smaller, then the camera can see less and less in the scene. The objects are distorted much less by perspective and objects seem much closer to the camera
- `aspectRatio`
    The scene's aspect ratio, which is equivalent to its width divided by its height. In these examples, that's the window's width divided by the window height. The introduction of this parameter finally solves the problem wherein the model gets warped as the canvas is resized and reshaped.
- `nearClippingPlaneDistance`
    A positive number indicating the distance into the screen to a plane which is perpendicular to the floor, nearer than which everything gets clipped away. This is mapped to -1 in clip space, and should not be set to 0.
- `farClippingPlaneDistance`
    A positive number indicating the distance to the plane beyond which geometry is clipped away. This is mapped to 1 in clip space. This value should be kept reasonably close to the distance of the geometry in order to avoid precision errors creeping in while rendering.

In the latest version of the box demo, the `computeSimpleProjectionMatrix()` method has been replaced with the `computePerspectiveMatrix()` method.

```js
function computePerspectiveMatrix() {
  const fieldOfViewInRadians = Math.PI * 0.5;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const nearClippingPlaneDistance = 1;
  const farClippingPlaneDistance = 50;

  this.transforms.projection = perspective(
    fieldOfViewInRadians,
    aspectRatio,
    nearClippingPlaneDistance,
    farClippingPlaneDistance,
  );
}
```

```js
class CubeDemo {
  canvas = document.getElementById("my-canvas");
  gl = this.canvas.getContext("webgl");
  webglProgram = createWebGLProgramFromIds(
    this.gl,
    "vertex-shader",
    "fragment-shader",
  );
  transforms = {}; // All of the matrix transforms
  locations = {}; // All of the shader locations
  buffers;

  constructor() {
    const gl = this.gl;
    gl.useProgram(this.webglProgram);
    this.buffers = createBuffersForCube(gl, createCubeData());

    // Save the attribute and uniform locations
    this.locations.model = gl.getUniformLocation(this.webglProgram, "model");
    this.locations.projection = gl.getUniformLocation(
      this.webglProgram,
      "projection",
    );
    this.locations.position = gl.getAttribLocation(
      this.webglProgram,
      "position",
    );
    this.locations.color = gl.getAttribLocation(this.webglProgram, "color");

    // Tell WebGL to test the depth when drawing
    gl.enable(gl.DEPTH_TEST);
  }

  computeModelMatrix(now) {
    // Scale up
    const scaleMatrix = scale(5, 5, 5);
    // Rotate a slight tilt
    const rotateXMatrix = rotateX(now * 0.0003);
    // Rotate according to time
    const rotateYMatrix = rotateY(now * 0.0005);
    // Move slightly down
    const translateMatrix = translate(0, 0, -20);
    // Multiply together, make sure and read them in opposite order
    this.transforms.model = multiplyArrayOfMatrices([
      translateMatrix, // step 4
      rotateYMatrix, // step 3
      rotateXMatrix, // step 2
      scaleMatrix, // step 1
    ]);

    // Performance caveat: in real production code it's best not to create
    // new arrays and objects in a loop. This example chooses code clarity
    // over performance.
  }

  computePerspectiveMatrix(scaleFactor) {
    const fieldOfViewInRadians = Math.PI * 0.5;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const nearClippingPlaneDistance = 1;
    const farClippingPlaneDistance = 50;

    this.transforms.projection = perspective(
      fieldOfViewInRadians,
      aspectRatio,
      nearClippingPlaneDistance,
      farClippingPlaneDistance,
    );
  }

  draw() {
    const gl = this.gl;
    const now = Date.now();
    // Compute our matrices
    this.computeModelMatrix(now);
    this.computePerspectiveMatrix(0.5);
    // Update the data going to the GPU
    // Setup the color uniform that will be shared across all triangles
    gl.uniformMatrix4fv(
      this.locations.model,
      false,
      new Float32Array(this.transforms.model),
    );
    gl.uniformMatrix4fv(
      this.locations.projection,
      false,
      new Float32Array(this.transforms.projection),
    );

    // Set the positions attribute
    gl.enableVertexAttribArray(this.locations.position);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.positions);
    gl.vertexAttribPointer(this.locations.position, 3, gl.FLOAT, false, 0, 0);

    // Set the colors attribute
    gl.enableVertexAttribArray(this.locations.color);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colors);
    gl.vertexAttribPointer(this.locations.color, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.elements);
    // Perform the actual draw
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    // Run the draw as a loop
    requestAnimationFrame(() => this.draw());
  }
}

const cube = new CubeDemo();
cube.draw();
```

The shader code is identical to the previous example:

```glsl
gl_Position = projection * model * vec4(position, 1.0);
```

Additionally (not shown), the position and scale matrices of the model have been changed to take it out of clip space and into the larger coordinate system.

### Exercises

- Experiment with the parameters of the perspective projection matrix and the model matrix.
- Swap out the perspective projection matrix to use orthographic projection. In the MDN WebGL shared code you'll find the `MDN.orthographicMatrix()`. This can replace the `MDN.perspectiveMatrix()` function in `CubeDemo.prototype.computePerspectiveMatrix()`.
