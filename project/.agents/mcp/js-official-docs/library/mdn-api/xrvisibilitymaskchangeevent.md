---
title: "XRVisibilityMaskChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent

The **`XRVisibilityMaskChangeEvent`** of the WebXR Device API describes the portion of an `XRView` visible to the user after the view has changed, for example by specifying the eye that the view is relevant to, and the vertices of a visibility mask that defines the visible part of the view. This enables performance improvements by allowing the browser to draw only the visible part of the updated view.

An `XRVisibilityMaskChangeEvent` object is made available as the event object of a `visibilitymaskchange` event, fired each time the portion of the view displayed to the user changes to provide new information to update the view.

## Constructor

- `XRVisibilityMaskChangeEvent()` (experimental)
    Creates and returns a new `XRVisibilityMaskChangeEvent` object.

## Instance properties

_In addition to properties inherited from its parent interface, `Event`, `XRVisibilityMaskChangeEvent` provides the following:_

- `eye` (read-only) (experimental)
    The eye the mask applies to.
- `index` (read-only) (experimental)
    The index of the current `XRView` in the `XRViewerPose.views` array.
- `indices` (read-only) (experimental)
    Specifies the index position of each coordinate pair (not individual array index) inside the `vertices` array that define the triangles used to draw the currently visible part of the scene displayed in the `XRView`.
- `session` (read-only) (experimental)
    The `XRSession` to which the event belongs.
- `vertices` (read-only) (experimental)
    An array representing the set of possible coordinate values that may be used in a visibility mask. If this array is empty, the whole region of the `XRView` will be drawn.

## Instance methods

_While `XRSessionEvent` defines no methods, it inherits methods from its parent interface, `Event`._

## Examples

### Three.js example

This snippet shows how `visibilitymaskchange` might be used to draw only the visible portion of the `XRView` in a Three.js application. The new view must be drawn using the `XRView.projectionMatrix` of the relevant `XRView` and a default `XRRigidTransform`.

```js
session.addEventListener("visibilitymaskchange", onVisibilityMaskChange);

function onVisibilityMaskChange(event) {
  const geometry = new BufferGeometry();
  geometry.setIndex(new BufferAttribute(event.indices, 1));
  const vertices = new Float32Array((event.vertices.length / 2) * 3);
  let x = 0,
    y = 0;
  while (x < event.vertices.length) {
    vertices[y++] = event.vertices[x++];
    vertices[y++] = event.vertices[x++];
    vertices[y++] = -1;
  }

  geometry.setAttribute("position", new BufferAttribute(vertices, 3));

  const mask = event.eye === "left" ? leftEyeMask : rightEyeMask;
  const matrix = cameras[event.eye === "left" ? 0 : 1].projectionMatrix;
  mask.geometry = geometry;
  mask.material = new ShaderMaterial({
    vertexShader: _visibility_mask_vertex,
    fragmentShader: _visibility_mask_fragment,
    uniforms: {
      clipMatrix: { value: matrix },
    },
  });

  maskScene = new Scene();
  maskScene.add(leftEyeMask);
  maskScene.add(rightEyeMask);
}
```

The code snippet is taken from this fork of WebXRManager.js.
