---
title: "Inputs and input sources (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/inputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inputs and input sources

A full WebXR experience isn't just about showing the user a wholly virtual scene or augmenting reality by adding to or altering the world around them. In order to make an experience that's fulfilling and engaging, the user needs to be able to interact with it. To that end, WebXR provides support for a variety of kinds of input devices.

In this guide, we'll look at how to use WebXR's input device management features to determine what input sources are available and how to then monitor those sources for inputs in order to handle user interactivity with your virtual or augmented environment.

## Inputs in WebXR

Fundamentally, inputs in WebXR fall into two basic <example-value>: targeting and actions. Targeting is the specification of a point in space by the user's input. This may involve the user tapping on a spot on the screen, tracking their eyes, or the use of a joystick or motion-sensing controller to move a cursor.

Actions include both selection actions, such as clicking on a button, and squeeze actions, such as pulling a trigger or tightening your grip while wearing haptic gloves.

By combining these two types of input with the changing of viewing position and/or orientation through the headset or other mechanisms, you can create an interactive simulated environment.

### Input device types

WebXR supports a variety of different types of devices to handle targeting and action inputs. These devices include but aren't limited to:

- Screen taps (particularly but not necessarily only on phones or tablets) can be used to simultaneously perform both targeting and selection.
- Motion-sensing controllers, which use accelerometers, magnetometers, and other sensors for motion tracking and targeting and may additionally include any number of buttons, joysticks, thumbpads, touchpads, force sensors, and so on to provide additional input sources for both targeting and selection.
- Squeezable triggers or glove grip pads to provide squeeze actions.
- Voice commands using speech recognition.
- Spatially-tracked articulated hands, such as wired gloves can provide both targeting and squeeze actions, as well as selection if outfitted with buttons or other sources of selection actions.
- Single-button click devices.
- Gaze tracking (following the movements of the eye to choose targets).

### Input sources

Each source of WebXR input data is represented by an `XRInputSource` object which describes the input source and its current state. The information for each input source includes which hand it's held in (if applicable), what targeting method it uses, `XRSpace`s that can be used to draw the targeting ray and to find the targeted object or location as well as to draw objects in the user's hands, and profile strings specifying the preferred way to represent the controller in the user's viewing area as well as how the input operates.

The fundamental capabilities of an input source are:

- Targeting
    Monitoring directional controls (either a motion-sensing pointer or a joystick or trackpad, for example) to aim in a direction, possibly at a target, though targeting is left to you to implement yourself. See Facing and targeting for further information.
- Selecting
    Using the main "select" button or other input on the controller to choose the targeted direction (or the object at which it points), or to otherwise engage an action. For details on the primary action, see Primary action.
- Squeezing
    Squeezing the controller or a mechanism on the controller to engage a secondary action. The section Primary squeeze action describes this in more detail.

Any additional capabilities a WebXR controller may have are accessed through the input source's `gamepad` object. This object provides access to all of the buttons, axes, trackpads, and so forth that may be a part of the controller. See Advanced controllers using the gamepad object to learn how to use these controllers.

### Instance properties of input sources

Each individual `XRInputSource` has a set of properties that describe the input's available axes and buttons, which hand the user's holding it in, and how the input source is used to handle targeting within the 3D space.

#### Handedness

**Handedness**, indicated by the `XRInputSource` property `handedness`, is a string which indicates which of the viewer's hands the controller is in: `left` or `right`. It can also be set to `none` if the controller isn't hand-held, or if it's unknown which hand the controller is in.

Handedness can be used for various things, including selecting an appropriate mesh to use to represent the controller in the view and to help present it in the correct hand if drawing hands on the display. It can also be useful if your app uses the notion of "main hand" and "off hand" for determining the functionality of a controller; in a game, for example, the main hand controller may be the player's weapon while the off hand controller might be used to control the positioning of a shield.

#### Targeting ray mode

The targeting ray mode is a string found in the `targetRayMode` property. It describes the technique used to determine the targeting ray and how it should be shown to the user if presented visually.

When the targeting ray mode is `gaze`, the ray's origin is at the viewer and aims in the direction the user is facing. This gaze input method is fairly simple, and doesn't need any special controls, as it will be based on the facing direction reported by the headset or whatever device is used to determine what direction the viewer's face is pointing in. The target ray should extend outward from between the eyes in a direction perpendicular to the viewer's face.

More flexible is the `tracked-pointer` mode, in which the ray's origin is at a handheld controller or hand tracking system's origin and extends outward in the direction in which the controller is pointing. The ray extends outward in a direction defined by whatever platform and controller are being used, if that's defined; otherwise, the ray extends in the same direction the user is pointing in with their index finger, if it were currently outstretched.

