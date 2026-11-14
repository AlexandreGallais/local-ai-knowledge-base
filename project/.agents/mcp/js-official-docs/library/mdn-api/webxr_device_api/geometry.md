---
title: "Geometry and reference spaces in WebXR (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/geometry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Geometry and reference spaces in WebXR

At a fundamental level, rendering of scenes for WebXR presentation in either augmented reality or virtual reality contexts is performed using WebGL, so the two APIs share much of the same design language. However, in order to provide the ability to present scenes in true 3D using XR headsets and other such equipment, WebXR has additional concepts that must be understood.

In this article, we introduce the ways in which WebXR expands upon the geometry of WebGL, and how the positions and orientations of objects—both physical and virtual—are described in relation to one another using spaces and, in particular, reference spaces.

The article Spatial tracking in WebXR builds upon the information provided here to cover how the physical position and orientation of the user's head, as well as potentially other parts of their body such as the hands, are mapped into the digital world, as well as how the relative positions of both physical and virtual objects are tracked as they move around, so that the scene can be properly rendered and composited.

## Fundamentals of 3D geometry

While we'll examine here the required math operations used to compute the positions, orientations, and movement of objects in virtual space—plus the need to integrate the human viewer of the scene into the mix—a thorough introduction to geometry and the use of matrices and vectors to manage 3D representations of a scene is well beyond the scope of what can be accomplished in this article. You can learn more about the individual operations in Matrix math for the web.

### Units

Before discussing the details of the geometry of the 3D space used by WebXR, it's first useful to understand the units of measure that are applied to the 3D world.

#### Lengths and distances

WebGL measures all distances and lengths in **meters**. WebXR inherits this standard, as well as the fact that the world is a cube two meters wide, two meters tall, and two meters deep. Each of the three axes has a minimum value of -1.0 and a maximum of 1.0, with the center of the cube located at (0, 0, 0).

This eight cubic meter space encompasses the entire universe for the purposes of your code. Everything you draw must have its coordinates mapped to fit into this space, either explicitly within your code, or by using a transform to adjust the coordinates of all vertices. The most efficient way, of course, is to design your objects and code to use the same coordinate system as WebGL does.

The WebGL coordinates and lengths are transformed automatically at render time to the size of the viewport in which the scene is being rendered.

#### Angles

Angles are specified using **radians**. To convert degrees to radians, multiply the value in degrees by `π/180`. The following code snippet shows two simple functions, `degreesToRadians()` and `radiansToDegrees()`, which convert back and forth between the two units for measuring angles.

```js
const RADIANS_PER_DEGREE = Math.PI / 180.0;

let degreesToRadians = (deg) => deg * RADIANS_PER_DEGREE;
let radiansToDegrees = (rad) => rad / RADIANS_PER_DEGREE;
```

#### Times and durations

> **Note:**
> For security reasons, `DOMHighResTimeStamp` usually introduces a
> small amount of imprecision to the clock in order to prevent it from being used in fingerprinting and timing-based
> attacks.

All times and durations in WebXR are measured using the `DOMHighResTimeStamp` type, which is a double-precision floating-point value specifying the time in milliseconds relative to the starting time. Since the value is a floating-point number, it may be accurate to well better than the millisecond level, depending on the platform and hardware.

Time is primarily used to determine the amount of time that's elapsed since the scene's previous animation frame was drawn. As such the time is typically in alignment with the refresh rate of the display, or some fraction thereof if the frame rate needs to be constrained due to performance issues. This means that the time will usually step in 1/60th of a second intervals, assuming a 60 FPS frame rate. Doing the math, we find that this means that each frame will ideally be rendered 16.6667 milliseconds apart.

### Geometry operations with matrices

We offer a guide to matrix mathematics as it pertains to 3D geometry, including how matrices are used for the three primary transforms that need to be performed when rendering 3D scenes:

- **Translation** is the use of a matrix to shift the position of a point through the virtual space. This motion can be along any of the object's axes, or any combination of them.
- **Rotation** is the application of a matrix that rotates a point around the origin of the object's coordinate system.
- **Scaling** is the use of a matrix to alter the size of an object.

