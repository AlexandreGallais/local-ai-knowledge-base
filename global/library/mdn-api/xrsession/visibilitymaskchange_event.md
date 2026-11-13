---
title: "XRSession: visibilitymaskchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/visibilitymaskchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: visibilitymaskchange event

The **`visibilitymaskchange`** event is sent to an `XRSession` when the portion of an `XRView` visible to the user changes.

Note that the view is associated with a particular eye, and the part that is visible to the user is defined by a visibility mask. For more information see the `XRVisibilityMaskChangeEvent` interface.

This enables performance improvements by allowing the browser to draw only the visible part of the updated view.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("visibilitymaskchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvisibilitymaskchange = (event) => { }
```

## Event type

An `XRVisibilityMaskChangeEvent`. Inherits from `Event`.

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
