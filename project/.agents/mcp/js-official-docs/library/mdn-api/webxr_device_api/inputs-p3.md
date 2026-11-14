---
title: "Inputs and input sources (part 3 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/inputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inputs and input sources (part 3 of 4)

## Actions

In WebXR, an **action** is a special type of event that's triggered by the user activating a special button on the controller. Any additional buttons (as well as things like axis controllers—joysticks, for example—and the like) are managed solely through the `XRInputSource` property `gamepad`. See Advanced controllers using the gamepad object below for further details on supporting these extra controls and buttons.

The **primary action** is the action that is triggered when the user engages the main control element that serves a special purpose. There are currently two types of primary action:

- The **primary action** is the action which is activated when the user activates the primary or "select" input on their controller. This input may be a button, trigger, trackpad tap or click, a voice command, or special hand gesture, or possibly some other form of input. For example, on a hand controller with a trackpad that can be clicked on, a trigger control, as well as back and "menu" buttons, clicking the trackpad is likely to be the primary action. Some controllers might have a button labeled "select." On a gamepad-style controller, the "A" button is likely to be the primary action.
- The **primary squeeze action** is the action which is engaged when the user squeezes the controller. This "squeezing" may be detected by literally using a pressure sensor in the controller, or may be simulated using a trigger, hand gesture, or other mechanism. For example, if the input controller is a haptic glove, it might report that the primary squeeze action has occurred when the user makes and clenches their fist.

While a given input source can have only one primary action and one primary squeeze action, there may be more than one control on the input device configured to trigger each primary action. For example, the user might have their controller set up so that both tapping and clicking the trackpad generate a primary action.

These types of input actions are described in more detail below.

### Primary action

Each input source should define a **primary action**. A primary action (which will sometimes be shortened to "select action") is a platform-specific action which responds to the user manipulating it by delivering, in order, the events `selectstart`, `select`, and `selectend`. Each of these events is of type `XRInputSourceEvent`.

> **Note:**
> If an input source doesn't have a primary action, the input source is considered to be an **auxiliary input source**.

When the user points a device along a target ray in your 3D space and then triggers a select action, the following events are sent to the active `XRSession`:

1. A `selectstart` event, indicating that the user has performed the activity that begins the primary action. This may be a gesture, pressing a button, or the like.
2. If the primary action ends successfully (for example, due to the user releasing the button or trigger), rather than because of an error, the `select` event is sent.
3. After the `select` event is sent _or_ if the controller on which the action is being performed is disconnected or otherwise becomes unavailable, the `selectend` event is sent.

Generally speaking, the `selectstart` and `selectend` events tell you when you might want to display something to the user indicating that the primary action is going on. This might be drawing a controller with the activated button in a new color, or showing the targeted object being grabbed and moved around, starting when `selectstart` arrives and stopping when `selectend` is received.

The `select` event, on the other hand, is the event that tells your code that the user has completed the action they want to complete. This might be as simple as throwing an object or pulling the trigger of a gun in a game, or as involved as placing an object that they were dragging around the world back down again in a new location.

If your primary action is a simple trigger action and you don't need to animate anything while the trigger is engaged, you can ignore the `selectstart` and `selectend` events and act on the `select` event.

```js
xrSession.addEventListener("select", (event) => {
  let inputSource = event.inputSource;
  let frame = event.frame;

  /* handle the event */
});
```

Some actions may send these events very quickly, one after the other. The time that elapses between these events depends on both the hardware apparatus that causes the action and the software drivers that interpret the hardware action and turn it into a series of events. Do not presume these events will happen with any particular amount of time between them.

For example, if the hardware that causes the primary action to occur is a button, you would receive `selectstart` when the user presses the button, then `select` and `selectend` when the user releases it.

There are a number of examples showing how to handle `select` events throughout the documentation, such as in the section on Targeting and the targeting ray elsewhere in this article.

### Primary squeeze action

A **primary squeeze action** is a platform-specific action which sends the `XRSession` `squeezestart`, `squeezeend`, and `squeeze` events. This is typically generated by the user squeezing the controller, making a hand gesture that mimes grabbing something, or using (squeezing) a trigger.

The sequence of events is identical to those sent by the primary action, save for the name of each event:

1. A `squeezestart` event is sent to the `XRSession`, indicating that the user has begun a squeeze action.
2. If the primary squeeze action ends successfully, the session is sent a `squeeze` event.
3. Then, a `squeezeend` event is sent to indicate that the squeeze action is no longer underway. This is sent whether the squeeze action succeeded or not.

Two common uses for the primary squeeze action are to grasp and/or pick up objects in the 3D world and to squeeze a trigger to fire a weapon in a game or simulation.

#### Example

This sample code shows a set of squeeze event handlers that implement these events to manage picking up and holding objects from the scene. The code presumes the existence of an `avatar` object representing the character, as used in several other examples on this page, as well as the `pickUpObject()` and `dropObject()` functions, which handle transferring an object from the world to a particular hand and releasing an object from the hand and placing it back into the world.

