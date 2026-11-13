---
title: "Viewpoints and viewers: Simulating cameras in WebXR (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/cameras/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Viewpoints and viewers: Simulating cameras in WebXR (part 2 of 3)

## Simulating classic cinematography

Cinematography is the art of designing, planning, and executing camera movements to create the desired look and emotion for a scene in animation or film. There are a number of terms that are helpful to understand, primarily around camera movement, as these terms are used to describe designed viewpoint changes with the virtual camera. It's also entirely possible to perform more than one of these movements at the same time; for example, you can pan the camera while also zooming in on the scene.

Keep in mind that the majority of camera movements are described relative to the camera's reference space.

The format for storing matrices is generally as a flat array in column-major order; that is, the values from the matrix are written starting with the top-left corner and moving _down_ to the bottom, then moving over to the right a row and repeating until all values are in the array.

Thus a matrix that looks like this:

<math display="block">
  <semantics><mrow><mo>[</mo><mtable rowspacing="0.5ex"><mtr><mtd><msub><mi>a</mi><mn>1</mn></msub></mtd><mtd><msub><mi>a</mi><mn>5</mn></msub></mtd><mtd><msub><mi>a</mi><mn>9</mn></msub></mtd><mtd><msub><mi>a</mi><mn>13</mn></msub></mtd></mtr><mtr><mtd><msub><mi>a</mi><mn>2</mn></msub></mtd><mtd><msub><mi>a</mi><mn>6</mn></msub></mtd><mtd><msub><mi>a</mi><mn>10</mn></msub></mtd><mtd><msub><mi>a</mi><mn>14</mn></msub></mtd></mtr><mtr><mtd><msub><mi>a</mi><mn>3</mn></msub></mtd><mtd><msub><mi>a</mi><mn>7</mn></msub></mtd><mtd><msub><mi>a</mi><mn>11</mn></msub></mtd><mtd><msub><mi>a</mi><mn>15</mn></msub></mtd></mtr><mtr><mtd><msub><mi>a</mi><mn>4</mn></msub></mtd><mtd><msub><mi>a</mi><mn>8</mn></msub></mtd><mtd><msub><mi>a</mi><mn>12</mn></msub></mtd><mtd><msub><mi>a</mi><mn>16</mn></msub></mtd></mtr></mtable><mo>]</mo></mrow><annotation encoding="TeX">\left [ \begin{matrix} a_{1} & a_{5} & a_{9} & a_{13} \\ a_{2} & a_{6} & a_{10} & a_{14} \\ a_{3} & a_{7} & a_{11} & a_{15} \\ a_{4} & a_{8} & a_{12} & a_{16} \end{matrix} \right ]</annotation></semantics>
</math>

Is represented in array form like this:

```js
let matrixArray = [
  a1, a2, a3, a4,
  a5, a6, a7, a8,
  a9, a10, a11, a12,
  a13, a14, a15, a16,
];
```

In this array, the leftmost column contains the entries `a1`, `a2`, `a3`, and `a4`. The topmost row contains the entries `a1`, `a5`, `a9`, and `a13`.

Keep in mind that most WebGL and WebXR programming is done using third-party libraries which expand upon the basic <example-value> of WebGL by adding routines that make it much easier to perform not only core matrix and other operations, but often also to simulate these standard cinematography techniques. You should strongly consider using one instead of directly using WebGL. This guide uses WebGL directly since it's useful to understand to some extent what goes on under the hood, and to aide in the development of libraries or to help you optimize code.

> **Note:**
> Even though we use phrases like "move the camera," what we're really doing is moving the entire world around the camera. This affects the way certain values work, which will be noted as they come up below.

### Zooming

Among the best known camera effects is the **zoom**. Zooming is performed in a physical camera by altering the focal length of the lens; this is the distance between the center of the lens itself and the camera's light sensors. Thus, zooming doesn't actually involve moving the camera at all. Instead, a zoom shot changes the magnification of the camera over time to make the area of focus seem closer to or farther away from the viewer, without actually physically moving the camera. A slow move can bring a sense of movement, ease, or focus to a scene, while a rapid zoom can create a sense of anxiety, surprise, or tension.

Because a zoom does not move the camera's position, the resulting effect is unnatural. The human eye doesn't have a zoom lens on it. We make things smaller or larger by moving away from or toward them. In cinematography, that's called a dolly shot.

