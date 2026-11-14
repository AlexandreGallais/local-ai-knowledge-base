---
title: "XRReferenceSpaceEvent: transform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrreferencespaceevent/transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRReferenceSpaceEvent: transform property

The read-only `XRReferenceSpaceEvent` property
**`transform`** indicates the position and orientation of the
affected `referenceSpace`'s
native origin after the changes the event represents are applied. The
`transform` is defined using the old coordinate system, which allows it to be
used to convert coordinates from the pre-event coordinate system to the post-event
coordinate system.

## Value

An `XRRigidTransform` object providing a transform that can be used to
convert coordinates from the pre-event coordinate system to the post-event coordinate
system.

## Usage notes

Upon receiving a `reset` event, you can apply the `transform` to
cached position or orientation information to shift them into the updated coordinate
system. Alternatively, you can just discard any cached positional information and
recompute from scratch. The approach you take will depend on your needs.

For details on what causes a `reset` event and how to respond, see the
`reset` event's documentation.

## Examples

This example handles the `reset` event by walking through all the objects in
a scene, updating each object's position by multiplying it with the event's given
`transform`. The scene is represented by a `scene` object, with
all the objects in an array called `objects` within it.

```js
xrReferenceSpace.addEventListener("reset", (event) => {
  for (const obj of scene.objects) {
    mat4.multiply(obj.transform, obj.transform, event.transform);
  }
});
```
