---
title: "Rendering and the WebXR frame animation callback (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/rendering/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Rendering and the WebXR frame animation callback (part 3 of 3)

## Additional tasks related to animating the scene

There are, of course, other things that probably need to happen each pass <example-value> the renderer. Two of the most common are handling of user inputs and performing updates to the positions of objects (or the viewer) based on known factors, such as those user control states or known animation paths of the objects in the scene.

### Handling user control inputs

There are three methods by which users might provide input while using a WebXR application. First, WebXR supports directly handling inputs from the controllers which are integrated with the XR hardware itself. These input sources may include devices such as hand controllers, optical tracking systems, accelerometers and magnetometers, and other devices of that nature.

The second type of input is a gamepad that's connected through the XR system. This uses interfaces inherited from the Gamepad API but you interact with them through WebXR.

The third and final type of input is the traditional non-XR input device such as keyboards, mice, trackpads, touch screens, and non-XR gamepads and joysticks.

Orientation and position information that can be collected from the XR hardware directly is applied automatically. Thus it's the other kinds of input that you need to handle yourself:

- Pointing device target and button presses
- Gamepad inputs
- Non-XR input device inputs

To learn more about how to handle user inputs while presenting a scene using WebXR, see the article Inputs and input sources.

### Updating object positions

Most (though not all) scenes include some form of animation, in which things move and react to one another in appropriate ways.

For example, a virtual reality or augmented reality game might have enemy non-player characters being controlled by the computer and moving around the scene. Not only are their locations in the world changing over time, but each NPC likely has body parts or components that are moving in relation to one another. Arms and legs swing as a creature walks, heads bob and turn, hair bounces and sways, torsos expand and contract as the character breathes.

In addition, there may be objects and structures in motion. In a sports game, there may be a ball arcing through the air, its movement needing to be simulated. In racing games there may be cars or other vehicles, with moving parts to animate including the wheels. If there's water in the scene, it needs ripples or waves to look realistic. Parts of structures may be moving, such as doors, walls and floors (for some types of games), and so forth.

Another common source of motion is the player themselves. After interpreting inputs from the controls (both XR-affiliated and otherwise), you need to apply those changes to the scene in order to simulate the user's movement. See the article Movement, orientation, and motion for details and a thorough example of how this works.

## Next steps

Once you've got your renderer written—or at least got something that works, even if it's not finished—you can begin to deal with the camera and its movement through the scene. This is covered in our article about viewpoints and viewers in WebXR.

## See also

- Geometry and reference spaces in WebXR
- Spatial tracking in WebXR
- Viewpoints and viewers: Simulating cameras in WebXR
- Movement, orientation, and motion: A WebXR example
- WebXR performance guide