There are two techniques in 3D graphics that can create similar though not identical results, and whose methods apply more easily in different situations.

#### Zooming by adjusting field of view

You can do something more akin to a true "zoom" by altering the camera's **field of view** (**FOV**). The field of view is an angle defining the length of the arc on the entire viewable area surrounding the camera that should be visible at once. This is an effect of the focal length in a physical camera, so since there is no true camera, altering the FOV is a passable substitute.

Recall that the circumference of a circle is 2π⋅r radians (360°); as such, this is the theoretical maximum FOV. Realistically, though, not only do humans not see anywhere near that much, but viewing devices such as monitors and VR goggles tend to reduce the field of view even further. Human eyes typically have a horizontal field of view of around 135° (about 2.356 radians) and a vertical FOV of about 180° (π or around 3.142 radians).

Making the camera's FOV smaller reduces the arc that will be included in the viewport, thus enlarging that content when rendered to the view. There are differences between this and an optical zoom effect, but the result is generally close enough to get the job done.

The following function returns a projection perspective matrix that integrates the specified field of view angle as well as the given near and far clipping plane distances:

```js
function createPerspectiveMatrix(viewport, fovDegrees, nearClip, farClip) {
  const fovRadians = fovDegrees * (Math.PI / 180.0);
  const aspectRatio = viewport.width / viewport.height;

  const transform = mat4.create();
  mat4.perspective(transform, fovRadians, aspectRatio, nearClip, farClip);
  return transform;
}
```

After converting the FOV angle, `fovDegrees`, from degrees to radians and computing the aspect ratio of the `XRViewport` specified by the `viewport` parameter, this function uses the glMatrix library's `mat4.perspective()` function to compute the perspective matrix.

The perspective matrix encapsulates the field of view (technically, this is the _vertical_ field of view), aspect ratio, and the near and far clipping planes within the 4x4 matrix `transform`, which is then returned to the caller.

The near clipping plane is the distance in meters to a plane parallel to the display surface closer than which nothing gets drawn. Any vertices which lie on the same side of that plane as the camera are not drawn. Conversely, the far clipping plane is the distance in meters to a plane beyond which no vertices are drawn.

To zoom using a scaling factor or percentage, you can map 1x (100% of normal size) to the largest value of FOV you allow (which leads to the most content being visible), then map your maximum magnification to the maximum value of FOV you support and map corresponding values in between.

If you start each frame's rendering pass by computing the perspective matrix, you can then multiply into that matrix all the other transforms you need to apply in order to result in the frame's desired geometry. For example:

```js
const transform = createPerspectiveMatrix(viewport, 130, 1, 100);
const translateVec = vec3.fromValues(
  -trackDistance,
  -craneDistance,
  pushDistance,
);
mat4.translate(transform, transform, translateVec);
```

This starts with the perspective matrix representing a 130° vertical field of view, then applies a translation that moves the camera in a manner that includes track, crane, and push movements.

#### Scaling transforms

Unlike a true "zoom", **scaling** involves multiplying each of the `x`, `y`, and `z` coordinate values in a position or vertex by a scaling factor for that axis. These may or may not necessarily be identical for each axis, though the closest result you can get to a zoom effect would involve using the same value for each. This would need to be applied to every vertex in the scene—ideally in the vertex shader.

If you want to scale up by a factor of 2, you need to multiply each component by 2.0. To scale down by the same amount, multiply them by -2.0. In matrix terms, this is performed using a transform matrix with scaling factored into it, like this:

```js
let scaleTransform = [
  Sx, 0, 0, 0,
  0, Sy, 0, 0,
  0, 0, Sz, 0,
  0, 0, 0, 1
];
```

This matrix represents a transform that scales up or down by a factor indicated by `(Sx, Sy, Sz)`, where `Sx` indicates the scaling factor along the X axis, `Sy` the scaling factor along the Y axis, and `Sz` the factor for the Z axis. If any of these values differs from the others, the result will be stretching or contraction which is different in some dimensions compared to others.

If the same scaling factor is to be applied in every direction, you can create a simple function to generate the scaling transform matrix for you:

```js
function createScalingMatrix(f) {
  return [f, 0, 0, 0, 0, f, 0, 0, 0, 0, f, 0, 0, 0, 0, 1];
}
```

With the transform matrix in hand, we apply the transform `scaleTransform` to the vector (or vertex) `myVector`:

```js
let myVector = [2, 1, -3];
let scaleTransform = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1];
vec4.transformMat4(myVector, myVector, scaleTransform);
```

