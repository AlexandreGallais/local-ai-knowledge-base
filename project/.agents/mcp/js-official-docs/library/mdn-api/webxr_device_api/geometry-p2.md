---
title: "Geometry and reference spaces in WebXR (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/geometry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Geometry and reference spaces in WebXR (part 2 of 2)

## Reference spaces

Because of the variety of XR hardware available, coming in a wide variety of form factors from many developers, it's impractical and non-scalable to expect developers to have to directly communicate with the tracking technology being used. Instead, the WebXR Device API is designed to have developers plan their users' experiences and request an appropriate reference space that best represents those needs. This is done by asking the user agent for an **`XRReferenceSpace`** matching those needs.

An `XRReferenceSpace` object acts as a means to adapt one coordinate system reference frame to another. After putting on a headset, consider the virtual world around you to have a coordinate system in which your position is (0, 0, 0)—that is, you're at the center of everything. Doesn't that feel empowering? Forward, directly in front of your headset, is the -Z axis, with +Z behind you. X is positive to your right and negative to your left. Y is negative as you go downward and positive as you go upward. This indicates the position of the headset in space at the start of your use of the XR system, with the origin (0, 0, 0) being positioned basically at the bridge of your nose. This space is the **world space**.

Next, consider the XR controller you have in your left hand. It has the ability to report movement and its orientation, but it doesn't know anything about the position of the headset or, more crucially, its coordinate system. But the controller still needs a way to report its position to your app. Thus, it has its own coordinate system. This is a reference space which is provided to your app when input events occur. This reference space internally knows how to map the coordinates of the controller to the headset's coordinates, so WebXR can translate coordinates back and forth for you.

Once created, an `XRReferenceSpace` guarantees a certain level of support for motion and orientation tracking, and provides a mechanism for obtaining an `XRViewerPose` from which you can get a matrix which represents the position and facing direction of the space relative to the world space, if the space represents a viewer such as the user's headset, an observer's headset, or a virtual camera.

All of this is the browser's responsibility to handle, providing consistent behavior regardless of how capable each of the underlying reference spaces are. No matter how powerful or simple the individual XR device is, code written using WebXR will still work, within the limitations of the available hardware.

Regardless of the type of reference space you choose, its type is `XRReferenceSpace` or is a type derived from `XRReferenceSpace`. The currently available reference space types, are shown below.

- `bounded-floor`
    An `XRBoundedReferenceSpace` similar to the `local` type, except the user is not expected to move outside a predetermined boundary, given by the `boundsGeometry` in the returned object.
- `local`
    An `XRReferenceSpace` tracking space whose native origin is located near the viewer's position at the time the session was created. The exact position depends on the underlying platform and implementation. The user isn't expected to move much if at all beyond their starting position, and tracking is optimized for this use case. For devices with six degrees of freedom (6DoF) tracking, the `local` reference space tries to keep the origin stable relative to the environment.
- `local-floor`
    An `XRReferenceSpace` similar to the `local` type, except the starting position is placed in a safe location for the viewer to stand, where the value of the y axis is 0 at floor level. If that floor level isn't known, the user agent will estimate the floor level. If the estimated floor level is non-zero, the browser is expected to round it such a way as to avoid fingerprinting (likely to the nearest centimeter).
- `unbounded`
    An `XRReferenceSpace` tracking space which allows the user total freedom of movement, possibly over extremely long distances from their origin point. The viewer isn't tracked at all; tracking is optimized for stability around the user's current position, so the native origin may drift as needed to accommodate that need.
- `viewer`
    An `XRReferenceSpace` tracking space whose native origin tracks the viewer's position and orientation. This is used for environments in which the user can physically move around, and is supported by all instances of `XRSession`, both immersive and inline, though it's most useful for inline sessions. It's particularly useful when determining the distance between the viewer and an input, or when working with offset spaces. Otherwise, typically, one of the other reference space types will be used more often.

The remainder of this guide explores how to select the right reference space for your app's needs.

## Defining spatial relationships with reference spaces

There are a number of commonly used ways to reference the positions and orientations of objects relative to their environment, as well as to constrain the environment itself. To that end, WebXR defines a set of standard spaces, called **reference spaces**, each of which supports a different technique for correlating its local space's reference frame coordinate system to the coordinate system of the space in which it exists.

However, regardless of which type of reference space is being used, you can use the same functions to convert coordinates from space to parent space.

### Selecting the reference space type

Straight off, let's state the simplest step in the process of deciding which reference type to use: the reference spaces you're most likely to use are `local`, `local-floor`, `unbounded`, or `bounded-floor`.

#### Floor level reference spaces

The reference space types with `-floor` in their names work just like the corresponding non-floor spaces, except that they attempt to automatically ensure that the viewer is positioned in a safe place at or near (but always above) ground level. This is the plane at which the `y` coordinate is always 0, unless a floor is otherwise established. These space types are _not_ viable if the rooms have uneven floors or floors whose height above ground level vary, since they don't support the avatar's vertical position changing.

#### The primary reference space types