The third and final target ray mode is most commonly found on mobile devices like smartphones and tablets. The `screen` mode indicates that the target ray is determined based on the user interacting with the WebXR context by engaging with the screen in some way—most likely by the viewer tapping the screen or dragging the target ray around with their fingers.

#### Target ray space

The `XRSpace` used to describe the position and orientation of the target ray is found in the `targetRaySpace` property. This space's native origin is located at the point from which the target ray is emitted (such as the front tip of the controller, or the end of a gun barrel if the controller is being rendered as a gun, for example), and the space's orientation vector extends outward along the path of the target ray.

You can easily obtain the target ray corresponding to the `targetRaySpace` from within the drawing handler for a given frame using `XRFrame`'s `getPose()` method. The returned `XRPose`'s `transform` is the transform corresponding to the target ray. Thus, for an input controller `primaryInput`:

```js
let targetRayPose = frame.getPose(primaryInput.targetRaySpace, viewerRefSpace);
let targetRayOrigin = targetRayPose.transform.position;
let targetRayVector = targetRayPose.transform.orientation;
```

With this, you now have the point from which the targeting ray is emitted (`targetRayOrigin`) and the direction in which it's pointing (`targetRayVector`), given in the viewer's reference space (`viewerRefSpace`). That's everything you need to be able to draw the targeting ray, determine what's being pointed at, do hit testing, and so forth.

#### Grip space

The input source's `gripSpace` property is an `XRSpace` you can use to render objects so they appear to be held in the viewer's hand.

**Figure: The coordinate system for the left hand's grip space.**

**Figure: The coordinate system for the right hand's grip space.**

The grip space's native origin, located around the center of the player's fist, is (0, 0, 0) within the input source's local coordinate system, while the `XRSpace` specified by `gripSpace` can be used at any time to convert coordinates or vectors from the input source's space into world coordinates (or vice versa).

This means that if you use a 3D model to represent your controller, your player's avatar's hands, or anything else representative of the controller's position in space, the `gripSpace` can be used as the transform matrix that correctly positions and orients the object's model for rendering. To do this, it's necessary to use the transform to convert the grip space to the world coordinate system used by WebGL for rendering purposes.

**Figure: Mapping the grip space to the world coordinate system. The distances _x_, _y_, and _z_ together make up the world coordinates (_x_, _y_, z) corresponding to the origin of the grip space _G_.**

In the diagram above, we see the grip space, whose origin is located at _G_, at the midpoint of the user's grip on the controller, which is pointing directly away from the user, parallel to the _z_ axis. Relative to the origin of the world space, _W_, the grip space's origin is located _x_ units to the right, _y_ units above, and _z_ units farther away. Given the directionality of the axes, the coordinates of the grip space can be expressed in world coordinates as (_x_, _y_, -_z_); _z_ is negative since the grip space is farther away along the _z_ axis, and is thus in the negative direction.

If the controller were instead positioned to the left of and closer to the user than the world space origin (or possibly behind the user, if the user is located at the origin, although that's an uncomfortable way to hold a controller), the coordinates would have a negative value for _x_, but a positive value for _z_. The value of _y_ would still be positive unless the controller was moved below the world space origin.

This is shown in the diagram below, in which the controller is located down and to the left of the world space's origin, with the controller also moved to be closer to us than the origin. As a result, the values of _x_ and _y_ are both negative, while _z_ is positive.

**Figure Mapping a grip space to the world origin when the controller is positioned below and to the left of the world origin, and closer to us than the world origin is.**

#### Gamepad record

Each input source has a `gamepad` property which, if not `NULL`, is a `Gamepad` object describing the various controls and widgets available on the controller. If the input device only has the primary movement sensors, a squeeze control, and a button, it may not have a `Gamepad` record. If, however, the `gamepad` is present, you can use it to identify and poll the buttons and axes available on the controller.

While the `Gamepad` record is defined by the Gamepad API specification, it's not actually managed by the Gamepad API, and doesn't function exactly the same way. See Advanced controllers using the gamepad object for more detailed information.

#### Profile strings

Each input source can have zero or more **input profile name** strings, found in the array `profiles`, each of which describes a preferred visual representation of the input source within the 3D world as well as how the input source functions. The use of these profiles is briefly described under Input profiles below.

### Transient input sources

Some devices may create **transient input sources** to be used in tandem with an action which doesn't really come from that device, but is being presented as if it is. For example, if an XR device provides a mode in which the mouse is used to simulate events on the device, a new `XRInputSource` object might be created to represent the simulated input source for the duration of handling the action.

This is necessary because of the separation that's maintained between standard input devices and XR input sources. An artificial source is used to represent the external source for the duration of each transient action.
