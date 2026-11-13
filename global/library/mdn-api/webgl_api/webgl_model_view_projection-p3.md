---
title: "WebGL model view projection (part 3 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_model_view_projection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL model view projection (part 3 of 8)

### WebGLBox example

This example will create a custom `WebGLBox` object that will draw a 2D box on the screen. It is implemented as a class, which contains a constructor and a `draw()` method to draw a box on the screen:

```js
class WebGLBox {
  canvas = document.getElementById("my-canvas");
  gl = this.canvas.getContext("webgl");
  webglProgram = createWebGLProgramFromIds(
    this.gl,
    "vertex-shader",
    "fragment-shader",
  );
  positionLocation;
  colorLocation;
  constructor() {
    const gl = this.gl;

    // Setup a WebGL program
    gl.useProgram(this.webglProgram);

    // Save the attribute and uniform locations
    this.positionLocation = gl.getAttribLocation(this.webglProgram, "position");
    this.colorLocation = gl.getUniformLocation(this.webglProgram, "vColor");

    // Tell WebGL to test the depth when drawing, so if a square is behind
    // another square it won't be drawn
    gl.enable(gl.DEPTH_TEST);
  }
  draw(settings) {
    // Create some attribute data; these are the triangles that will end being
    // drawn to the screen. There are two that form a square.

    // prettier-ignore
    const data = new Float32Array([
      // Triangle 1
      settings.left, settings.bottom, settings.depth,
      settings.right, settings.bottom, settings.depth,
      settings.left, settings.top, settings.depth,

      // Triangle 2
      settings.left, settings.top, settings.depth,
      settings.right, settings.bottom, settings.depth,
      settings.right, settings.top, settings.depth,
    ]);

    // Use WebGL to draw this onto the screen.

    // Performance Note: Creating a new array buffer for every draw call is slow.
    // This function is for illustration purposes only.

    const gl = this.gl;

    // Create a buffer and bind the data
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // Setup the pointer to our attribute data (the triangles)
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0);

    // Setup the color uniform that will be shared across all triangles
    gl.uniform4fv(this.colorLocation, settings.color);

    // Draw the triangles to the screen
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
```

The shaders are the bits of code written in GLSL that take our data points and ultimately render them to the screen. For convenience, these shaders are stored in a `<script>` element that is brought into the program through the custom function `createWebGLProgramFromIds()`. This function handles the basics of taking some GLSL source code and compiling it into a WebGL program. It takes three parameters — the context to render the program in, the ID of the `<script>` element containing the vertex shader, and the ID of the `<script>` element containing the fragment shader. This function is not explained in depth here; if you want to see its implementation, click "Play" on the code block. The vertex shader positions the vertices, and the fragment shader colors each pixel.

First take a look at the vertex shader that will move the vertices on the screen:

```glsl
// The individual position vertex
attribute vec3 position;

void main() {
  // the gl_Position is the final position in clip space after the vertex shader modifies it
  gl_Position = vec4(position, 1.0);
}
```

```html
<script id="vertex-shader" type="x-shader/x-vertex">
  // The individual position vertex
  attribute vec3 position;

  void main() {
    // the gl_Position is the final position in clip space after the vertex shader modifies it
    gl_Position = vec4(position, 1.0);
  }
</script>
```

Next, to actually rasterize the data into pixels, the fragment shader evaluates everything on a per pixel basis, setting a single color. The GPU calls the shader function for each pixel it needs to render; the shader's job is to return the color to use for that pixel.

```glsl
precision mediump float;
uniform vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
```

```html
<script id="fragment-shader" type="x-shader/x-fragment">
  precision mediump float;
  uniform vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
</script>
```

With those settings included, it's time to directly draw to the screen using clip space coordinates.

```js
const box = new WebGLBox();
```

First draw a red box in the middle.

```js
box.draw({
  top: 0.5, // x
  bottom: -0.5, // x
  left: -0.5, // y
  right: 0.5, // y

  depth: 0, // z
  color: [1, 0.4, 0.4, 1], // red
});
```