Note that when we say that a transform applies to a point, it also, by extension, can be applied to a _collection_ of points. Since an object is represented by some number of polygons made up of a number of points in space, applying the same transform to every point that makes up the object will apply that same transform to the entire object overall. Transforms can also be applied to vectors, since vectors are described using a coordinate value to define the direction and magnitude of the vector.

## On the origins of spaces

A complete XR-enhanced scene—whether virtual or augmented—is a composite of anywhere from one to potentially dozens of frames of reference. Each object within the scene that needs to directly exchange position and orientation data with the WebXR system needs to be able to report that information in a way that can be understood and adapted as needed to be comprehensible by other objects within the scene.

In augmented reality (AR), this is because of the need to insert virtual objects into the real world, not only placing them correctly but also ensuring that they don't seem to wander around on their own as the user's perspective shifts. In virtual reality (VR), it's all about creating a sense of space in which the user's movements are precisely matched by the imagery presented on the virtual display, to prevent disjoints and disconnects that could cause discomfort or worse.

Thus it's all about creating a sense of space. From the perspective of an XR developer, designing the stage is the part that matters most to your users. Like an architect or a set designer, you have the power to create moods and experiences through a physical environment. How you structure that space will both depend on and influence how users can interact and explore it.

> **Note:**
> A space will typically have foreground, mid-distance, and background elements. The right balance can create a unique presence and guide your user. The foreground includes objects and interfaces that you can interact with directly. The mid-distance includes objects you can interact with to some extent, or can approach in order to examine and engage with more closely. The background, on the other hand, is usually largely or entirely non-interactive, at least until and unless the user is able to approach it, bringing it into the mid-distance or foreground range.

In WebXR, the fundamental concept of a **space**—as in, a coordinate space in which a scene takes place—is represented by an instance of `XRSpace`. The space is used to make determinations about the relative positions and motion of objects and other entities (such as light sources and cameras) within the user's environment.

As mentioned earlier, any given 3D point consists of three components, each identifying the distance from the center of the space along one of the three axes.

This is the **native origin** of the space, corresponding to a specific physical location in the user's environment. Each space has its own native origin, which is tracked by the XR device's tracking system. This may be different from the **effective origin**, which is the origin point for the space's local coordinate system.

The directionality of the coordinate system can be seen in the following diagram:

An `XRRigidTransform` called the **origin offset** is used to transform points from the space's own effective coordinate system to the XR device's native coordinate system. The origin offset is initially an identity transform, since typically the two origins are aligned when the space is first established. However, as changes in alignment accumulate over time the origin offset may change to compensate.

The position of a point in space relative to the origin is determined by determining its distance along each of the three spatial axes shown in the diagram above. The space's origin is the point (0, 0, 0), at the center of the space and at the zero position along each axis. Specifically, under the initial starting conditions, with the default orientation of the viewer upon the space:

- The **x-axis** extends horizontally from left to right away from the origin, with the _x_ coordinate of +1.0 being located at the right edge of the world. Negative values of _x_ extend toward the left from the origin, reaching a value of -1.0 at the left edge of the space.
- The **y-axis** is positive extending upward from the origin toward the top of the screen, reaching +1.0 at the top of the world space. Values of _y_ less than 0 are found below the origin, extending toward the bottom of the screen and reaching -1.0 at the bottom of the world's space.
- The **z-axis** extends from the origin outward from the screen, reaching +1.0 at the closest point to the user in that direction. Negative values of _z_ extend away from the user further into the screen, with the farthest away point in the world having a _z_ of -1.0.

Every object is, at the simplest level, a set of polygons defined by points in 3D space and an offset transform, indicating how to move and rotate the object to position it at the desired point in space. If the offset transform is an identity matrix, the object is located at the origin point.

To be useful for spatial tracking and scene geometry, though, you need to be able to correlate the XR device's perceived position with the space's coordinate system. That's where reference spaces come in.
