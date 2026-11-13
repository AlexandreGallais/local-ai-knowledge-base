---
title: "WebGL model view projection (part 6 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_model_view_projection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL model view projection (part 6 of 8)

## Simple projection

The last step of filling in the w component can actually be accomplished with a simple matrix. Start with the identity matrix:

```js
// prettier-ignore
const identity = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
];

multiplyPoint(identity, [2, 3, 4, 1]);
// [2, 3, 4, 1]
```

Then move the last column's 1 up one space.

```js
// prettier-ignore
const copyZ = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 1,
  0, 0, 0, 0,
];

multiplyPoint(copyZ, [2, 3, 4, 1]);
// [2, 3, 4, 4]
```

However in the last example we performed `(z + 1) * scaleFactor`:

```js
const scaleFactor = 0.5;

// prettier-ignore
const simpleProjection = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, scaleFactor,
  0, 0, 0, scaleFactor,
];

multiplyPoint(simpleProjection, [2, 3, 4, 1]);
// [2, 3, 4, 2.5]
```

Breaking it out a little further we can see how this works:

```js
const x = 2 * 1 + 3 * 0 + 4 * 0 + 1 * 0;
const y = 2 * 0 + 3 * 1 + 4 * 0 + 1 * 0;
const z = 2 * 0 + 3 * 0 + 4 * 1 + 1 * 0;
const w = 2 * 0 + 3 * 0 + 4 * scaleFactor + 1 * scaleFactor;
```

The last line could be simplified to:

```js
const w = 4 * scaleFactor + 1 * scaleFactor;
```

Then factoring out the scaleFactor, we get this:

```js
const w = (4 + 1) * scaleFactor;
```

Which is exactly the same as the `(z + 1) * scaleFactor` that we used in the previous example.

In the box demo, an additional `computeSimpleProjectionMatrix()` method is added. This is called in the `draw()` method and has the scale factor passed to it. The result should be identical to the last example:

```js
function computeSimpleProjectionMatrix(scaleFactor) {
  // prettier-ignore
  this.transforms.projection = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, scaleFactor,
    0, 0, 0, scaleFactor,
  ];
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
    // Scale down by 20%
    const scaleMatrix = scale(0.2, 0.2, 0.2);
    // Rotate a slight tilt
    const rotateXMatrix = rotateX(now * 0.0003);
    // Rotate according to time
    const rotateYMatrix = rotateY(now * 0.0005);
    // Move slightly down
    const translateMatrix = translate(0, -0.1, 0);
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

  computeSimpleProjectionMatrix(scaleFactor) {
    // prettier-ignore
    this.transforms.projection = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, scaleFactor, // Note the extra scale factor here
      0, 0, 0, scaleFactor,
    ];

    // This matrix copies the point and sets the W component to 1 + (z * scaleFactor)
  }

  draw() {
    const gl = this.gl;
    const now = Date.now();
    // Compute our matrices
    this.computeModelMatrix(now);
    this.computeSimpleProjectionMatrix(0.5);
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

Although the result is identical, the important step here is in the vertex shader. Rather than modifying the vertex directly, it gets multiplied by an additional **projection matrix**, which (as the name suggests) projects 3D points onto a 2D drawing surface:

```glsl
// Make sure to read the transformations in reverse order
gl_Position = projection * model * vec4(position, 1.0);
```

```html
<!-- The vertex shader operates on individual vertices in our model data by setting gl_Position -->
<script id="vertex-shader" type="x-shader/x-vertex">
  // Each point has a position and color
  attribute vec3 position;
  attribute vec4 color;

  // The transformation matrices
  uniform mat4 model;
  uniform mat4 projection;

  // Pass the color attribute down to the fragment shader
  varying vec4 vColor;

  void main() {
    // Pass the color down to the fragment shader
    vColor = color;

    // Read the multiplication in reverse order, the original point is moved
    // into clip space, and then projected into a perspective view by filling
    // in the W component
    gl_Position = projection * model * vec4(position, 1.0);
  }
</script>
```

## The viewing frustum

Before we move on to covering how to compute a perspective projection matrix, we need to introduce the concept of the **viewing frustum** (also known as the **view frustum**). This is the region of space whose contents are visible to the user at the current time. It's the 3D region of space defined by the field of view and the distances specified as the nearest and farthest content that should be rendered.

While rendering, we need to determine which polygons need to be rendered in order to represent the scene. This is what the viewing frustum defines. But what's a frustum in the first place?

A frustum is the 3D solid that results from taking any solid and slicing off two sections of it using two parallel planes. Consider our camera, which is viewing an area that starts immediately in front of its lens and extends off into the distance. The viewable area is a four-sided pyramid with its peak at the lens, its four sides corresponding to the extents of its peripheral vision range, and its base at the farthest distance it can see, like this:

If we used this to determine the polygons to be rendered each frame, our renderer would need to render every polygon within this pyramid, all the way off into infinity, including also polygons that are very close to the lens—likely too close to be useful (and certainly including things that are so close that a real human wouldn't be able to focus on them in the same setting).

So the first step in reducing the number of polygons we need to compute and render, we turn this pyramid into the viewing frustum. The two planes we'll use to chop away vertices in order to reduce the polygon count are the **near clipping plane** and the **far clipping plane**.

In WebGL, the near and far clipping planes are defined by specifying the distance from the lens to the closest point on a plane which is perpendicular to the viewing direction. Anything closer to the lens than the near clipping plane or farther from it than the far clipping plane is removed. This results in the viewing frustum, which looks like this:

The set of objects to be rendered for each frame is essentially created by starting with the set of all objects in the scene. Then any objects which are _entirely_ outside the viewing frustum are removed from the set. Next, objects which partially extrude outside the viewing frustum are clipped by dropping any polygons which are entirely outside the frustum, and by clipping the polygons which cross outside the frustum so that they no longer exit it.

Once that's been done, we have the largest set of polygons which are entirely within the viewing frustum. This list is usually further reduced using processes like back-face culling (removing polygons whose back side is facing the camera) and occlusion culling using hidden-surface determination (removing polygons which can't be seen because they're entirely blocked by polygons that are closer to the lens).
