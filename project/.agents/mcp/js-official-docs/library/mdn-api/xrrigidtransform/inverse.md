---
title: "XRRigidTransform: inverse property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrrigidtransform/inverse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRigidTransform: inverse property

The read-only **`inverse`** property
of the `XRRigidTransform` interface returns another
`XRRigidTransform` object which is the inverse of its owning
transform. That is, you can always get the inverse of any
`XRRigidTransform` using its `inverse` property, instead of having
to explicitly generate it.

## Value

An `XRRigidTransform` which contains the inverse of the
`XRRigidTransform` on which it's accessed.

Applying the inverse of a transform to any object previously transformed by the parent
`XRRigidTransform` always undoes the transformation, resulting in the object
returning to its previous pose. In other words, its position and orientation both return
to their prior configurations.

## Examples

In this example, the model view matrix for an object is computed by taking the view
matrix and multiplying it by the object's pose matrix.

```js
const modelViewMatrix = mat4.create();

for (const view of pose.view) {
  const viewport = glLayer.getViewport(view);
  gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

  // …

  mat4.multiply(modelViewMatrix, view.transform.inverse.matrix, objectMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );

  // …
}
```

This outline of a renderer's core code shows how the pose's view gets represented by
taking its transform's inverse's matrix as the model view matrix used to transform
objects based on the viewer's position and orientation. The inverse's matrix is
multiplied by the object's matrix to get the model view matrix, which is then passed
into the shader program by setting a uniform to contain that information.