##### Picking up an object: handling squeezestart events

```js
xrSession.addEventListener("squeezestart", (event) => {
  const targetRaySpace = event.inputSource.targetRaySpace;
  const hand = event.inputSource.handedness;

  let targetRayPose = event.frame.getPose(targetRaySpace, viewerRefSpace);
  if (!targetRayPose) {
    return;
  }

  let targetRayTransform = targetRayPose.transform;
  let targetObject = findTargetObject(targetRayTransform);

  if (targetObject) {
    if (avatar.heldObject[hand]) {
      dropObject(hand);
    }
    pickUpObject(targetObject, hand);
  }
});
```

The `squeezestart` event is handled by getting those pose and transform as usual, and getting the input source's `handedness` into the local constant `hand`. We'll use that to map the hand to the object held in that hand.

The code then identifies the targeted object, then, if an object is found along the targeting ray, picks it up. Picking up an object involves first looking to see if the hand represented by dropping any object already being held in the hand represented by `avatar.heldObject[hand]`. If an object is already held in that hand, it's dropped by calling the `dropObject()` function.

Then `pickUpObject()` is called, specifying the targeted object as the object to remove from the scene and place into the specified `hand`. `pickUpObject()` also records the original position of the object so it can be returned to that spot if the squeeze is canceled or aborted.

##### Dropping the object: the squeeze event handler

The `squeeze` event is received when the user ends the squeeze action by releasing their grip. In this example, we interpret that as releasing the currently-held object, dropping it into the scene at the targeted location.

This code presumes the existence of additional functions `findTargetPosition()`, which follows the target ray until it collides with something, then returns the coordinates at which the collision occurred, and `putObject()`, which places the object held in the specified `hand` at the given position, removing it from the hand.

```js
xrSession.addEventListener("squeeze", (event) => {
  const targetRaySpace = event.inputSource.targetRaySpace;
  const hand = event.inputSource.handedness;

  let targetRayPose = event.frame.getPose(targetRaySpace, viewerRefSpace);
  if (!targetRayPose) {
    return;
  }

  let targetRayTransform = targetRayPose.transform;
  let targetPosition = findTargetPosition(targetRayTransform);

  if (targetPosition) {
    if (avatar.heldObject[hand]) {
      putObject(hand, targetPosition);
      avatar.heldObject[hand] = null;
    }
  }
});
```

As in the `squeezestart` handler, this begins by collecting information needed about the event, including the hand that's dropping an object and the target ray's transform. The target ray transform is passed into the presumed `findTargetPosition()` function to get the coordinates at which to position the dropped object.

With the position in hand, we can then drop the object by calling the `putObject()` function, which takes as its inputs the `hand` and the destination position. This function's job is to remove the object from the specified hand and add it back to the scene, with its position set to place it atop the coordinates returned by `findTargetPosition()`.

##### Canceling the squeeze in the squeezeend handler

The `squeezeend` event is received after the squeeze is complete, even if it fails. We handle it by returning the currently-held object to where it was when it was picked up.

```js
xrSession.addEventListener("squeezeend", (event) => {
  const targetRaySpace = event.inputSource.targetRaySpace;
  const hand = event.inputSource.handedness;

  if (avatar.heldObject[hand]) {
    returnObject(hand);
    avatar.heldObject[hand] = null;
  }
});
```

Here, the `returnObject()` function is assumed to be one which knows how to return the object held in the specified `hand` to its initial position, as it was recorded by `pickUpObject()` in the `squeezestart` event handler.

Here, the `returnObject()` function is assumed to be one which knows how to return the object held in the specified `hand` to its initial position, as it was recorded by `pickUpObject()` in the `squeezestart` event handler.

### Transient actions

If an XR device uses the mouse to simulate a controller when in the `inline` mode, the approximate sequence of things takes place:

1. The user presses the mouse button while inside the `<canvas>` presenting the WebXR scene.
2. The mouse event is captured by the XR device's driver.
3. The device creates a new `XRInputSource` to represent the simulated XR input source. The `targetRayMode` is set to `screen`, and the other information is filled out as appropriate. This new input source is temporarily added to the list that's returned by the `XRSession` property `inputSources`.
4. The browser delivers `pointerdown` events corresponding to the action.
5. A primary action is generated and sent to the app in the form of a `selectstart` event, with its source set to the new `XRInputSource`. Or, if the mouse is being used as an off-hand or secondary controller, an auxiliary action is sent instead.
6. When the user releases the mouse button, the `select` event is sent to the `XRSession`, then the DOM receives a `click` event. The session then receives the `selectend` event indicating the completion of the action.
7. When the action is completed, the browser deletes the transient input source, and any appropriate `pointerup` events are sent.

Thus, the transient input source is indeed transient—it exists only for the duration of handling the input and will as such not be listed in the input source list.