Or, using scaling along every axis by the same factor using the `createScalingMatrix()` function shown above:

```js
let myVector = [2, 1, -3];
vec4.transformMat4(myVector, myVector, createScalingMatrix(2.0));
```

### Panning (Yawing left or right)

**Panning** or **yaw** is the rotation of the camera left to right or right to left, with its base otherwise fixed in place. The position of the camera in space does not change, only the direction in which it's looking. And that direction does not change other than horizontally. Panning is great for establishing a setting or providing a sense of scope in a vast space or on a vast object. Or just for looking left and right, like simulating the player turning their head in an immersive or VR scenario.

To do this, then, we need to rotate around the Y axis, to simulate the left and right rotation of the camera. Using the glMatrix library we've used previously, this can be performed using the `rotateY()` method on the `mat4` class, which represents a standard 4x4 matrix. To rotate the viewpoint defined by the matrix `viewMatrix` by `panAngle` radians:

```js
mat4.rotateY(viewMatrix, viewMatrix, panAngle);
```

If `panAngle` is positive, this transform will pan the camera to the right; a negative value for `panAngle` will pan to the left.

### Tilting (Pitching up or down)

When you **tilt** or **pitch** the camera, you keep it fixed in space at the same coordinates while changing the direction in which it's facing vertically without altering the horizontal portion of its facing at all. It adjusts the direction it's pointing up and down. Tilting is good for capturing the scope of a tall object or scene, such as a forest or a mountain, but is also a popular way to introduce a character or locale of importance or which inspires awe. It's also of course useful for implementing support for a player looking up and down.

Thus, tilting the camera can be achieved by rotating the camera around the X axis, so that it pivots to look up and down. This can be done using the appropriate method in your matrix math library, such as the `rotateX()` method in glMatrix's `mat4` class:

```js
mat4.rotateX(viewMatrix, viewMatrix, angle);
```

Positive values for `angle` will tilt the camera downward, while negative values of `angle` will tilt upward.

### Dollying (Moving in or out)

A **dolly** shot is one in which the entire camera is moved forward and backward. In classic filmmaking, this is typically done with the camera mounted on a track or on a moving vehicle. The resulting motion can create impressively smooth effects, especially if moving along with the person or object that's the focus of your shot.

While a dolly shot and a zoom seem like they ought to look about the same, they don't. The fact that zooming alters the camera's focal length means that the spatial relationship between the target and its surroundings doesn't change even as the target gets larger or smaller in the frame. On the other hand, a dolly shot, by actually moving the camera, replicates the sense of physical movement, causing the relationships of objects in the scene to shift as you expect while moving past them as you go toward or away from the target of the shot.

To perform a dolly operation, translate the camera view forward and backward along the Z axis:

```js
mat4.translate(viewMatrix, viewMatrix, [0, 0, dollyDistance]);
```

Here, `[0, 0, dollyDistance]` is a vector wherein `dollyDistance` is the distance to dolly the camera. Since this works by moving the entire world around the camera, what really happens here is that the entire world moves along the Z axis by `dollyDistance` meters relative to the camera. If `dollyDistance` is positive, the world moves toward the user by that amount, resulting in the camera being closer to the scene. Contrariwise, negative values of `dollyDistance` move the world away from the user, causing the camera to appear to move backward from the target.

### Trucking (Moving left or right)

**Trucking** using a physical camera uses the same kind of rigging as dollying, but instead of moving the camera forward and backward, it moves from left to right or vice versa. The camera doesn't rotate at all, so the focus of the shot slowly glides off the screen. This can suggest concentration, time passing, or contemplation when attempting to establish emotion in a scene. It's also used frequently in "walk-and-talk" scenes, wherein the camera glides alongside the characters and they walk through the scene.

To move the camera left and right, translate the view matrix along the X axis in the opposite direction from the desired camera movement:

```js
mat4.translate(viewMatrix, viewMatrix, [-truckDistance, 0, 0]);
```

Note the vector `[-truckDistance, 0, 0]`. This compensates for the fact that the truck operation works by moving the world rather than the camera. By moving the entire world in the opposite direction from the direction indicated by `truckDistance`, we achieve the effect of moving the camera the expected direction. This way, positive values of `truckDistance` will move the camera to the right (by moving the world to the left) and negative values of `truckDistance` will move the camera to the left by moving the world to the right.