Next, draw a green box up top and behind the red box.

```js
box.draw({
  top: 0.9, // x
  bottom: 0, // x
  left: -0.9, // y
  right: 0.9, // y

  depth: 0.5, // z
  color: [0.4, 1, 0.4, 1], // green
});
```

Finally, for demonstration that clipping is actually going on, this box doesn't get drawn because it's entirely outside of clip space. The depth is outside of the -1.0 to 1.0 range.

```js
box.draw({
  top: 1, // x
  bottom: -1, // x
  left: -1, // y
  right: 1, // y

  depth: -1.5, // z
  color: [0.4, 0.4, 1, 1], // blue
});
```

#### The results

```html
<!-- The SVG overlay showing clip space -->
<svg
  id="clip-space-axis"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 500 500"
  preserveAspectRatio="none"></svg>

<!-- Use a separate SVG for text to avoid scaling -->
<svg id="clip-space-text" xmlns="http://www.w3.org/2000/svg"></svg>
```

```js
const axisOverlay = document.getElementById("clip-space-axis");
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "path");
const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "path");
yAxis.setAttribute("fill", "none");
yAxis.setAttribute("stroke", "black");
xAxis.setAttribute("fill", "none");
xAxis.setAttribute("stroke", "black");
let yAxisPath = "M 249.5 0 L 249.5 500";
let xAxisPath = "M 0 250.5 L 500 250.5";
for (let i = -10; i <= 10; i++) {
  if (i === 0) continue;
  const length = i % 5 === 0 ? 24 : 12;
  const loc = 250 + i * 25 - 0.5;
  yAxisPath += ` M 249.5 ${loc} L ${249.5 + length} ${loc}`;
  xAxisPath += ` M ${loc} 250.5 L ${loc} ${250.5 - length}`;
}
xAxis.setAttribute("d", xAxisPath);
yAxis.setAttribute("d", yAxisPath);
axisOverlay.appendChild(xAxis);
axisOverlay.appendChild(yAxis);

const textOverlay = document.getElementById("clip-space-text");
for (const label of ["+X", "-X", "+Y", "-Y"]) {
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let x, y;
  if (label === "+X") {
    [x, y] = ["97.5%", "53%"];
  } else if (label === "-X") {
    [x, y] = ["2.5%", "53%"];
  } else if (label === "+Y") {
    [x, y] = ["47%", "2.5%"];
  } else if (label === "-Y") {
    [x, y] = ["47%", "97.5%"];
  }
  textEl.setAttribute("x", x);
  textEl.setAttribute("y", y);
  textEl.setAttribute("text-anchor", "middle");
  textEl.setAttribute("font-family", "'Courier New'");
  textEl.setAttribute("font-size", "16");
  textEl.setAttribute("font-weight", "bold");
  textEl.textContent = label;
  textOverlay.appendChild(textEl);
}
for (let i = -1; i <= 1; i += 0.5) {
  if (i === 0) continue;
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textEl.setAttribute("x", "58%");
  textEl.setAttribute("y", `${50 - i * 48}%`);
  textEl.setAttribute("text-anchor", "end");
  textEl.setAttribute("font-family", "'Courier New'");
  textEl.setAttribute("font-size", "11");
  textEl.textContent = i.toFixed(1);
  textOverlay.appendChild(textEl);
  const textEl2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text",
  );
  textEl2.setAttribute("x", `${50 + i * 50}%`);
  textEl2.setAttribute("y", "45%");
  textEl2.setAttribute("text-anchor", i > 0 ? "end" : "start");
  textEl2.setAttribute("font-family", "'Courier New'");
  textEl2.setAttribute("font-size", "11");
  textEl2.textContent = i.toFixed(1);
  textOverlay.appendChild(textEl2);
}
```

#### Exercise

A helpful exercise at this point is to move the boxes around the clip space by varying the code to get a feel for how points get clipped and moved around in clip space. Try drawing a picture like a boxy smiley face with a background.