The `viewer` reference space corresponds to the viewer's position in space; it's used by the `XRViewerPose` returned by the `XRFrame` method `getViewerPose()`. It's not typically used directly otherwise. The only real exception is that you are likely to use the `viewer` reference space when performing the XR scene inline within web content.

The `local` reference space is typically used to describe a relatively small area, such as a single room. It is not only always available when using an immersive session mode (`immersive-vr` or `immersive-ar`), but is always included among the optional features when requesting a new session; thus, every session created by `navigator.xr.requestSession()` supports the `local` reference space type.

To represent a large area—potentially involving multiple rooms or beyond—you can use the `unbounded` reference space type, which specifies no constraints on the viewer's movement. If you wish to prevent the user from moving into certain areas, you must handle that yourself.

The `bounded-floor` reference space type doesn't have a corresponding one that isn't floor-bound. If the user's XR hardware permits them to move about their real-world space, and you are able to do so, it may be useful to use a `bounded-floor` reference space, which lets you specifically define the boundaries of the area in which passage is allowed and safe. See the article Using bounded reference spaces to learn more about the use of bounded reference spaces.

By using a reference space to describe the position and orientation of objects, WebXR is able to standardize the form of the data you use to describe these things, regardless of the underlying XR hardware. The reference space's configuration is then able to provide you with the view matrices and object poses needed to correctly render the contents of the space.

### Establishing the reference space

The topmost space—the one obtained by calling the `XRSession` method `requestReferenceSpace()`—describes the coordinate system used for the overall world space. Everything is fundamentally tied to this coordinate system, which represents the relationship between the user's equipment's position and the virtual world.

While you can use WebXR for everything from augmenting the world with annotations to 360° video playback to scientific simulations to virtual reality training systems or anything else you can imagine, let's take a 3D video game as an example of a typical WebXR application. Consider the model of a player's avatar standing in the game world's space. You position that avatar relative to the world space, using the coordinate system defined by the world's reference space.

To move the player to a new position, you could rewrite all of its coordinates or manually apply a transform each time they move, but there's an easier way, thanks to reference spaces and their ability to be created relative to one another. Create an `XRRigidTransform` object representing the new position and orientation of the player's avatar, then create a new reference space to represent the avatar's point of view at the new position using the `XRReferenceSpace` method `getOffsetReferenceSpace()`. This comes in especially handy when implementing support for using non-XR devices such as keyboards or mice to move the player's avatar through the world.

With the newly-created reference space, the avatar can remain at the same coordinates yet appear in the world to be located at (and be see the world from the perspective of) its new location. For a more detailed look at how to use reference spaces to manage the player's viewpoint, see the article

In the case of our game avatar example, it's rare for an avatar (or any other moving creature or machine) to be a simple blob sliding around the world. They usually have additional form, as well as internal movement, such as moving legs, arms that swing as they walk, a head that turns or bobs, weapons that move around, and so forth. Bring these to life using standard WebGL techniques and a positioning matrix or `XRRigidTransform` to shift the objects to the correct position relative to the effective origin.

### Device limitations on reference spaces

Some XR devices can't be made to support a given experience, despite the efforts the API goes to in order to make up for any missing capabilities. For example, there's no way for a basic <example-value> such as a GearVR device to be made to work in an app that requires support for allowing the user to walk around the environment by tracking their real-world movements.

To support progressive enhancement—and thus broaden the availability of your app or site—you should choose a reference space that offers the lowest amount of functionality needed, or provide a fallback mechanism that detects failed attempts to obtain reference spaces and tries again with a less powerful alternative.

The compatibility issues that arise may be as fundamental as being unable to support `immersive-ar` mode (augmented reality sessions) on a VR-only headset, or may involve a request for one or more required options which cannot be met when attempting to create the XR session.

XR sessions are created using the `navigator.xr.requestSession()` method. One of its optional parameters is an object which you can use to specify required and/or optional features that the session must (or should ideally) support. Currently, the only supported options are strings identifying the standard reference spaces. Using these, you can ensure before your code even runs that you have access to a WebXR session that can support the reference space type you require or prefer.

> **Note:**
> At this time, the reference space to use or to prefer is the only option available when creating an `XRSession`. In the future, it's likely that more options will become available.

## Positioning and orienting objects

All spatial (position, orientation, and movement) information exchanged between your app and the WebXR API is expressed in relation to a specific space at the time the frame is being rendered. Any further position and orientation management is between you and WebGL, though you do make use of the origin offset from the reference space in order to position the objects correctly in the 3D world.

When it's time to render an animation frame, the callback function specified when you called the WebXR session's `XRSession` object's `requestAnimationFrame()` method is invoked. The callback receives as one of its parameters a timestamp indicating the time at which the frame takes place, and should perform all rendering for the corresponding animation frame.

As the callback is repeatedly called with increasing time values, the callback generates a sequence of frames which are presented using the XR hardware, thereby showing a 3D scene to the user.

You can learn more about the animation process in the article Rendering and the WebXR frame animation callback.

For an example and a more detailed, code-level explanation of how to position, orient, and move objects in virtual space, see the article Movement, orientation, and motion.

## See also

- WebXR Device API
- WebGL: 2D and 3D rendering for the web
- Matrix math for the web
